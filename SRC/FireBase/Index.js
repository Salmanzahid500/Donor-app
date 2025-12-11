import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore, { getFirestore } from '@react-native-firebase/firestore';



export const UniversityLogin = async ({ email, password }) => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    const userDoc = await firestore().collection('User').doc(res.user.uid).get();
    const data = userDoc.data();

    if (data.Role === 'University') {
      await AsyncStorage.setItem("user", JSON.stringify({ uid: res.user.uid, role: "University" }));
      return { success: true, role: 'university', uid: res.user.uid };
    } else {
      return { success: false, message: 'Not a university account' };
    }

  } catch (error) {
    console.log('Login error:', error);
    return { success: false, message: error.message };
  }
};

export const StudentLogin = async ({ email, password }) => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    const userDoc = await firestore().collection('User').doc(res.user.uid).get();
    const data = userDoc.data();
    await AsyncStorage.setItem("user", JSON.stringify({ uid: res.user.uid, role: "Student", ...data }));
    return { success: true, role: 'Student', uid: res.user.uid };

  } catch (error) {
    console.log('Login error:', error);
    return { success: false, message: error.message };
  }
};

export const StudentSignup = async ({
  email, password, fullName,
  studentId, selectedUniversity
}) => {
  try {
    const exists = await firestore()
      .collection("User")
      .where("StudentId", "==", fullName)
      .get();

    if (!exists.empty) {
      return { success: false, message: "Student Name already registered" };
    }
    const res = await auth()?.createUserWithEmailAndPassword(email, password);
    await firestore().collection("User").doc(res?.user?.uid).set({
      FullName: fullName,
      Email: email,
      StudentId: studentId,
      University: selectedUniversity,
      Role: "Student",
      Points: 0,
      Verified: false,
      CreatedAt: firestore?.FieldValue?.serverTimestamp()
    })
    return { success: true, uid: res.user.uid };
  } catch (error) {
    console.log("Signup error:", error);
    return { success: false, message: error.code };
  }
}

export const UpdateStudentAccount = async ({
  age, fullName,
  bloodGroup
}) => {
  try {
    const uid = auth()?.currentUser?.uid;
    await firestore().collection("User").doc(uid).update({
      FullName: fullName,
      age: age,
      BloodGroup: bloodGroup,
      UpdatedAt: firestore?.FieldValue?.serverTimestamp()
    })
    return { success: true };
  } catch (error) {
    console.log("Update error:", error);
    return { success: false, message: error.code };
  }
}

export const getUser = async () => {
  const uid = auth()?.currentUser?.uid;

  try {
    console.log(uid)
    const userDoc = await firestore()
      .collection("User")
      .doc(uid)
      .get();

    if (!userDoc.exists) {
      return { success: false, message: "User not found in Firestore" };
    }

    return { success: true, uid: uid, user: userDoc.data() };

  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const listenToUser = (callback) => {
  const uid = auth()?.currentUser?.uid;
  
  if (!uid) {
    console.log("No user authenticated");
    return () => {};
  }

  return firestore()
    .collection("User")
    .doc(uid)
    .onSnapshot(
      (doc) => {
        if (doc.exists) {
          callback({ success: true, uid: uid, user: doc.data() });
        } else {
          callback({ success: false, message: "User not found" });
        }
      },
      (error) => {
        console.log("Error listening to user:", error);
        callback({ success: false, message: error.message });
      }
    );
};

export const createEvent = async ({
  eventTitle,
  address,
  date,
  time,
  blood,
  description,
  points,
  capacity
}) => {
  try {
    const uid = auth()?.currentUser?.uid;

    const eventData = {
      eventTitle,
      address,
      date,
      time,
      blood,
      description,
      points,
      capacity: capacity,
      status:"Active",
      createdBy: uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    await firestore().collection("Events").add(eventData);
    return { success: true };
  } catch (error) {
    console.log("Event error:", error);
    return { success: false, message: error.message };
  }
};

export const listenToEvents = (callback) => {
  const uid = auth()?.currentUser?.uid;
  
  let eventsCache = [];
  let registrationsCache = new Set();
  let allRegistrationsMap = new Map(); // Map to store registration counts per event

  const updateEvents = () => {
    const eventsWithStatus = eventsCache.map(event => ({
      ...event,
      isRegistered: registrationsCache.has(event.id),
      registeredStudent: allRegistrationsMap.get(event.id) || 0,
    }));
    callback(eventsWithStatus);
  };

  // Listen to Events collection
  const eventsListener = firestore()
    .collection("Events")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      eventsCache = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      // Filter out closed events for students (only show active events)
      .filter(event => event.status !== "Closed");
      updateEvents();
    });

  // Listen to user's registrations
  const registrationListener = firestore()
    .collection("EventRegistration")
    .where("studentId", "==", uid)
    .onSnapshot((snapshot) => {
      registrationsCache = new Set(
        snapshot.docs.map(doc => doc.data().eventId)
      );
      updateEvents();
    });

  // Listen to all registrations to count registered students per event
  const allRegistrationsListener = firestore()
    .collection("EventRegistration")
    .onSnapshot((snapshot) => {
      // Count registrations per event (including pending and approved)
      const countMap = new Map();
      snapshot.docs.forEach(doc => {
        const eventId = doc.data().eventId;
        countMap.set(eventId, (countMap.get(eventId) || 0) + 1);
      });
      allRegistrationsMap = countMap;
      updateEvents();
    });

  // Return unsubscribe function for all listeners
  return () => {
    eventsListener();
    registrationListener();
    allRegistrationsListener();
  };
};

// Listen to all events (for university dashboard - includes closed events)
export const listenToAllEvents = (callback) => {
  return firestore()
    .collection("Events")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const events = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(events);
    });
};

export const updateEventStatus = async ({eventId}) => {
  try {
    await firestore()
      .collection("Events")
      .doc(eventId)
      .update({
        status:"InActive",
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };
  } catch (error) {
    console.log("Update Event Status Error:", error);
    return { success: false, message: error.message };
  }
};

export const closeEvent = async ({eventId}) => {
  try {
    await firestore()
      .collection("Events")
      .doc(eventId)
      .update({
        status:"Closed",
        closedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };
  } catch (error) {
    console.log("Close Event Error:", error);
    return { success: false, message: error.message };
  }
};

export const openEvent = async ({eventId}) => {
  try {
    await firestore()
      .collection("Events")
      .doc(eventId)
      .update({
        status:"Active",
        reopenedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };
  } catch (error) {
    console.log("Open Event Error:", error);
    return { success: false, message: error.message };
  }
};

export const updateEvent = async ({eventId, payload}) => {
  try {
    await firestore()
      .collection("Events")
      .doc(eventId)
      .update({
        eventTitle: payload.eventTitle,
        address: payload.address,
        date: payload.date,
        time: payload.time,
        blood: payload.blood,
        description: payload.description,
        points: payload.points,
        capacity: payload.capacity,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };
  } catch (error) {
    console.log("Update Event Error:", error);
    return { success: false, message: error.message };
  }
};


export const RegisterEvent = async ({
  eventId, points
}) => {
  try {
    const uid = auth()?.currentUser?.uid;

    const studentDoc = await firestore().collection("User").doc(uid).get();
    const student = studentDoc.data();

    if (student?.Verified !== true) {
      return { success: false, message: "Not Verified" };
    }
    if (!student?.age) {
      return { success: false, message: "Update your Age" };
    }
    if (student?.age <18) {
      return { success: false, message: "Age is less then 18" };
    }
    const alreadyRegistred = await firestore().collection("EventRegistration")
      .where("eventId", "==", eventId)
      .where("studentId", "==", uid)
      .get()
    console.log(alreadyRegistred)
    if (!alreadyRegistred.empty) {
      return { success: false, message: "Already Registered" };
    }
    const eventData = {
      eventId,
      studentId: uid,
      status:"pending",
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    await firestore().collection("EventRegistration").add(eventData);
    // await firestore()
    //   .collection("User")
    //   .doc(uid)
    //   .update({
    //     points: firestore.FieldValue.increment(Number(points)),
    //     availablePoint: firestore.FieldValue.increment(Number(points)),
    //     event: firestore.FieldValue.increment(1)
    //   });
    // await firestore()
    //   .collection("BloodUnits")
    //   .doc(bloodGroup)
    //   .set(
    //     { count: firestore.FieldValue.increment(1) },
    //     { merge: true }
    //   );
    return { success: true };
  } catch (error) {
    console.log("Event Registration error:", error);
    return { success: false, message: error.message };
  }
};

export const VerifyStudent = async ({ enrollmentId, selectedUniversity, documentUri, documentName }) => {
  try {
    const uid = auth()?.currentUser?.uid;

    const studentDoc = await firestore().collection("User").doc(uid).get();
    if (!studentDoc.exists) {
      return { success: false, message: "Student not found" };
    }
    const student = studentDoc.data();
    if (student.StudentId !== enrollmentId) {
      return { success: false, message: "Student ID does not match" };
    }
    if (student.University !== selectedUniversity) {
      return { success: false, message: "University does not match" };
    }

    // Check if already has pending request
    const existingRequest = await firestore()
      .collection("VerificationRequests")
      .where("studentId", "==", uid)
      .where("status", "==", "pending")
      .get();

    if (!existingRequest.empty) {
      return { success: false, message: "Verification request already pending" };
    }

    // Create verification request for admin approval
    await firestore().collection("VerificationRequests").add({
      studentId: uid,
      studentName: student.FullName,
      studentEmail: student.Email,
      enrollmentId: enrollmentId,
      university: selectedUniversity,
      documentUri: documentUri || null,
      documentName: documentName || null,
      status: "pending",
      submittedAt: firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, message: "Verification request submitted" };
  } catch (error) {
    console.log("Verification Error:", error);
    return { success: false, message: error.message };
  }
};

export const listenToVerificationRequests = (callback) => {
  return firestore()
    .collection("VerificationRequests")
    .orderBy("submittedAt", "desc")
    .onSnapshot((snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(requests);
    });
};

export const approveVerification = async ({ requestId, studentId }) => {
  try {
    // Update student's verification status
    await firestore()
      .collection("User")
      .doc(studentId)
      .update({
        Verified: true,
        VerifiedAt: firestore.FieldValue.serverTimestamp(),
      });

    // Update verification request status
    await firestore()
      .collection("VerificationRequests")
      .doc(requestId)
      .update({
        status: "approved",
        approvedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };
  } catch (error) {
    console.log("Approve Verification Error:", error);
    return { success: false, message: error.message };
  }
};

export const rejectVerification = async ({ requestId, reason }) => {
  try {
    await firestore()
      .collection("VerificationRequests")
      .doc(requestId)
      .update({
        status: "rejected",
        rejectedAt: firestore.FieldValue.serverTimestamp(),
        rejectionReason: reason || "Does not meet verification criteria",
      });

    return { success: true };
  } catch (error) {
    console.log("Reject Verification Error:", error);
    return { success: false, message: error.message };
  }
};

export const addReward = async ({
  rewardTitle,
  byReward,
  pointsNeeded,
  validDate
}) => {
  try {
    const uid = auth()?.currentUser?.uid;

    const eventData = {
      rewardTitle,
      byReward,
      pointsNeeded,
      validDate,
      createdBy: uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    await firestore().collection("reward").add(eventData);
    return { success: true };
  } catch (error) {
    console.log("Event error:", error);
    return { success: false, message: error.message };
  }
};

export const updateReward = async ({ rewardId, payload }) => {
  try {
    await firestore()
      .collection("reward")
      .doc(rewardId)
      .update({
        rewardTitle: payload.rewardTitle,
        byReward: payload.byReward,
        pointsNeeded: payload.pointsNeeded,
        validDate: payload.validDate,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };
  } catch (error) {
    console.log("Update reward error:", error);
    return { success: false, message: error.message };
  }
};

export const listenToReward = (callback) => {
  return firestore()
    .collection("reward")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(data);
    });
};

export const getTopDonors = async () => {
  try {
    const snapshot = await firestore()
      .collection("User")
      .orderBy("event", "desc") // highest first
      .limit(10)
      .get();

    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, donors: list };

  } catch (error) {
    console.log("Top donor fetch error:", error);
    return { success: false, message: error.message };
  }
};


export const applyForRedeem = async ({ rewardId, pointsNeeded }) => {
  try {
    const uid = auth().currentUser.uid;

    // Validate user has enough points
    const userDoc = await firestore().collection("User").doc(uid).get();
    if (!userDoc.exists) {
      return { success: false, message: "User not found" };
    }

    const userPoints = userDoc.data()?.points || 0;
    if (userPoints < pointsNeeded) {
      return { success: false, message: "Insufficient points" };
    }

    // Fetch reward details to store with request
    const rewardDoc = await firestore().collection("reward").doc(rewardId).get();
    const rewardData = rewardDoc.exists ? rewardDoc.data() : {};

    // Deduct points immediately when request is made
    await firestore().collection("User").doc(uid).update({
      points: firestore.FieldValue.increment(-pointsNeeded),
    });

    await firestore().collection("RewardRequests").add({
      rewardId,
      studentId: uid,
      pointsNeeded,
      rewardTitle: rewardData.rewardTitle || "Reward",
      byReward: rewardData.byReward || "",
      status: "pending",
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return { success: true };

  } catch (error) {
    console.log("Redeem Error:", error);
    return { success: false, message: error.message };
  }
};

export const listenToRewardRequests = (callback) => {
  return firestore()
    .collection("RewardRequests")
    .where("status", "in", ["pending", "approved"])
    .onSnapshot(async (snapshot) => {
      const requestList = [];

      for (let doc of snapshot.docs) {
        const request = { id: doc.id, ...doc.data() };

        // Fetch Student Detail
        const userDoc = await firestore()
          .collection("User")
          .doc(request.studentId)
          .get();
        request.student = userDoc.exists ? userDoc.data() : null;

        // Fetch Reward Detail using rewardId
        if (request.rewardId) {
          const rewardDoc = await firestore()
            .collection("reward")
            .doc(request.rewardId)
            .get();
          request.reward = rewardDoc.exists ? rewardDoc.data() : null;
          console.log(`Reward for request ${request.id}:`, request.rewardId, rewardDoc.exists, request.reward?.rewardTitle);
        } else {
          console.log(`No rewardId for request ${request.id}`);
        }

        requestList.push(request);
      }

      callback(requestList);
    });
};
export const listenToEventRequests = (callback) => {
  return firestore()
    .collection("EventRegistration")
    .where("status", "in", ["pending", "approved"])
    .onSnapshot(async (snapshot) => {
      const requestList = [];

      for (let doc of snapshot.docs) {
        const request = { id: doc.id, ...doc.data() };

        // 🔹 Fetch Student Detail
        const userDoc = await firestore()
          .collection("User")
          .doc(request.studentId)
          .get();
        request.student = userDoc.exists ? userDoc.data() : null;

        // 🔹 Fetch Event Detail using eventId
        const eventDoc = await firestore()
          .collection("Events")
          .doc(request.eventId)
          .get();
        request.event = eventDoc.exists ? eventDoc.data() : null;

        requestList.push(request);
      }

      callback(requestList);
    });
};

export const approveRedemption = async ({ requestId, studentId, pointsNeeded }) => {
  try {
    // Points are already deducted when request was made, just increment reward count
    await firestore()
      .collection("User")
      .doc(studentId)
      .update({
        rewardClaimed: firestore.FieldValue.increment(1)
      });

    // Update request status
    await firestore()
      .collection("RewardRequests")
      .doc(requestId)
      .update({
        status: "approved",
        approvedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };

  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const approveEvent = async ({ requestId, studentId, points }) => {
  try {
    // Deduct points
    await firestore()
      .collection("User")
      .doc(studentId)
      .update({
        points: firestore.FieldValue.increment(Number(points)),
        availablePoint: firestore.FieldValue.increment(Number(points)),
        event: firestore.FieldValue.increment(1)
      });

    // Update request status
    await firestore()
      .collection("EventRegistration")
      .doc(requestId)
      .update({
        status: "approved",
        approvedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };

  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const rejectRedemption = async ({ requestId }) => {
  try {
    // Get the request details to refund points
    const requestDoc = await firestore()
      .collection("RewardRequests")
      .doc(requestId)
      .get();

    if (!requestDoc.exists) {
      return { success: false, message: "Request not found" };
    }

    const requestData = requestDoc.data();
    const { studentId, pointsNeeded } = requestData;

    // Refund points to the student
    await firestore().collection("User").doc(studentId).update({
      points: firestore.FieldValue.increment(pointsNeeded),
    });

    // Update request status to rejected
    await firestore()
      .collection("RewardRequests")
      .doc(requestId)
      .update({
        status: "rejected",
        rejectedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const rejectEvent = async ({ requestId }) => {
  try {
    await firestore()
      .collection("EventRegistration")
      .doc(requestId)
      .update({
        status: "rejected",
        rejectedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getRegisteredEvents = async () => {
  try {
    const uid = auth()?.currentUser?.uid;

    const registrationSnapshot = await firestore()
      .collection("EventRegistration")
      .where("studentId", "==", uid)
      .get();

    if (registrationSnapshot.empty) {
      return { success: true, events: [] };
    }

    // Fetch all event docs in parallel
    const eventPromises = registrationSnapshot.docs.map(async (doc) => {
      const reg = doc.data();

      const eventDoc = await firestore()
        .collection("Events")
        .doc(reg.eventId)
        .get();

      const event = eventDoc.data();

      return {
        eventId: reg.eventId,
        eventName: event?.eventTitle ?? "Unknown Event",
        pointsEarned: event?.points ?? 0,
        registeredAt: reg.createdAt,
      };
    });

    const eventList = await Promise.all(eventPromises); // faster

    return { success: true, events: eventList };

  } catch (error) {
    console.log("Get Registered Events error:", error);
    return { success: false, message: error.message };
  }
};

export const getUniversityStats = async () => {
  try {
    const uid = auth()?.currentUser?.uid;

    // Get all registrations
    const registrationsSnapshot = await firestore()
      .collection("EventRegistration")
      .get();

    const totalRegistrations = registrationsSnapshot.size;

    // Count approved registrations as blood units collected
    let totalBloodUnits = 0;
    registrationsSnapshot.docs.forEach(doc => {
      const registration = doc.data();
      if (registration.status === "approved") {
        totalBloodUnits++;
      }
    });

    // Get all events to calculate completed and active events
    const eventsSnapshot = await firestore()
      .collection("Events")
      .get();

    let completedEvents = 0;
    let activeEvents = 0;

    eventsSnapshot.docs.forEach(doc => {
      const event = doc.data();
      if (event.status === "Closed") {
        completedEvents++;
      } else if (event.status === "Active") {
        activeEvents++;
      }
    });

    // Get total donors (users with Student role)
    const donorsSnapshot = await firestore()
      .collection("User")
      .where("Role", "==", "Student")
      .get();

    return {
      success: true,
      stats: {
        totalBloodUnits,
        totalRegistrations,
        completedEvents,
        activeEvents,
        totalDonors: donorsSnapshot.size
      }
    };
  } catch (error) {
    console.log("Get University Stats error:", error);
    return { success: false, message: error.message };
  }
};


