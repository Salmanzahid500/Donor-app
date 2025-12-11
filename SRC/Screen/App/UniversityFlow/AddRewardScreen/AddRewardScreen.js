import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Style } from "./Style"
import { MainContainer } from '../../../../Component/MainContainer'
import { AddRewardForm, RewardHeader, RewardList } from './Component/Index'
import Spacer from '../../../../Component/Spacer'
import { UseAddRewardScreen } from "./Hooks/Index"
import { SimpleButton } from '../../../../Component/SimpleButton'
import { Color } from '../../../../Theme/Color/Index'
import { ResponsiveText } from '../../../../Component/ResponsiveText'


const AddRewardScreen = () => {
    const {
        rewardTitle, point, byReward, setPoint, setByReward,
        setRewardTitle, loading, handleReward, validDate, setValidDate,
        errorMessage, rewards, handleEditSelect, resetForm, isEditing
    } = UseAddRewardScreen()
    return (
        <MainContainer style={Style.mainContainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <RewardHeader />
                <Spacer height={25} />
                <AddRewardForm
                    rewardTitle={rewardTitle}
                    byReward={byReward}
                    point={point}
                    setPoint={setPoint}
                    setByReward={setByReward}
                    setRewardTitle={setRewardTitle}
                    validDate={validDate}
                    setValidDate={setValidDate}
                />
                <Spacer />
                <SimpleButton
                    textColor={Color.WHITE}
                    text={isEditing ? "Update Reward" : "Add Reward"}
                    backgroundColor={Color.PRIMARY}
                    style={Style.createButton}
                    onPress={handleReward}
                    loading={loading}
                />
                {isEditing && (
                    <>
                        <Spacer height={15} />
                        <SimpleButton
                            textColor={Color.TEXT_PRIMARY}
                            text={"Cancel Editing"}
                            backgroundColor={Color.SURFACE}
                            style={Style.createButton}
                            onPress={resetForm}
                        />
                    </>
                )}
                {errorMessage &&
                    <ResponsiveText style={Style.errorMessage}>{errorMessage}</ResponsiveText>
                }
                <Spacer height={20} />
                <RewardList
                    rewards={rewards}
                    onEdit={handleEditSelect}
                />
            </ScrollView>
        </MainContainer>
    )
}

export default AddRewardScreen

