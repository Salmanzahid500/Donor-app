import { StyleSheet } from "react-native";
import {wp, hp} from "../../../../Component/ResponsiveComponent"
import { Color } from "../../../../Theme/Color/Index";

export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Color.BACKGROUND,
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: Color.BACKGROUND,
    },
    topBar: {
        backgroundColor: Color.WHITE,
        paddingTop: hp(6),
        paddingBottom: hp(2),
        paddingHorizontal: wp(4),
        borderBottomWidth: 1,
        borderBottomColor: Color.BORDER,
        elevation: 2,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    contentArea: {
        flex: 1,
        backgroundColor: Color.BACKGROUND,
        paddingTop: hp(2),
    },
    sectionContainer: {
        flex:1,
        backgroundColor: Color.WHITE,
        borderRadius: wp(3),
        marginHorizontal: wp(4),
        marginBottom: hp(2),
        elevation: 1,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: Color.BORDER,
    },
    sectionHeader: {
        marginBottom: hp(2.5),
        paddingBottom: hp(1.5),
        paddingHorizontal: wp(3),
        paddingTop: hp(2),
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
    },
    sectionTitle: {
        fontSize: 18,
        color: Color.TEXT_PRIMARY,
        fontWeight: "600",
        marginBottom: hp(0.5),
        letterSpacing: -0.2,
    },
    sectionSubtitle: {
        fontSize: 13,
        color: Color.TEXT_SECONDARY,
        fontWeight: "400",
        lineHeight: 18,
    },
    tabsContainer: {
        backgroundColor: Color.WHITE,
        marginHorizontal: wp(4),
        borderRadius: wp(3),
        elevation: 1,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: Color.BORDER,
        marginBottom: hp(2),
    }
});
