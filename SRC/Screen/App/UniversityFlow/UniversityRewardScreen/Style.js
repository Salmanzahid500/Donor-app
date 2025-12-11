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
    text1: {
        fontSize: 20,
        color: Color.TEXT_PRIMARY,
        fontWeight: "600",
        textAlign: "center"
    },
})