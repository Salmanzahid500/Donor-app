import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Color } from '../../../../../Theme/Color/Index'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { wp, hp } from '../../../../../Component/ResponsiveComponent'
import { CustomProgressBar } from "../../../../../Component/CustomProgressBar"
import Spacer from '../../../../../Component/Spacer'
import { Images, Icons } from '../../../../../Assets/Index'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

export const EventHeader = () => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.headerBackButton}
        onPress={handleGoBack}
        activeOpacity={0.7}
      >
        <Icons.BackArrowIcon size={24} color={Color.WHITE} />
      </TouchableOpacity>

      <View style={styles.headerContent}>
        <View style={styles.eventBadge}>
          <Text style={styles.badgeIcon}>🩸</Text>
          <ResponsiveText style={styles.badgeText}>Blood Drive</ResponsiveText>
        </View>
        <ResponsiveText style={styles.eventTitle}>Community Blood Donation</ResponsiveText>
        <ResponsiveText style={styles.eventSubtitle}>Join us in saving lives through donation</ResponsiveText>

        <View style={styles.urgencyIndicator}>
          <View style={styles.urgencyBadge}>
            <ResponsiveText style={styles.urgencyText}>HIGH PRIORITY</ResponsiveText>
          </View>
          <ResponsiveText style={styles.urgencyDesc}>Critical blood supply needed</ResponsiveText>
        </View>
      </View>
    </View>
  )
}

export const EventInfo = ({
  events
}) => {
  const timeRange = events?.time;
  const [startTime, endTime] = timeRange.split(" - ");
  const start = moment(startTime, "hh:mm A");
  const end = moment(endTime, "hh:mm A");
  const duration = end.diff(start, "hours");
  const registered = events?.registeredStudent || 0;
  const capacity = events?.capacity || 0;
  const remaining = capacity - registered;
  const percent = capacity > 0 ? Math.round((registered / capacity) * 100) : 0;

  return (
    <View style={styles.infoCard}>
      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <View style={styles.infoIconContainer}>
            <ResponsiveText style={styles.infoIcon}>📅</ResponsiveText>
          </View>
          <View style={styles.infoContent}>
            <ResponsiveText style={styles.infoLabel}>Date</ResponsiveText>
            <ResponsiveText style={styles.infoValue}>{moment(events?.date, "DD/MM/YYYY").format("DD MMMM YYYY")}</ResponsiveText>
            <ResponsiveText style={styles.infoSecondary}>{moment(events?.date, "DD/MM/YYYY").format("dddd")}</ResponsiveText>
          </View>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.infoIconContainer}>
            <ResponsiveText style={styles.infoIcon}>🕐</ResponsiveText>
          </View>
          <View style={styles.infoContent}>
            <ResponsiveText style={styles.infoLabel}>Time</ResponsiveText>
            <ResponsiveText style={styles.infoValue}>{events?.time}</ResponsiveText>
            <ResponsiveText style={styles.infoSecondary}>{duration} hours duration</ResponsiveText>
          </View>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.infoIconContainer}>
            <ResponsiveText style={styles.infoIcon}>📍</ResponsiveText>
          </View>
          <View style={styles.infoContent}>
            <ResponsiveText style={styles.infoLabel}>Location</ResponsiveText>
            <ResponsiveText style={styles.infoValue}>{events?.address}</ResponsiveText>
            <ResponsiveText style={styles.infoSecondary}>Main Campus Building</ResponsiveText>
          </View>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.infoIconContainer}>
            <ResponsiveText style={styles.infoIcon}>👥</ResponsiveText>
          </View>
          <View style={styles.infoContent}>
            <ResponsiveText style={styles.infoLabel}>Capacity</ResponsiveText>
            <ResponsiveText style={styles.infoValue}>{registered || 0} of {capacity} registered</ResponsiveText>
            <ResponsiveText style={styles.infoSecondary}>{remaining} spots remaining</ResponsiveText>
          </View>
        </View>
      </View>

      <View style={styles.progressSection}>
        <ResponsiveText style={styles.progressLabel}>Registration Progress</ResponsiveText>
        <CustomProgressBar progress={registered} total={capacity} />
        <View style={styles.progressStats}>
          <ResponsiveText style={styles.progressText}>{percent}% filled</ResponsiveText>
          <ResponsiveText style={styles.spotsRemaining}>{remaining} spots left</ResponsiveText>
        </View>
      </View>
    </View>
  )
}

export const EventRequired = () => {
  const requirements = [
    {
      icon: '🎂',
      title: 'Age Requirement',
      description: 'Must be between 18-60 years old',
      status: 'required'
    },
    {
      icon: '⚖️',
      title: 'Weight Requirement',
      description: 'Minimum weight of 50kg (110 lbs)',
      status: 'required'
    },
    {
      icon: '💊',
      title: 'Health Status',
      description: 'No recent illness or medication',
      status: 'required'
    },
    {
      icon: '🆔',
      title: 'Valid ID',
      description: 'Government-issued photo identification',
      status: 'required'
    },
    {
      icon: '🥤',
      title: 'Pre-donation',
      description: 'Eat well and stay hydrated before arrival',
      status: 'recommended'
    }
  ];

  return (
    <View style={styles.requirementsCard}>
      <View style={styles.requirementsList}>
        {requirements.map((req, index) => (
          <View key={index} style={styles.requirementItem}>
            <View style={styles.reqIconContainer}>
              <Text style={styles.reqIcon}>{req.icon}</Text>
            </View>
            <View style={styles.reqContent}>
              <View style={styles.reqHeader}>
                <ResponsiveText style={styles.reqTitle}>{req.title}</ResponsiveText>
                <View style={[styles.statusBadge, {
                  backgroundColor: req.status === 'required' ? Color.ERROR : Color.WARNING
                }]}>
                  <ResponsiveText style={styles.statusText}>
                    {req.status === 'required' ? 'REQUIRED' : 'RECOMMENDED'}
                  </ResponsiveText>
                </View>
              </View>
              <ResponsiveText style={styles.reqDescription}>{req.description}</ResponsiveText>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.healthNote}>
        <Text style={styles.noteIcon}>⚡</Text>
        <ResponsiveText style={styles.noteText}>
          Please ensure you meet all requirements before attending. Our medical team will conduct a brief health screening upon arrival.
        </ResponsiveText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // Header Styles
  headerContainer: {
    backgroundColor: Color.PRIMARY,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(4),
    borderBottomLeftRadius: wp(6),
    borderBottomRightRadius: wp(6),
    elevation: 8,
    shadowColor: Color.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    position: 'relative',
  },
  headerBackButton: {
    position: 'absolute',
    top: hp(2),
    left: wp(5),
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerBackArrow: {
    fontSize: 18,
    color: Color.WHITE,
    fontWeight: '600',
  },
  headerContent: {
    alignItems: 'center',
  },
  eventBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(5),
    marginBottom: hp(2),
  },
  badgeIcon: {
    fontSize: 18,
    marginRight: wp(2),
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.WHITE,
    letterSpacing: 0.5,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Color.WHITE,
    textAlign: 'center',
    marginBottom: hp(0.5),
    letterSpacing: 0.3,
  },
  eventSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: hp(2),
    lineHeight: 22,
  },
  urgencyIndicator: {
    alignItems: 'center',
    marginTop: hp(1),
  },
  urgencyBadge: {
    backgroundColor: Color.ACCENT,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.7),
    borderRadius: wp(4),
    marginBottom: hp(0.7),
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '700',
    color: Color.WHITE,
    letterSpacing: 1,
  },
  urgencyDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },

  // Event Info Styles
  infoCard: {
    backgroundColor: Color.SURFACE,
    borderRadius: wp(4),
    padding: wp(4),
    borderWidth: 1,
    borderColor: Color.BORDER,
  },
  infoGrid: {
    marginBottom: hp(3),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: Color.BORDER,
    marginBottom: hp(1),
  },
  infoIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: Color.PRIMARY + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
  },
  infoIcon: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Color.TEXT_SECONDARY,
    marginBottom: hp(0.3),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.TEXT_PRIMARY,
    marginBottom: hp(0.3),
  },
  infoSecondary: {
    fontSize: 13,
    fontWeight: '400',
    color: Color.TEXT_LIGHT,
  },
  progressSection: {
    paddingTop: hp(2),
    borderTopWidth: 1,
    borderTopColor: Color.BORDER,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.TEXT_PRIMARY,
    marginBottom: hp(1.5),
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  progressText: {
    fontSize: 13,
    fontWeight: '500',
    color: Color.SECONDARY,
  },
  spotsRemaining: {
    fontSize: 13,
    fontWeight: '500',
    color: Color.ACCENT,
  },

  // Requirements Styles
  requirementsCard: {
    backgroundColor: Color.SURFACE,
    borderRadius: wp(4),
    padding: wp(4),
    borderWidth: 1,
    borderColor: Color.BORDER,
  },
  requirementsList: {
    marginBottom: hp(2),
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: Color.BORDER,
    marginBottom: hp(1),
  },
  reqIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: Color.SECONDARY + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
    marginTop: hp(0.5),
  },
  reqIcon: {
    fontSize: 18,
  },
  reqContent: {
    flex: 1,
  },
  reqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.8),
  },
  reqTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.TEXT_PRIMARY,
    flex: 1,
    marginRight: wp(2),
  },
  statusBadge: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    borderRadius: wp(2),
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: Color.WHITE,
    letterSpacing: 0.5,
  },
  reqDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.TEXT_SECONDARY,
    lineHeight: 20,
  },
  healthNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Color.WARNING + '10',
    padding: wp(4),
    borderRadius: wp(3),
    borderLeftWidth: 4,
    borderLeftColor: Color.WARNING,
    marginTop: hp(2),
  },
  noteIcon: {
    fontSize: 16,
    marginRight: wp(3),
    marginTop: hp(0.2),
  },
  noteText: {
    fontSize: 13,
    fontWeight: '400',
    color: Color.TEXT_SECONDARY,
    lineHeight: 18,
    flex: 1,
  },
})