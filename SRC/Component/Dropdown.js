import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Modal, FlatList } from 'react-native'
import { wp, hp } from "./ResponsiveComponent"
import { Color } from "../Theme/Color/Index"
import { ResponsiveText } from './ResponsiveText'

const DropDown = ({
    items,
    value,
    setValue,
    placeholder,
    zIndex,
    setIsOpen,
    paddingVertical = hp(2),
    backgroundColor = Color.WHITE
}) => {
    const [modalVisible, setModalVisible] = useState(false)

    const handleSelect = (item) => {
        setValue(item.value)
        setModalVisible(false)
        setIsOpen && setIsOpen(false)
    }

    const toggleModal = () => {
        const newState = !modalVisible
        setModalVisible(newState)
        setIsOpen && setIsOpen(newState)
    }

    const selectedItem = items?.find(item => item.value === value)

    return (
        <>
            <TouchableOpacity 
                style={[styles.dropdown, { backgroundColor }]}
                onPress={toggleModal}
            >
                <ResponsiveText style={[
                    styles.dropdownText,
                    !selectedItem && { color: Color.LIGHTGREY }
                ]}>
                    {selectedItem ? selectedItem.label : placeholder}
                </ResponsiveText>
                <ResponsiveText style={styles.arrowIcon}>▼</ResponsiveText>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <FlatList
                            data={items}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.item,
                                        item.value === value && styles.selectedItem
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <ResponsiveText style={[
                                        styles.itemText,
                                        item.value === value && styles.selectedItemText
                                    ]}>
                                        {item.label}
                                    </ResponsiveText>
                                </TouchableOpacity>
                            )}
                            style={styles.list}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    )
}

export default DropDown

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: Color.WHITE,
        borderColor: Color.LIGHTGREY,
        borderWidth: 1.5,
        borderRadius: wp(1.8),
        width: wp(90),
        height: hp(6),
        alignSelf: "center",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(3),
    },
    dropdownText: {
        color: Color.BLACK,
        fontSize: 14,
        flex: 1,
    },
    arrowIcon: {
        color: Color.PRIMARY,
        fontSize: 12,
        marginLeft: wp(2),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(2),
        width: wp(80),
        maxHeight: hp(40),
        elevation: 5,
        shadowColor: Color.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    list: {
        maxHeight: hp(35),
    },
    item: {
        padding: wp(4),
        borderBottomWidth: 1,
        borderBottomColor: Color.BORDER,
    },
    selectedItem: {
        backgroundColor: Color.PRIMARY,
    },
    itemText: {
        fontSize: 14,
        color: Color.BLACK,
    },
    selectedItemText: {
        color: Color.WHITE,
        fontWeight: '600',
    },
})
