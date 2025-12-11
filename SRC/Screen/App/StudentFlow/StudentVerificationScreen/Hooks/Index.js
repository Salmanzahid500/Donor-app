import { Alert, DeviceEventEmitter, Platform, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import { VerifyStudent } from '../../../../../FireBase/Index'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'

export const UseStudentVerification = (props) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [selectedUniversity, setSelectedUniversity] = useState("")
    const [enrollmentId, setEnrollmentId] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [documentUri, setDocumentUri] = useState(null)
    const [documentName, setDocumentName] = useState("")

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const apiLevel = Platform.Version;
                
                // Android 13+ (API 33+) uses different permissions
                if (apiLevel >= 33) {
                    const granted = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    ]);
                    return (
                        granted['android.permission.READ_MEDIA_IMAGES'] === PermissionsAndroid.RESULTS.GRANTED
                    );
                } else {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        {
                            title: 'Storage Permission Required',
                            message: 'This app needs access to your photos to upload enrollment documents',
                            buttonPositive: 'Allow',
                            buttonNegative: 'Deny',
                        }
                    );
                    return granted === PermissionsAndroid.RESULTS.GRANTED;
                }
            } catch (err) {
                console.warn('Permission error:', err);
                return false;
            }
        }
        return true;
    }

    const handleDocumentPick = async () => {
        Alert.alert(
            'Upload Document',
            'Choose how to upload your enrollment proof',
            [
                {
                    text: 'Take Photo',
                    onPress: () => openCamera(),
                },
                {
                    text: 'Choose from Gallery',
                    onPress: () => openGallery(),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    }

    const openCamera = async () => {
        try {
            const options = {
                mediaType: 'photo',
                quality: 0.8,
                maxWidth: 1024,
                maxHeight: 1024,
                saveToPhotos: false,
            };

            const result = await launchCamera(options);
            handleImageResult(result);
        } catch (error) {
            console.log('Camera error:', error);
            Alert.alert('Error', 'Failed to open camera. Please try gallery option.');
        }
    }

    const openGallery = async () => {
        const hasPermission = await requestPermissions();
        
        if (!hasPermission) {
            Alert.alert(
                "Permission Required", 
                "Please grant storage permission in your device settings to upload documents.",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Open Settings", onPress: () => {
                        // You can add deep link to settings if needed
                        Alert.alert("Info", "Please go to Settings > Apps > DonerProject > Permissions and enable Storage/Photos");
                    }}
                ]
            );
            return;
        }

        try {
            const options = {
                mediaType: 'photo',
                quality: 0.8,
                maxWidth: 1024,
                maxHeight: 1024,
                selectionLimit: 1,
            };

            const result = await launchImageLibrary(options);
            handleImageResult(result);
        } catch (error) {
            console.log('Gallery error:', error);
            Alert.alert('Error', 'Failed to open gallery: ' + error.message);
        }
    }

    const handleImageResult = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            console.log('ImagePicker Error:', response.errorCode, response.errorMessage);
            if (response.errorCode === 'permission') {
                Alert.alert(
                    'Permission Denied',
                    'Please enable storage/photo permissions in your device settings to upload documents.'
                );
            } else {
                Alert.alert('Error', response.errorMessage || 'Failed to pick image');
            }
        } else if (response.assets && response.assets[0]) {
            const asset = response.assets[0];
            setDocumentUri(asset.uri);
            setDocumentName(asset.fileName || 'enrollment_proof.jpg');
            setErrorMessage("");
            Alert.alert('Success', 'Document uploaded successfully!');
        }
    }

    const removeDocument = () => {
        setDocumentUri(null);
        setDocumentName("");
    }

    const handleSubmit = async () => {
        if (!enrollmentId || !selectedUniversity) {
            setErrorMessage("Please fill all required fields");
            return;
        }

        if (!documentUri) {
            setErrorMessage("Please upload proof of enrollment");
            return;
        }

        setLoading(true)
        try {
            const res = await VerifyStudent({ 
                enrollmentId: enrollmentId, 
                selectedUniversity: selectedUniversity,
                documentUri: documentUri,
                documentName: documentName
            })
            
            if (res.success === true) {
                Alert.alert(
                    "Request Submitted", 
                    "Your verification request has been submitted successfully. Please wait for university admin approval.",
                    [{ text: "OK", onPress: () => {
                        DeviceEventEmitter.emit("profileUpdated");
                        props?.navigation?.goBack()
                    }}]
                )
            }
            else if (res.message === "Student not found") {
                setErrorMessage("Student Not Found")
            }
            else if (res.message === "Student ID does not match") {
                setErrorMessage("Student ID does not match")
            }
            else if (res.message === "University does not match") {
                setErrorMessage("University does not match")
            }
            else if (res.message === "Verification request already pending") {
                setErrorMessage("You already have a pending verification request")
            }
            else {
                setErrorMessage(res.message || "Verification error, try again")
            }
        } catch (error) {
            setErrorMessage("Network Error")
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    
    return {
        isDropDownOpen, setIsDropDownOpen, selectedUniversity, setSelectedUniversity,
        enrollmentId, setEnrollmentId, handleSubmit, loading, errorMessage,
        documentUri, documentName, handleDocumentPick, removeDocument
    }
}


