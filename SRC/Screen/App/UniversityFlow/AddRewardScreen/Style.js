import { StyleSheet } from "react-native";
import {hp, wp} from "../../../../Component/ResponsiveComponent"
import { Color } from "../../../../Theme/Color/Index";

export const Style = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:wp(3)
    },
     mainContainer: {
        backgroundColor: Color.BACKGROUND,
        flex: 1,
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
      errorMessage: {
        fontSize: 13,
        fontWeight: '500',
        color: Color.RED,
        textAlign: 'center',
    },
})