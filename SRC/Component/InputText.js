import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { hp, wp } from './ResponsiveComponent'
import { Color } from '../Theme/Color/Index'

const InputText = ({
  onFocus, onBlur,
  value, onChangeText,
  placeholder,
  secureTextEntry,
  style,
  placeholderTextColor,
  handleIconPress,
  rightIcon,
  RightIconChildren,
  IsLeftIcon,
  leftIconChildren,
  width = wp(90),
  height = hp(6),
  borderRadius = wp(2),
  borderColor = Color.LIGHTGREY,
  backgroundColor = Color.WHITE,
  paddingHorizontal = wp(3), // default padding inside input
  fontSize = 14,
  numberOfLines,
  multiline,
  textAlignVertical
}) => {
  return (
    // <View style={[styles.container, style]}>
      <View style={[
        styles.inputWrapper,
        {
          width,
          height,
          borderRadius,
          borderColor,
          backgroundColor,
        }
      ]}>

        {/* Left Icon */}
        {IsLeftIcon && (
          <View style={styles.leftIcon}>
            {leftIconChildren}
          </View>
        )}

        {/* TextInput */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={[
            styles.input,
            {
              flex: 1,
              fontSize,
              color: Color.BLACK,
              paddingHorizontal,
            }
          ]}
          placeholderTextColor={placeholderTextColor ? placeholderTextColor : Color.LIGHTGREY}
          onBlur={onBlur}
          onFocus={onFocus}
          numberOfLines={numberOfLines}
          multiline={multiline}
          textAlignVertical={textAlignVertical}
        />

        {/* Right Icon */}
        {rightIcon && (
          <TouchableOpacity onPress={handleIconPress} style={styles.rightIcon}>
            {RightIconChildren}
          </TouchableOpacity>
        )}
      </View>
    // </View>
  )
}

export default InputText

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    // alignItems: 'center',
    // alignItems:"flex-start",
    borderWidth: 1.5,
    paddingHorizontal: wp(2),
    borderColor:Color.LIGHTGREY,
    alignSelf:"center"
  },
  input: {
    color: Color.gray1,
  },
  leftIcon: {
    marginRight: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    marginLeft: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
})
