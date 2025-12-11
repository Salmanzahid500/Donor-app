import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import { Icons } from '../../../../../Assets/Index'

export const Header = ({ backPress }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={backPress}
                activeOpacity={0.7}
            >
                <Icons.BackArrowIcon size={24} color={Color.WHITE} />
            </TouchableOpacity>
            <ResponsiveText style={styles.headerTitle}>Notification</ResponsiveText>
            <View style={styles.headerRight} />
        </View>
    )
}
export const NotificationCard = ({ notification }) => {
    return (
        <FlatList
            data={notification}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View
                    style={styles.card}
                >
                    <View style={styles.iconContainer}>
                        <ResponsiveText style={styles.icon}>
                            {item.type === "event" ? "🎯" : "🎁"}
                        </ResponsiveText>
                    </View>

                    <View style={styles.contentContainer}>
                        <ResponsiveText numberOfLines={1} style={styles.title}>
                            {item.title}
                        </ResponsiveText>
                        <ResponsiveText numberOfLines={2} style={styles.description}>
                            {item.description}
                        </ResponsiveText>
                        <ResponsiveText style={styles.time}>
                            {item.time?.toDate?.().toLocaleString() || ""}
                        </ResponsiveText>
                    </View>
                </View>

            )}
        />
    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    backButton: {
        padding: wp(2),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Color.WHITE,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: wp(2),
    },
    card: {
        flexDirection: "row",
        backgroundColor: Color.WHITE,
        borderRadius: wp(3),
        padding: wp(3),
        marginHorizontal: wp(4),
        marginVertical: hp(0.7),
        borderLeftWidth: 4,
        borderLeftColor: Color.PRIMARY,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    iconContainer: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        marginRight: wp(3),
    },
    icon: {
        fontSize: 26,
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: "700",
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.3),
    },
    description: {
        fontSize: 12,
        fontWeight: "500",
        color: Color.TEXT_SECONDARY,
        marginBottom: hp(0.6),
    },
    time: {
        fontSize: 10,
        fontWeight: "500",
        color: Color.TEXT_LIGHT,
    },
})