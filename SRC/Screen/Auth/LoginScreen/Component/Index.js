import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { hp, wp } from '../../../../Component/ResponsiveComponent';
import { Color } from '../../../../Theme/Color/Index';
import { ResponsiveText } from '../../../../Component/ResponsiveText';
import InputText from "../../../../Component/InputText"
import Spacer from '../../../../Component/Spacer';
import { SimpleButton } from "../../../../Component/SimpleButton"

export const HeaderButton = ({ headerPress, setHeaderPress }) => {
    return (
        <View style={styles.roleSelector}>
            <TouchableOpacity
                onPress={() => setHeaderPress('student')}
                activeOpacity={0.7}
                style={[
                    styles.roleButton,
                    headerPress === 'student' && styles.activeRoleButton
                ]}
            >
                <View style={styles.roleButtonContent}>
                    <View style={[styles.roleIcon, { backgroundColor: headerPress === 'student' ? Color.WHITE : Color.SURFACE_DARK }]}>
                        <ResponsiveText style={[styles.roleIconText, { color: headerPress === 'student' ? Color.PRIMARY : Color.TEXT_SECONDARY }]}>
                            👨‍🎓
                        </ResponsiveText>
                    </View>
                    <ResponsiveText style={[styles.roleText, { color: headerPress === 'student' ? Color.WHITE : Color.TEXT_PRIMARY }]}>
                        Student
                    </ResponsiveText>
                    <ResponsiveText style={[styles.roleSubtext, { color: headerPress === 'student' ? 'rgba(255,255,255,0.8)' : Color.TEXT_SECONDARY }]}>
                        Donate Blood
                    </ResponsiveText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setHeaderPress('university')}
                activeOpacity={0.7}
                style={[
                    styles.roleButton,
                    headerPress === 'university' && styles.activeRoleButton
                ]}
            >
                <View style={styles.roleButtonContent}>                    <View style={[styles.roleIcon, { backgroundColor: headerPress === 'university' ? Color.WHITE : Color.SURFACE_DARK }]}>
                        <ResponsiveText style={[styles.roleIconText, { color: headerPress === 'university' ? Color.PRIMARY : Color.TEXT_SECONDARY }]}>
                            🏥
                        </ResponsiveText>
                    </View>
                    <ResponsiveText style={[styles.roleText, { color: headerPress === 'university' ? Color.WHITE : Color.TEXT_PRIMARY }]}>
                        Institution
                    </ResponsiveText>
                    <ResponsiveText style={[styles.roleSubtext, { color: headerPress === 'university' ? 'rgba(255,255,255,0.8)' : Color.TEXT_SECONDARY }]}>
                        Manage Requests
                    </ResponsiveText>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export const StudentLoginForm = ({SignupPress,LoginPress}) => {
    return (
        <View style={styles.formContainer}>
            <View style={styles.inputSection}>
                <ResponsiveText style={styles.inputLabel}>Email Address</ResponsiveText>
                <View style={styles.inputContainer}>
                    <InputText 
                        placeholder="Enter your student email"
                        style={styles.inputField}
                        placeholderTextColor={Color.TEXT_LIGHT}
                    />
                </View>
            </View>
            
            <View style={styles.inputSection}>
                <ResponsiveText style={styles.inputLabel}>Password</ResponsiveText>
                <View style={styles.inputContainer}>
                    <InputText 
                        placeholder="Enter your password" 
                        secureTextEntry
                        style={styles.inputField}
                        placeholderTextColor={Color.TEXT_LIGHT}
                    />
                </View>
            </View>
            
            <TouchableOpacity style={styles.forgotPasswordContainer}>
                <ResponsiveText style={styles.forgotPasswordText}>Forgot Password?</ResponsiveText>
            </TouchableOpacity>
            
            <Spacer height={hp(3)} />
            
            <View style={styles.buttonSection}>
                <SimpleButton
                    backgroundColor={Color.PRIMARY}
                    textColor={Color.WHITE}
                    text={"Sign In"}
                    buttonWidth={wp(82)}
                    onPress={LoginPress}
                    style={styles.loginButton}
                />
                
                <View style={styles.signupSection}>
                    <ResponsiveText style={styles.signupText}>New to LifeDrop? </ResponsiveText>
                    <TouchableOpacity onPress={SignupPress}>
                        <ResponsiveText style={styles.signupLink}>Create Account</ResponsiveText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export const UniversityLoginForm = ({UniversityPress}) => {
    return (
        <View style={styles.formContainer}>
            <View style={styles.inputSection}>
                <ResponsiveText style={styles.inputLabel}>Institution Email</ResponsiveText>
                <View style={styles.inputContainer}>
                    <InputText 
                        placeholder="Enter your institutional email"
                        style={styles.inputField}
                        placeholderTextColor={Color.TEXT_LIGHT}
                    />
                </View>
            </View>
            
            <View style={styles.inputSection}>
                <ResponsiveText style={styles.inputLabel}>Password</ResponsiveText>
                <View style={styles.inputContainer}>
                    <InputText 
                        placeholder="Enter your password" 
                        secureTextEntry
                        style={styles.inputField}
                        placeholderTextColor={Color.TEXT_LIGHT}
                    />
                </View>
            </View>
            
            <Spacer height={hp(4)} />
              <View style={styles.buttonSection}>
                <SimpleButton
                    backgroundColor={Color.PRIMARY}
                    textColor={Color.WHITE}
                    text={"Access Dashboard"}
                    buttonWidth={wp(82)}
                    onPress={UniversityPress}
                    style={styles.loginButton}
                />
                
                <View style={styles.institutionInfo}>
                    <ResponsiveText style={styles.infoText}>
                        For new institution partnerships, contact our admin team
                    </ResponsiveText>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    // Role Selection Styles
    roleSelector: {
        flexDirection: 'row',
        backgroundColor: Color.SURFACE,
        borderRadius: wp(4),
        padding: wp(2),
        elevation: 2,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
    },
    roleButton: {
        flex: 1,
        marginHorizontal: wp(1),
        borderRadius: wp(3),
        overflow: 'hidden',
    },
    activeRoleButton: {
        backgroundColor: Color.PRIMARY,
        elevation: 4,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    roleButtonContent: {
        alignItems: 'center',
        paddingVertical: hp(2.5),
        paddingHorizontal: wp(2),
    },
    roleIcon: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    roleIconText: {
        fontSize: 20,
    },
    roleText: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: hp(0.3),
    },
    roleSubtext: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
    },    // Form Container Styles
    formContainer: {
        paddingBottom: hp(2),
    },
    inputSection: {
        marginBottom: hp(2.5),
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.8),
        marginLeft: wp(1),
    },
    inputContainer: {
        backgroundColor: Color.SURFACE,
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: Color.BORDER,
        paddingHorizontal: wp(4),
        elevation: 1,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    inputField: {
        fontSize: 15,
        color: Color.TEXT_PRIMARY,
        paddingVertical: hp(1.8),
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        paddingVertical: hp(0.5),
        paddingHorizontal: wp(1),
    },
    forgotPasswordText: {
        fontSize: 14,
        color: Color.PRIMARY,
        fontWeight: '500',
    },

    // Button Section Styles
    buttonSection: {
        alignItems: 'center',
    },
    loginButton: {
        borderRadius: wp(6),
        elevation: 6,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    signupSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(2.5),
        paddingVertical: hp(1),
    },
    signupText: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        fontWeight: '400',
    },
    signupLink: {
        fontSize: 14,
        color: Color.PRIMARY,
        fontWeight: '600',
    },
    institutionInfo: {
        marginTop: hp(2.5),
        paddingHorizontal: wp(2),
        alignItems: 'center',
    },
    infoText: {
        fontSize: 13,
        color: Color.TEXT_LIGHT,
        textAlign: 'center',
        lineHeight: 18,
        fontStyle: 'italic',
    },
});
