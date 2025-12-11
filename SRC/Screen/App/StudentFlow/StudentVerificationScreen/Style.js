import { StyleSheet } from "react-native";
import { wp, hp } from "../../../../Component/ResponsiveComponent"
import { Color } from "../../../../Theme/Color/Index";

export const styles = StyleSheet.create({    
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
        backgroundColor: Color.BACKGROUND,
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
    },
     errorMessage: {
        fontSize: 13,
        fontWeight: '500',
        color: Color.RED,
        textAlign: 'center',
    },
})