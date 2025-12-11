import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import { Color } from '../../../../Theme/Color/Index'
import { hp, wp } from '../../../../Component/ResponsiveComponent'
import Spacer from '../../../../Component/Spacer'
import { SimpleButton } from '../../../../Component/SimpleButton'
import { Icons } from '../../../../Assets/Index'

const CompatibilityScreen = (props) => {
    const [selectedView, setSelectedView] = useState('matrix') // 'matrix' or 'table'

    const MatrixView = () => {
        const bloodTypes = ['O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+']

        const compatibilityMatrix = {
            'AB+': ['O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+'],
            'AB-': ['O-', 'B-', 'A-', 'AB-'],
            'A+': ['O-', 'O+', 'A-', 'A+'],
            'A-': ['O-', 'A-'],
            'B+': ['O-', 'O+', 'B-', 'B+'],
            'B-': ['O-', 'B-'],
            'O+': ['O-', 'O+'],
            'O-': ['O-']
        }

        const isCompatible = (donor, recipient) => {
            return compatibilityMatrix[recipient]?.includes(donor) || false
        }

        return (
            <View style={styles.matrixCard}>
                {/* Accept From Header - no background, simple text */}
                <View style={styles.matrixHeader}>
                    <ResponsiveText style={styles.matrixTitle}>Accept From</ResponsiveText>
                </View>

                <View style={styles.matrixMainContainer}>
                    {/* Matrix content */}
                    <View style={styles.matrixContainer}>
                        {/* Header row */}
                        <View style={styles.matrixRow}>
                            <View style={styles.matrixCorner} />
                            {bloodTypes.map((type) => (
                                <View key={type} style={styles.matrixHeaderCell}>
                                    <ResponsiveText style={styles.matrixHeaderText}>{type}</ResponsiveText>
                                </View>
                            ))}
                        </View>

                        {/* Data rows */}
                        {bloodTypes.map((recipient) => (
                            <View key={recipient} style={styles.matrixRow}>
                                <View style={styles.matrixRowHeader}>
                                    <ResponsiveText style={styles.matrixRowText}>{recipient}</ResponsiveText>
                                </View>
                                {bloodTypes.map((donor) => (
                                    <View key={donor} style={styles.matrixCell}>
                                        {isCompatible(donor, recipient) && (
                                            <Text style={styles.bloodDrop}>🩸</Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>

                    {/* Left side label - Donate To */}
                    <View style={styles.leftLabelContainer}>
                        <ResponsiveText style={styles.donateToText}>Donate To</ResponsiveText>
                    </View>
                </View>
            </View>
        )
    }

    const TableView = () => {
        const compatibilityData = [
            { bloodType: 'A+', canGiveTo: 'A+ AB+', canReceiveFrom: 'A+ A- O+ O-' },
            { bloodType: 'A-', canGiveTo: 'A+ A- AB+ AB-', canReceiveFrom: 'A- O-' },
            { bloodType: 'B+', canGiveTo: 'B+ AB+', canReceiveFrom: 'B+ B- O+ O-' },
            { bloodType: 'B-', canGiveTo: 'B+ B- AB+ AB-', canReceiveFrom: 'B- O-' },
            { bloodType: 'AB+', canGiveTo: 'AB+', canReceiveFrom: 'Everyone' },
            { bloodType: 'AB-', canGiveTo: 'AB+ AB-', canReceiveFrom: 'AB- A- B- O-' },
            { bloodType: 'O+', canGiveTo: 'A+ B+ AB+ O+', canReceiveFrom: 'O+ O-' },
            { bloodType: 'O-', canGiveTo: 'Everyone', canReceiveFrom: 'O-' },
        ]

        return (
            <View style={styles.tableCard}>
                <View style={styles.tableHeader}>
                    <View style={styles.tableHeaderCell}>
                        <ResponsiveText style={styles.tableHeaderText}>Blood Type</ResponsiveText>
                    </View>
                    <View style={styles.tableHeaderCell}>
                        <ResponsiveText style={styles.tableHeaderText}>Can Give to</ResponsiveText>
                    </View>
                    <View style={styles.tableHeaderCell}>
                        <ResponsiveText style={styles.tableHeaderText}>Can Receive from</ResponsiveText>
                    </View>
                </View>

                {compatibilityData.map((item, index) => (
                    <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? Color.WHITE : Color.SURFACE }]}>
                        <View style={styles.tableCell}>
                            <ResponsiveText style={styles.bloodTypeText}>{item.bloodType}</ResponsiveText>
                        </View>
                        <View style={styles.tableCell}>
                            <ResponsiveText style={styles.tableCellText}>{item.canGiveTo}</ResponsiveText>
                        </View>
                        <View style={styles.tableCell}>
                            <ResponsiveText style={styles.tableCellText}>{item.canReceiveFrom}</ResponsiveText>
                        </View>
                    </View>
                ))}
            </View>
        )
    }

    return (
        <MainContainer style={styles.mainContainer}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => props?.navigation?.goBack()}
                    activeOpacity={0.7}
                >
                    <Icons.BackArrowIcon size={24} color={Color.WHITE} />
                </TouchableOpacity>
                <ResponsiveText style={styles.headerTitle}>Compatibility</ResponsiveText>
                <View style={styles.headerPlaceholder} />
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Spacer height={hp(2)} />

                {/* Description Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                        <Text style={styles.infoIcon}>🩸</Text>
                        <ResponsiveText style={styles.infoTitle}>Blood Type Compatibility</ResponsiveText>
                    </View>
                    <ResponsiveText style={styles.infoDescription}>
                        Understanding blood type compatibility is crucial for safe blood transfusions.
                        Check which blood types can donate to or receive from each other.
                    </ResponsiveText>
                </View>

                <Spacer height={hp(2)} />

                {/* View Toggle */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, selectedView === 'matrix' && styles.toggleButtonActive]}
                        onPress={() => setSelectedView('matrix')}
                        activeOpacity={0.7}
                    >
                        <ResponsiveText style={[styles.toggleText, selectedView === 'matrix' && styles.toggleTextActive]}>
                            Matrix View
                        </ResponsiveText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, selectedView === 'table' && styles.toggleButtonActive]}
                        onPress={() => setSelectedView('table')}
                        activeOpacity={0.7}
                    >
                        <ResponsiveText style={[styles.toggleText, selectedView === 'table' && styles.toggleTextActive]}>
                            Table View
                        </ResponsiveText>
                    </TouchableOpacity>
                </View>

                <Spacer height={hp(2)} />

                {/* Compatibility Display */}
                {selectedView === 'matrix' ? <MatrixView /> : <TableView />}

                <Spacer height={hp(2)} />

                {/* Important Notes */}
                <View style={styles.notesCard}>
                    <ResponsiveText style={styles.notesTitle}>Important Notes</ResponsiveText>
                    <View style={styles.noteItem}>
                        <Text style={styles.noteIcon}>⚠️</Text>
                        <ResponsiveText style={styles.noteText}>
                            Always consult medical professionals before blood transfusion
                        </ResponsiveText>
                    </View>
                    <View style={styles.noteItem}>
                        <Text style={styles.noteIcon}>
                            🩺</Text>
                        <ResponsiveText style={styles.noteText}>
                            Additional testing may be required for complete compatibility
                        </ResponsiveText>
                    </View>
                    <View style={styles.noteItem}>
                        <Text style={styles.noteIcon}>🆘</Text>
                        <ResponsiveText style={styles.noteText}>
                            O- is universal donor, AB+ is universal recipient
                        </ResponsiveText>
                    </View>
                </View>

                <Spacer height={hp(3)} />
            </ScrollView>
        </MainContainer>
    )
}

export default CompatibilityScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Color.BACKGROUND,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        backgroundColor: Color.PRIMARY,
        elevation: 4,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    backButton: {
        padding: wp(2),
        borderRadius: wp(2),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    backIcon: {
        fontSize: 20,
        color: Color.WHITE,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Color.WHITE,
        textAlign: 'center',
    },
    headerPlaceholder: {
        width: wp(10),
    },
    container: {
        flex: 1,
        backgroundColor: Color.BACKGROUND,
    },
    scrollContent: {
        paddingHorizontal: wp(4),
        paddingBottom: hp(3),
    },
    infoCard: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(3),
        padding: wp(4),
        borderWidth: 1,
        borderColor: Color.BORDER,
        elevation: 2,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    infoIcon: {
        fontSize: 24,
        marginRight: wp(3),
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
    },
    infoDescription: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        lineHeight: 20,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: Color.SURFACE,
        borderRadius: wp(2),
        padding: wp(1),
        borderWidth: 1,
        borderColor: Color.BORDER,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: hp(1.5),
        borderRadius: wp(1.5),
        alignItems: 'center',
    },
    toggleButtonActive: {
        backgroundColor: Color.PRIMARY,
        elevation: 2,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.TEXT_SECONDARY,
    },
    toggleTextActive: {
        color: Color.WHITE,
    },    // Matrix View Styles
    matrixCard: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(3),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Color.BORDER,
        elevation: 2,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    matrixHeader: {
        padding: wp(3),
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    matrixTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: Color.PRIMARY,
        textAlign: 'center',
    },
    matrixMainContainer: {
        flexDirection: 'row',
        padding: wp(2),
        position: 'relative',
    },
    leftLabelContainer: {
        position: 'absolute',
        left: wp(1),
        top: 0,
        bottom: 0,
        width: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    matrixContainer: {
        marginLeft: wp(8),
        flex: 1,
    },
    matrixRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    matrixCorner: {
        width: wp(12),
        height: hp(4),
        backgroundColor: Color.SURFACE,
        borderWidth: 1,
        borderColor: Color.BORDER,
    },
    matrixHeaderCell: {
        width: wp(8),
        height: hp(4),
        backgroundColor: Color.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Color.WHITE,
    },
    matrixHeaderText: {
        fontSize: 10,
        fontWeight: '700',
        color: Color.WHITE,
    },
    matrixRowHeader: {
        width: wp(12),
        height: hp(4),
        backgroundColor: Color.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Color.WHITE,
    },
    matrixRowText: {
        fontSize: 12,
        fontWeight: '700',
        color: Color.WHITE,
    },
    matrixCell: {
        width: wp(8),
        height: hp(4),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.SURFACE,
        borderWidth: 1,
        borderColor: Color.BORDER,
    }, bloodDrop: {
        fontSize: 14,
    }, donateToText: {
        fontSize: 12,
        fontWeight: '600',
        color: Color.PRIMARY,
        transform: [{ rotate: '270deg' }],
        textAlign: 'center',
        width: wp(15),
    },
    // Table View Styles
    tableCard: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(3),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Color.BORDER,
        elevation: 2,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: Color.PRIMARY,
    },
    tableHeaderCell: {
        flex: 1,
        padding: wp(3),
        borderRightWidth: 1,
        borderRightColor: Color.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableHeaderText: {
        fontSize: 12,
        fontWeight: '700',
        color: Color.WHITE,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Color.BORDER,
    },
    tableCell: {
        flex: 1,
        padding: wp(3),
        borderRightWidth: 1,
        borderRightColor: Color.BORDER,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: hp(5),
    },
    bloodTypeText: {
        fontSize: 14,
        fontWeight: '700',
        color: Color.PRIMARY,
    },
    tableCellText: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        textAlign: 'center',
    },
    // Notes Styles
    notesCard: {
        backgroundColor: Color.WARNING_LIGHT,
        borderRadius: wp(3),
        padding: wp(4),
        borderWidth: 1,
        borderColor: Color.WARNING,
    },
    notesTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Color.WARNING_DARK,
        marginBottom: hp(2),
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: hp(1.5),
    },
    noteIcon: {
        fontSize: 16,
        marginRight: wp(3),
        marginTop: hp(0.2),
    },
    noteText: {
        fontSize: 13,
        color: Color.WARNING_DARK,
        flex: 1,
        lineHeight: 18,
    },
})
