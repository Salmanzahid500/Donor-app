import { StyleSheet } from "react-native";
import { wp, hp } from "../../../../Component/ResponsiveComponent";
import { Color } from "../../../../Theme/Color/Index";

export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Color.BACKGROUND,
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    
    UpdateCard: {
        flex: 1,
        backgroundColor: Color.WHITE,
        marginHorizontal: wp(2),
        marginTop: hp(2),
        marginBottom: hp(2),
        borderRadius: wp(4),
        elevation: 8,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        borderWidth: 1,
        borderColor: Color.BORDER,
    },
   
 
    formScrollView: {
        flex: 1,
    },
    formScrollContent: {
        paddingHorizontal: wp(6),
        paddingTop: hp(3),
        paddingBottom: hp(2),
    },
  
     errorMessage: {
        fontSize: 13,
        fontWeight: '500',
        color: Color.RED,
        textAlign: 'center',
    },
 
});