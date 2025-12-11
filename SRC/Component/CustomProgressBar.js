/**
 * Custom Progress Bar Component
 * Displays visual progress indicator for event capacity or similar metrics
 */
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { wp } from "./ResponsiveComponent";
import { Color } from "../Theme/Color/Index";

/**
 * Progress bar with customizable colors and dimensions
 * @param {number} progress - Current progress value (e.g., registered students)
 * @param {number} total - Total capacity (e.g., event capacity)
 * @param {number} height - Height of progress bar
 * @param {string} backgroundColor - Background color of track
 * @param {string} progressColor - Color of progress fill
 * @param {string} textColor - Color of text (if displayed)
 */
export const CustomProgressBar = ({
  progress = 3, 
  total = 5,    
  height = 8,
  backgroundColor = Color.SURFACE_DARK,
  progressColor = Color.SECONDARY,
  textColor = Color.TEXT_PRIMARY,
}) => {
  // Calculate percentage ensuring it doesn't exceed 100%
  const percentage = Math.min(progress / total, 1); 

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.track,
          { height, backgroundColor },
        ]}
      >
        <View
          style={[
            styles.fill,
            { width: `${percentage * 100}%`, backgroundColor: progressColor },
          ]}
        />
      </View>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(80),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf:"center"
  },
  track: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
  },
  fill: {
    height: "100%",
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
});
