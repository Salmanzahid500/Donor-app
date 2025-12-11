import { useEffect, useState } from "react"
import { addReward, listenToReward, updateReward } from "../../../../../FireBase/Index"
import { Alert } from "react-native"


export const UseAddRewardScreen = () => {
    const [rewardTitle, setRewardTitle] = useState("")
    const [byReward, setByReward] = useState("")
    const [point, setPoint] = useState("")
    const [validDate, setValidDate] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [rewards, setRewards] = useState([])
    const [editingRewardId, setEditingRewardId] = useState(null)

    useEffect(() => {
        const unsubscribe = listenToReward((data) => setRewards(data))
        return () => unsubscribe && unsubscribe()
    }, [])

    const resetForm = () => {
        setRewardTitle("")
        setByReward("")
        setPoint("")
        setValidDate("")
        setErrorMessage("")
        setEditingRewardId(null)
    }

    const handleEditSelect = (reward) => {
        setRewardTitle(reward?.rewardTitle || "")
        setByReward(reward?.byReward || "")
        setPoint(String(reward?.pointsNeeded ?? ""))
        setValidDate(reward?.validDate || "")
        setEditingRewardId(reward?.id || null)
        setErrorMessage("")
    }

    const handleReward = async () => {
        if (!rewardTitle?.trim()) {
            setErrorMessage("Reward title is required")
            return
        }
        const numericPoints = Number(point)
        if (Number.isNaN(numericPoints) || numericPoints <= 0) {
            setErrorMessage("Points must be a positive number")
            return
        }
        setLoading(true)
        try {
            const payload = {
                rewardTitle: rewardTitle,
                byReward: byReward,
                pointsNeeded: numericPoints,
                validDate: validDate
            }
            const handleResponse = editingRewardId
                ? await updateReward({ rewardId: editingRewardId, payload })
                : await addReward(payload)
            console.log(handleResponse)
            if (handleResponse.success === true) {
                Alert.alert(editingRewardId ? "Reward updated" : "Reward Added")
                resetForm()

            }
            else {
                setErrorMessage("SomeThing went Wrong, Try Again Letter")
            }
        } catch (error) {
            console.log(error, "error")
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    return {
        rewardTitle, setRewardTitle, byReward, setByReward,
        point, setPoint, handleReward, loading, validDate, setValidDate,
        errorMessage, rewards, handleEditSelect, resetForm,
        isEditing: Boolean(editingRewardId)
    }
}


