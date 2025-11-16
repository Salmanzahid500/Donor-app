import React, { useMemo } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { wp } from './ResponsiveComponent';
import { Color } from '../Theme/Color/Index';

export const MainContainer = ({
  style,
  containerStyle,
  children,
  paddingHorizontal = 0,
  keyboardVerticalOffset = 0,
  behavior = Platform.OS === 'ios' ? 'padding' : 'height',
  backgroundColor = Color.WHITE,
  statusBackgroundColor = Color.BLACK, // ✅ top area color
  topEdges = ['top'],
  enableKeyboardAvoiding = true, // ✅ optional toggle
}) => {
  const screenHeight = useMemo(() => Dimensions.get('screen').height, []);

  return (
    <View style={{ flex: 1, backgroundColor }}>
      {/* Make status bar transparent so SafeAreaView shows color */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Top safe area colored */}
      <SafeAreaView style={{ backgroundColor: statusBackgroundColor }} edges={topEdges} />

      {/* Main content safe area */}
      <SafeAreaView style={[styles.safeArea, style]} edges={['left', 'right', 'bottom']}>
        <View style={styles.flex}>
          <View
            style={[
              styles.container,
              { paddingHorizontal: wp(paddingHorizontal) },
              containerStyle,
            ]}
          >
            {enableKeyboardAvoiding ? (
              <KeyboardAvoidingView
                style={styles.flex}
                behavior={behavior}
                keyboardVerticalOffset={keyboardVerticalOffset}
              >
                {children}
              </KeyboardAvoidingView>
            ) : (
              <View style={styles.flex}>{children}</View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  container: { flex: 1 },
});
