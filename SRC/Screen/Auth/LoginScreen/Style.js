import { StyleSheet } from "react-native";
import {wp, hp} from "../../../Component/ResponsiveComponent"
import { Color } from "../../../Theme/Color/Index";

export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Color.BACKGROUND,
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
        justifyContent: 'space-between',
    },
    
    // Compact Header Styles
    compactHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: hp(3),
        paddingBottom: hp(2),
    },
    compactLogo: {
        width: wp(8),
        height: wp(8),
        resizeMode: "contain",
        marginRight: wp(2),
    },
    compactTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: Color.PRIMARY,
        letterSpacing: 0.5,
    },
    
    // Login Card Styles - Main Content Area
    loginCard: {
        flex: 1,
        backgroundColor: Color.WHITE,
        borderRadius: wp(4),
        marginVertical: hp(1),
        paddingHorizontal: wp(6),
        paddingVertical: hp(3),
        elevation: 8,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
    },
    cardHeader: {
        alignItems: 'center',
        marginBottom: hp(2),
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Color.TEXT_PRIMARY,
        textAlign: "center",
        marginBottom: hp(0.5),
    },
    loginSubtitle: {
        fontSize: 14,
        fontWeight: "400",
        color: Color.TEXT_SECONDARY,
        textAlign: "center",
        lineHeight: 20,
    },
    roleSection: {
        marginBottom: hp(2),
    },
    
    // Footer Styles - No Absolute Positioning to Prevent Overlap
    footer: {
        alignItems: 'center',
        paddingVertical: hp(1.5),
        backgroundColor: Color.BACKGROUND,
    },
    footerText: {
        fontSize: 12,
        color: Color.TEXT_LIGHT,
        textAlign: 'center',
        fontWeight: '400',
    },
});