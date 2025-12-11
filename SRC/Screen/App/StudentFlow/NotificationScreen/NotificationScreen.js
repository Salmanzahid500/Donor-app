import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { styles } from "./Style"
import {Header, NotificationCard} from "./Component/Index"

const NotificationScreen = (props) => {
    const {item} = props?.route?.params || {}
    return (
        <MainContainer style={styles.mainContainer}>
            <Header backPress={()=>props?.navigation?.goBack()}/>
            <NotificationCard notification={item}/>
        </MainContainer>
    )
}

export default NotificationScreen

