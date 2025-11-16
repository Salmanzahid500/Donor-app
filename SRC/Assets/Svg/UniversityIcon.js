import React from "react";
import Svg, { Path, Rect, G } from "react-native-svg";

const UniversityIcon = ({ size = 64, color = "#000" }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
  >
    <G
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Pediment (roof triangle) */}
      <Path d="M8 22 L32 6 L56 22" />

      {/* Roof base */}
      <Path d="M10 22 H54" />

      {/* Columns */}
      <Path d="M14 22 V50" />
      <Path d="M22 22 V50" />
      <Path d="M30 22 V50" />
      <Path d="M38 22 V50" />
      <Path d="M46 22 V50" />

      {/* Base */}
      <Rect x="6" y="50" width="52" height="6" rx="1" />

      {/* Door */}
      <Rect x="26" y="34" width="12" height="16" rx="1" fill={color} />
    </G>
  </Svg>
);

export default UniversityIcon;
