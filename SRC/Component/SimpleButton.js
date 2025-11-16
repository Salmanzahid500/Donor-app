import { TouchableOpacity, ActivityIndicator, View, Image, StyleSheet } from "react-native";
import { hp, wp } from './ResponsiveComponent';
import { ResponsiveText } from './ResponsiveText';
import { Color } from '../Theme/Color/Index';
export const SimpleButton = ({
    onPress,
    text,
    loading,
    backgroundColor,
    textColor,
    buttonWidth,
    borderRadius,
    btnImage,
    height,
    btnStyles,
    fontSize=22
}) => {
    return (
        <TouchableOpacity
            style={{
                width:buttonWidth?buttonWidth:wp(90),
                backgroundColor:backgroundColor?backgroundColor:Color.RED,
                height:height?height:hp(6),
                borderRadius:borderRadius?borderRadius:wp(2),
                alignItems:"center",
                justifyContent:"center",
                alignSelf:"center"
            }}
            onPress={onPress}>
            {loading ?
                <ActivityIndicator size={'large'} color={Color.LIGHTGREY} /> :
                <View style={{ justifyContent:"center",alignItems:"center", alignSelf: 'center' }}>
                    {btnImage ?
                        <Image source={btnImage} resizeMode="contain" style={styles.btnImage} />
                        : null}
                    <ResponsiveText
                        style={[{
                            fontSize: fontSize,
                            color: textColor ? textColor : Color.BLACK,
                            textAlign: 'center',
                        }, btnStyles]}>
                        {text}
                    </ResponsiveText>
                </View>
            } 
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    btnImage: {
        width: wp(5),
        height: hp(2.5),
        marginRight: wp(2),
    },
})
