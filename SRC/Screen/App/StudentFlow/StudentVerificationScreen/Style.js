import { StyleSheet } from "react-native";
import { wp, hp } from "../../../../Component/ResponsiveComponent"
import { Color } from "../../../../Theme/Color/Index";

export const styles = StyleSheet.create({    container: {
        flex: 1,
        paddingHorizontal: wp(4),
        backgroundColor: Color.BACKGROUND,
    },
    
    // Header Styles
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
    },    backButton: {
        padding: wp(2),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 24,
        color: Color.WHITE,
        fontWeight: 'bold',
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

    // Verification Card Styles
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
    },
    cardHeader: {
        alignItems: 'center',
        marginBottom: hp(3),
    },    iconContainer: {
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
    },    cardSubtitle: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: wp(2),
    },

    // Form Styles
    formContainer: {
        marginTop: hp(1),
    },
    inputGroup: {
        marginBottom: hp(3),
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: Color.PRIMARY,
        marginBottom: hp(1),
        marginLeft: wp(1),
    },    input: {
        borderWidth: 1,
        borderColor: Color.BORDER,
        borderRadius: wp(2),
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        backgroundColor: Color.WHITE,
        fontSize: 16,
        color: Color.BLACK,
    },

    // Info Card Styles
    infoCard: {
        backgroundColor: `${Color.SECONDARY}10`,
        borderRadius: wp(2),
        padding: wp(4),
        borderLeftWidth: 4,
        borderLeftColor: Color.SECONDARY,
    },    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    infoIconText: {
        fontSize: 20,
        color: Color.SECONDARY,
        fontWeight: 'bold',
        marginRight: wp(2),
    },    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Color.SECONDARY,
    },    infoText: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        lineHeight: 20,
        marginTop: hp(0.5),
    },

    // Submit Button Styles
    submitButton: {
        backgroundColor: Color.PRIMARY,
        paddingVertical: hp(2),
        borderRadius: wp(2),
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    // Legacy styles (keeping for compatibility)
    image1: {
        width: wp(30),
        height: wp(30),
        resizeMode: "contain",
        alignSelf: "center"
    },
    text1: {
        fontSize: 15,
        color: Color.BLACK,
        fontWeight: "400",
        paddingHorizontal: wp(3)
    }
})