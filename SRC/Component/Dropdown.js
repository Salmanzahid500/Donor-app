import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { wp, hp } from "./ResponsiveComponent"
import { Color } from "../Theme/Color/Index"
import { ResponsiveText } from './ResponsiveText'

const DropDown = ({
    items,
    value,
    setValue,
    placeholder,
    zIndex = 1000,
    setIsOpen,
    paddingVertical = hp(2),
    backgroundColor = Color.WHITE,
    searchable = false
}) => {
    const [isOpen, setIsOpenState] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSelect = (item) => {
        setValue(item.value)
        setIsOpenState(false)
        setIsOpen && setIsOpen(false)
        setSearchQuery('')
    }

    const toggleDropdown = () => {
        const newState = !isOpen
        setIsOpenState(newState)
        setIsOpen && setIsOpen(newState)
        if (!newState) {
            setSearchQuery('')
        }
    }

    const selectedItem = items?.find(item => item.value === value)

    const filteredItems = searchable && searchQuery
        ? items.filter(item => 
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : items

    return (
        <View style={[styles.container, { zIndex }]}>
            <TouchableOpacity 
                style={[styles.dropdown, { backgroundColor }]}
                onPress={toggleDropdown}
            >
                <ResponsiveText style={[
                    styles.dropdownText,
                    !selectedItem && { color: Color.LIGHTGREY }
                ]}>
                    {selectedItem ? selectedItem.label : placeholder}
                </ResponsiveText>
                <ResponsiveText style={styles.arrowIcon}>
                    {isOpen ? '▲' : '▼'}
                </ResponsiveText>
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdownList}>
                    {searchable && (
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                placeholderTextColor={Color.LIGHTGREY}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoFocus={false}
                            />
                        </View>
                    )}
                    <ScrollView 
                        style={styles.scrollView}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                        keyboardShouldPersistTaps="handled"
                        bounces={true}
                    >
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <TouchableOpacity
                                    key={item.value}
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
                            ))
                        ) : (
                            <View style={styles.noResultsContainer}>
                                <ResponsiveText style={styles.noResultsText}>
                                    No results found
                                </ResponsiveText>
                            </View>
                        )}
                    </ScrollView>
                </View>
            )}
        </View>
    )
}

export default DropDown

const styles = StyleSheet.create({
    container: {
        width: wp(90),
        alignSelf: 'center',
    },
    dropdown: {
        backgroundColor: Color.WHITE,
        borderColor: Color.LIGHTGREY,
        borderWidth: 1.5,
        borderRadius: wp(1.8),
        height: hp(6),
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
    dropdownList: {
        position: 'absolute',
        top: hp(6.5),
        width: '100%',
        backgroundColor: Color.WHITE,
        borderColor: Color.LIGHTGREY,
        borderWidth: 1.5,
        borderRadius: wp(1.8),
        maxHeight: hp(30),
        elevation: 10,
        shadowColor: Color.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        zIndex: 9999,
        overflow: 'hidden',
    },
    searchContainer: {
        padding: wp(2),
        borderBottomWidth: 1,
        borderBottomColor: Color.LIGHTGREY,
        backgroundColor: Color.WHITE,
    },
    searchInput: {
        height: hp(5),
        backgroundColor: '#F5F5F5',
        borderColor: Color.LIGHTGREY,
        borderWidth: 1,
        borderRadius: wp(1.8),
        paddingHorizontal: wp(3),
        fontSize: 14,
        color: Color.BLACK,
    },
    scrollView: {
        maxHeight: hp(22),
        backgroundColor: Color.WHITE,
    },
    item: {
        padding: wp(4),
        borderBottomWidth: 1,
        borderBottomColor: Color.BORDER,
        backgroundColor: Color.WHITE,
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
    noResultsContainer: {
        padding: wp(4),
        alignItems: 'center',
        backgroundColor: Color.WHITE,
    },
    noResultsText: {
        fontSize: 14,
        color: Color.LIGHTGREY,
        fontStyle: 'italic',
    },
})
