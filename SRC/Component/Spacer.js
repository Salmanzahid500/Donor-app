import React from 'react'
import { View } from 'react-native'
import { hp, wp } from './ResponsiveComponent'


const Spacer = ({ height }) => {
    return (
        <View style={{ height: height ? height : hp(2) }}>

        </View>
    )
}
export const HorizontalSpacer = ({ width }) => {
    return (
        <View style={{ marginRight: width ? width : wp(2) }} />
    )
}

export default Spacer