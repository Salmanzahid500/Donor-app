import { StyleSheet } from "react-native";
import { wp, hp } from "../../../Component/ResponsiveComponent";
import { Color } from "../../../Theme/Color/Index";

export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Color.BACKGROUND,
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    
    // Compact Header Styles
    compactHeader: {
        alignItems: 'center',
        paddingTop: hp(4),
        paddingBottom: hp(2),
        paddingHorizontal: wp(6),
        backgroundColor: Color.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: Color.BORDER,
    },
    compactLogo: {
        width: wp(16),
        height: wp(16),
        resizeMode: 'contain',
        marginBottom: hp(1),
    },
    compactTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: Color.PRIMARY,
        letterSpacing: 0.5,
        marginBottom: hp(0.5),
    },
    compactSubtitle: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
        textAlign: 'center',
    },
    
    // Signup Card Styles
    signupCard: {
        flex: 1,
        backgroundColor: Color.WHITE,
        marginHorizontal: wp(6),
        marginTop: hp(2),
        marginBottom: hp(2),
        borderRadius: wp(4),
        elevation: 8,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        borderWidth: 1,
        borderColor: Color.BORDER,
    },
    cardHeader: {
        alignItems: 'center',
        paddingVertical: hp(3),
        paddingHorizontal: wp(6),
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
    },
    signupTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.8),
        letterSpacing: 0.3,
    },
    signupSubtitle: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        textAlign: 'center',
        lineHeight: 20,
        fontWeight: '400',
    },
    
    // Form Styles
    formScrollView: {
        flex: 1,
    },
    formScrollContent: {
        paddingHorizontal: wp(6),
        paddingTop: hp(3),
        paddingBottom: hp(2),
    },
    signupButton: {
        borderRadius: wp(3),
        elevation: 5,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: hp(3),
    },
    
    // Login Link Styles
    loginSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(1.5),
    },
    loginText: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        fontWeight: '400',
    },
    loginLink: {
        fontSize: 14,
        color: Color.PRIMARY,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    
    // Footer Styles
    footer: {
        backgroundColor: Color.SURFACE,
        paddingVertical: hp(2),
        paddingHorizontal: wp(8),
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Color.BORDER,
    },
    footerText: {
        fontSize: 12,
        color: Color.TEXT_LIGHT,
        textAlign: 'center',
        lineHeight: 16,
        fontWeight: '400',
    },
});