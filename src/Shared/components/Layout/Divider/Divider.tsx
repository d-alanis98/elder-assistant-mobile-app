import React from 'react';
import { View, StyleSheet } from 'react-native';
//Hooks
import { useAppSelector } from '../../../store/hooks';

interface DividerProps {
    color?: string;
    opacity?: number;
}

const Divider: React.FC<DividerProps> = ({ 
    color, 
    opacity 
}) => {
    const { fontColor } = useAppSelector(state => state.theme);

    return (
        <View 
            style = {{
                height: 2,
                marginTop: 7,
                marginBottom: 7,
                opacity: opacity || 0.45,
                borderBottomColor: color || fontColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
            }}
        />
    )
}

export default Divider;