import { StyleSheet } from "react-native";
import { wp, hp } from "../../../../Component/ResponsiveComponent";
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
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(3),
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Color.WHITE,
        letterSpacing: 0.3,
    },
    logoutButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: wp(5),
    },
    logoutText: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.WHITE,
        letterSpacing: 0.5,
    },
    profileBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: wp(5),
        alignSelf: 'center',
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
    welcomeText: {
        fontSize: 16,
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        lineHeight: 22,
    },
    
    // Section Styles
    section: {
        marginBottom: hp(2),
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
        paddingBottom: hp(1),
        borderBottomWidth: 1,
        borderBottomColor: Color.BORDER,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Color.TEXT_PRIMARY,
        letterSpacing: 0.3,
    },
    sectionSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        color: Color.TEXT_SECONDARY,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});