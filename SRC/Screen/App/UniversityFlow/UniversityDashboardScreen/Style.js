import { StyleSheet } from "react-native";
import { wp, hp } from "../../../../Component/ResponsiveComponent";
import { Color } from "../../../../Theme/Color/Index";

export const Style = StyleSheet.create({
    mainContainer: {
        backgroundColor: Color.BACKGROUND,
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: hp(2),
    },
    sectionContainer: {
        paddingHorizontal: wp(5),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(3),
        paddingHorizontal: wp(5),
        backgroundColor: Color.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: Color.BORDER,
        elevation: 2,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    headerTitle: {
        fontSize: 28,
        color: Color.PRIMARY,
        fontWeight: "800",
        letterSpacing: 0.5
    },
    logoutButton: {
        backgroundColor: Color.ACCENT,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.2),
        borderRadius: wp(2.5),
        elevation: 3,
        shadowColor: Color.ACCENT,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    logoutText: {
        fontSize: 14,
        color: Color.WHITE,
        fontWeight: "600",
        letterSpacing: 0.5
    },
    text1:{
        fontSize: 20,
        color: Color.TEXT_PRIMARY,
        fontWeight: "600",
        textAlign: "center"
    },
   
})