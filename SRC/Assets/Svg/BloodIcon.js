import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const BloodIcon = ({ size = 24, color = '#222', focused = false, strokeWidth = 1.6 }) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        accessible
        accessibilityRole="image"
        accessibilityLabel="Blood"
    >
        {/* Blood drop shape */}
        <Path
            d="M12 3C12 3 7 8.5 7 13C7 15.7614 9.23858 18 12 18C14.7614 18 17 15.7614 17 13C17 8.5 12 3 12 3Z"
            fill={focused ? color : 'none'}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
        />
        
        {/* Inner highlight/detail */}
        <Path
            d="M10.5 9C10.5 9 9 11 9 12.5C9 13.8807 10.1193 15 11.5 15"
            fill="none"
            stroke={focused ? '#fff' : color}
            strokeWidth={strokeWidth - 0.4}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={focused ? 0.6 : 1}
        />
    </Svg>
)
