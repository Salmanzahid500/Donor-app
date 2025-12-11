import React from 'react'
import Svg, { Circle, Path, Rect, Polygon, G } from 'react-native-svg'

export const RewardsIcon = ({ size = 24, color = '#222', focused = false, strokeWidth = 1.6 }) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        accessible
        accessibilityRole="image"
        accessibilityLabel="Rewards"
    >
        {/* outer badge */}
        <Circle
            cx="12"
            cy="9"
            r="5.2"
            fill={focused ? color : 'none'}
            stroke={color}
            strokeWidth={strokeWidth}
        />


        {/* star inside badge */}
        <Polygon
            points="12,5.8 13.1,8.6 16.1,8.6 13.7,10.2 14.6,12.8 12,11.1 9.4,12.8 10.3,10.2 7.9,8.6 10.9,8.6"
            fill={focused ? '#fff' : 'none'}
            stroke={color}
            strokeWidth={strokeWidth - 0.6}
            strokeLinejoin="round"
        />


        {/* left ribbon */}
        <Path
            d="M8.2 13.8 L9.6 18.2 L11 13.8 Z"
            fill={focused ? color : 'none'}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
        />


        {/* right ribbon */}
        <Path
            d="M15.8 13.8 L14.4 18.2 L13 13.8 Z"
            fill={focused ? color : 'none'}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
        />
    </Svg>
)