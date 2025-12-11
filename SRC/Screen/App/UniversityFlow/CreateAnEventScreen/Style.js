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
    buttonContainer: {
        paddingHorizontal: wp(4),
    },
    createButton: {
        borderRadius: wp(3),
        elevation: 5,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        paddingVertical: hp(1.8),
    },
    text1: {
        fontSize: 28,
        color: Color.PRIMARY,
        fontWeight: "800",
        textAlign: "center",
        letterSpacing: 0.5,
    },
      errorMessage: {
        fontSize: 13,
        fontWeight: '500',
        color: Color.RED,
        textAlign: 'center',
    },
});