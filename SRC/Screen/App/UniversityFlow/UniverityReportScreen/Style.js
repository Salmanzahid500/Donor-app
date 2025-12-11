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
        paddingHorizontal: wp(4),
    },
    text1: {
        fontSize: 28,
        color: Color.PRIMARY,
        fontWeight: "800",
        textAlign: "center",
        letterSpacing: 0.5,
    },
    text2: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        fontWeight: "500",
        textAlign: "center",
        marginBottom: hp(0.5),
    },
    text3: {
        fontSize: 24,
        color: Color.TEXT_PRIMARY,
        fontWeight: "700",
        textAlign: "center",
    },
    view1: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: Color.WHITE,
        paddingVertical: hp(3),
        paddingHorizontal: wp(4),
        borderRadius: wp(4),
        marginHorizontal: wp(4),
        elevation: 3,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        borderWidth: 1,
        borderColor: Color.BORDER,
    },
});