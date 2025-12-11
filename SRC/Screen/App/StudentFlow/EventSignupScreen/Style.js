import { StyleSheet } from "react-native";
import { wp, hp } from "../../../../Component/ResponsiveComponent"
import { Color } from "../../../../Theme/Color/Index";

export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Color.BACKGROUND,
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: Color.BACKGROUND,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: hp(3),
    },
    
    // Content Card Styles
    contentCard: {
        flex: 1,
        backgroundColor: Color.WHITE,
        borderTopLeftRadius: wp(6),
        borderTopRightRadius: wp(6),
        marginTop: hp(2),
        paddingHorizontal: wp(5),
        paddingTop: hp(4),
        elevation: 10,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    
    // Section Styles
    section: {
        marginBottom: hp(1),
    },
    sectionHeader: {
        marginBottom: hp(2),
        paddingBottom: hp(1),
        borderBottomWidth: 1,
        borderBottomColor: Color.BORDER,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.5),
        letterSpacing: 0.3,
    },
    sectionSubtitle: {
        fontSize: 14,
        fontWeight: "400",
        color: Color.TEXT_SECONDARY,
        lineHeight: 20,
    },
    
    // Button Container
    buttonContainer: {
        alignItems: 'center',
        paddingHorizontal: wp(2),
    },
    submitButton: {
        borderRadius: wp(3),
        elevation: 5,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: hp(2),
    },
    disclaimerText: {
        fontSize: 12,
        color: Color.TEXT_LIGHT,
        textAlign: 'center',
        fontWeight: '400',
        lineHeight: 16,
        paddingHorizontal: wp(4),
    },
    
    // Header Styles
    headerContainer: {
        backgroundColor: Color.PRIMARY,
        paddingHorizontal: wp(5),
        paddingTop: hp(2),
        paddingBottom: hp(4),
        borderBottomLeftRadius: wp(6),
        borderBottomRightRadius: wp(6),
        elevation: 8,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        position: 'relative',
    },
    headerBackButton: {
        position: 'absolute',
        top: hp(2),
        left: wp(5),
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    headerBackArrow: {
        fontSize: 18,
        color: Color.WHITE,
        fontWeight: '600',
    },
    headerContent: {
        alignItems: 'center',
    },
    eventBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: wp(5),
        marginBottom: hp(2),
    },
    badgeIcon: {
        fontSize: 18,
        marginRight: wp(2),
    },
    badgeText: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.WHITE,
        letterSpacing: 0.5,
    },
    eventTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Color.WHITE,
        textAlign: 'center',
        marginBottom: hp(0.5),
        letterSpacing: 0.3,
    },
    eventSubtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginBottom: hp(2),
        lineHeight: 22,
    },
    urgencyIndicator: {
        alignItems: 'center',
        marginTop: hp(1),
    },
    urgencyBadge: {
        backgroundColor: Color.ACCENT,
        paddingHorizontal: wp(4),
        paddingVertical: hp(0.7),
        borderRadius: wp(4),
        marginBottom: hp(0.7),
    },
    urgencyText: {
        fontSize: 12,
        fontWeight: '700',
        color: Color.WHITE,
        letterSpacing: 1,
    },
    urgencyDesc: {
        fontSize: 13,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
    },
     errorMessage: {
        fontSize: 13,
        fontWeight: '500',
        color: Color.RED,
        textAlign: 'center',
    },
})