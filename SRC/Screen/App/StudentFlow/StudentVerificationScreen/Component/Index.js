import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import { wp, hp } from "../../../../../Component/ResponsiveComponent"
import InputText from '../../../../../Component/InputText'
import { UniversityName } from '../../../../../Dummy/Index'
import DropDown from '../../../../../Component/Dropdown'
import { Icons } from '../../../../../Assets/Index'


export const Header = ({ backPress }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={backPress}
                activeOpacity={0.7}
            >
                <Icons.BackArrowIcon size={24} color={Color.WHITE} />
            </TouchableOpacity>
            <ResponsiveText style={styles.headerTitle}>Student Verification</ResponsiveText>
            <View style={styles.headerRight} />
        </View>
    )
}

export const VerificationStatusBox = ({ 
    enrollmentId, setEnrollmentId, selectedUniversity, setSelectedUniversity, 
    setIsDropDownOpen, documentUri, documentName, handleDocumentPick, removeDocument 
}) => {
    return (
        <View style={styles.verificationCard}>
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                    <ResponsiveText style={styles.verificationIcon}>✓</ResponsiveText>
                </View>
                <ResponsiveText style={styles.cardTitle}>Verify Your Student Status</ResponsiveText>
                <ResponsiveText style={styles.cardSubtitle}>
                    Please provide your enrollment details and upload proof of enrollment
                </ResponsiveText>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Enrollment ID</ResponsiveText>
                    <InputText
                        placeholder="Enter your enrollment ID"
                        value={enrollmentId}
                        onChangeText={setEnrollmentId}
                        style={styles.input}
                    />
                </View>
                <View style={[styles.inputGroup, styles.dropdownContainer]}>
                    <ResponsiveText style={styles.inputLabel}>Select University</ResponsiveText>
                    <DropDown
                        setIsOpen={setIsDropDownOpen}
                        placeholder="Choose your university"
                        items={UniversityName}
                        value={selectedUniversity}
                        setValue={setSelectedUniversity}
                        searchable={true}
                    />
                </View>

                {/* Document Upload Section */}
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>
                        Proof of Enrollment <Text style={styles.required}>*</Text>
                    </ResponsiveText>
                    <ResponsiveText style={styles.uploadHint}>
                        Upload student ID card or enrollment letter
                    </ResponsiveText>
                    
                    {!documentUri ? (
                        <TouchableOpacity 
                            style={styles.uploadButton}
                            onPress={handleDocumentPick}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.uploadIcon}>📎</Text>
                            <ResponsiveText style={styles.uploadText}>
                                Tap to Upload Document
                            </ResponsiveText>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.documentPreview}>
                            <Image 
                                source={{ uri: documentUri }} 
                                style={styles.previewImage}
                                resizeMode="cover"
                            />
                            <View style={styles.documentInfo}>
                                <Text style={styles.documentIcon}>📄</Text>
                                <View style={styles.documentDetails}>
                                    <ResponsiveText style={styles.documentName} numberOfLines={1}>
                                        {documentName}
                                    </ResponsiveText>
                                    <ResponsiveText style={styles.documentStatus}>
                                        ✓ Ready to submit
                                    </ResponsiveText>
                                </View>
                                <TouchableOpacity 
                                    onPress={removeDocument}
                                    style={styles.removeButton}
                                >
                                    <Text style={styles.removeIcon}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

export const InfoCard = () => {
    return (
        <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
                <ResponsiveText style={styles.infoIconText}>ℹ</ResponsiveText>
                <ResponsiveText style={styles.infoTitle}>Verification Process</ResponsiveText>
            </View>
            <ResponsiveText style={styles.infoText}>
                Your student verification helps us ensure that blood donation events are properly organized and managed within your university community.
            </ResponsiveText>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    backButton: {
        padding: wp(2),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Color.WHITE,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: wp(2),
    },
    headerRight: {
        width: wp(8),
    },

    verificationCard: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(3),
        padding: wp(5),
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: hp(1),
        overflow: 'visible',
    },
    cardHeader: {
        alignItems: 'center',
        marginBottom: hp(3),
    },
    iconContainer: {
        width: wp(16),
        height: wp(16),
        borderRadius: wp(8),
        backgroundColor: `${Color.PRIMARY}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    verificationIcon: {
        fontSize: 32,
        color: Color.PRIMARY,
        fontWeight: 'bold',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Color.PRIMARY,
        marginBottom: hp(1),
        textAlign: 'center',
    },
    cardSubtitle: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: wp(2),
    },
    formContainer: {
        marginTop: hp(1),
        overflow: 'visible',
    },
    inputGroup: {
        marginBottom: hp(3),
    },
    dropdownContainer: {
        zIndex: 1000,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: Color.PRIMARY,
        marginBottom: hp(1),
        marginLeft: wp(1),
    },
    input: {
        borderWidth: 1,
        borderColor: Color.BORDER,
        borderRadius: wp(2),
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        backgroundColor: Color.WHITE,
        fontSize: 16,
        color: Color.BLACK,
    },
    infoCard: {
        backgroundColor: `${Color.SECONDARY}10`,
        borderRadius: wp(2),
        padding: wp(4),
        borderLeftWidth: 4,
        borderLeftColor: Color.SECONDARY,
    },    
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    infoIconText: {
        fontSize: 20,
        color: Color.SECONDARY,
        fontWeight: 'bold',
        marginRight: wp(2),
    },    
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Color.SECONDARY,
    },    
    infoText: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        lineHeight: 20,
        marginTop: hp(0.5),
    },
    required: {
        color: Color.RED,
        fontSize: 16,
    },
    uploadHint: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        marginBottom: hp(1),
        fontStyle: 'italic',
    },
    uploadButton: {
        borderWidth: 2,
        borderColor: Color.PRIMARY,
        borderStyle: 'dashed',
        borderRadius: wp(2),
        paddingVertical: hp(3),
        alignItems: 'center',
        backgroundColor: `${Color.PRIMARY}05`,
    },
    uploadIcon: {
        fontSize: 32,
        marginBottom: hp(1),
    },
    uploadText: {
        fontSize: 14,
        color: Color.PRIMARY,
        fontWeight: '500',
    },
    documentPreview: {
        borderWidth: 1,
        borderColor: Color.BORDER,
        borderRadius: wp(2),
        overflow: 'hidden',
        backgroundColor: Color.WHITE,
    },
    previewImage: {
        width: '100%',
        height: hp(20),
        backgroundColor: Color.BACKGROUND,
    },
    documentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(3),
        backgroundColor: `${Color.SECONDARY}10`,
    },
    documentIcon: {
        fontSize: 24,
        marginRight: wp(2),
    },
    documentDetails: {
        flex: 1,
    },
    documentName: {
        fontSize: 14,
        fontWeight: '500',
        color: Color.BLACK,
        marginBottom: hp(0.5),
    },
    documentStatus: {
        fontSize: 12,
        color: Color.SECONDARY,
        fontWeight: '500',
    },
    removeButton: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(4),
        backgroundColor: Color.RED,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeIcon: {
        fontSize: 18,
        color: Color.WHITE,
        fontWeight: 'bold',
    },
})