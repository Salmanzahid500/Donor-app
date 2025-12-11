import { useEffect, useState } from "react"
import { getUser, listenToEvents, listenToReward, listenToUser } from "../../../../../FireBase/Index"
import { Route } from "../../../../../Constant/Route"

export const UseDashboard = (props) => {
  const [headerButtonPress, setHeaderButtonPress] = useState("request")
  const [userData, setuserData] = useState(null)
  const [event, setEvent] = useState([])
  const [reward, setReward] = useState([])
  const [notification, setNotification] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const handleEventRegister = (item) => {
    props?.navigation?.navigate(Route.STACKNAVIGATION, {
      screen: Route.STUDENTEVENTSIGNUPSCREEN,
      params: { data: item }
    })
  }

  const onRefresh = async () => {
    setRefreshing(true)
    // Force refresh user data
    try {
      const res = await getUser()
      if (res.success) {
        setuserData(res)
      }
    } catch (error) {
      console.log(error)
    }
    setRefreshing(false)
  }

  useEffect(() => {
    const unsubscribeUser = listenToUser((data) => {
      if (data.success) {
        setuserData(data);
      }
    });

    return () => {
      if (unsubscribeUser) unsubscribeUser();
    };
  }, []);

useEffect(() => {
  const unsubscribeEvents = listenToEvents((data) => {
    setEvent(data);
    setLoading(false);
  });

  const unsubscribeReward = listenToReward((data) => {
    setReward(data);
    setLoading(false);
  });

  return () => {
    unsubscribeEvents();
    unsubscribeReward();
  };
}, []);

useEffect(() => {
  if (event.length === 0 && reward.length === 0) return;

  const notiEvents = event.map(ev => ({
    id: ev.id,
    type: 'event',
    title: ev.eventTitle,
    description: ev.description,
    time: ev.createdAt,
    data: ev,
  }));

  const notiRewards = reward.map(rw => ({
    id: rw.id,
    type: 'reward',
    title: rw.rewardTitle,
    description: rw.byReward,
    time: rw.createdAt,
    data: rw,
  }));

  const combined = [...notiEvents, ...notiRewards].sort(
    (a, b) => b.time - a.time
  );

  setNotification(combined);

}, [event, reward]);  


  return {
    headerButtonPress, setHeaderButtonPress,
    userData,
    event,
    reward,
    notification,  
    loading,
    handleEventRegister,
    refreshing,
    onRefresh
  }
}
