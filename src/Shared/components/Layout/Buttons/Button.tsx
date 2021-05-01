import React from 'react';
import { TouchableOpacityProps } from 'react-native'
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
//Styles
import { StyledButton, StyledButtonText } from './Button.styles';



export interface ButtonProps extends TouchableOpacityProps {
    type?: 'danger' | 'primary' | 'success' | 'warning';
    color?: string;
    width?: number | string;
    height?: number | string;
    margin?: number | string;
    onPress: (event?: NativeSyntheticEvent<NativeTouchEvent>) => void;
    fontSize?: number | string;
    marginTop?: number;
    marginBottom?: number;
    borderRadius?: number | string;
    backgroundColor?: string;
    accessibilityLabel?: string;
}


const Button: React.FC<ButtonProps> = ({ 
    type = 'primary',
    color,
    width,
    height,
    onPress,
    children,
    fontSize,
    marginTop,
    marginBottom,
    borderRadius,
    backgroundColor,
    accessibilityLabel,
    ...extraProps
}) => (
    <StyledButton
        type = { type }
        color = { color }
        width = { width }
        height = { height }
        onPress = { onPress }
        marginTop = { marginTop }
        marginBottom = { marginBottom }
        borderRadius = { borderRadius }
        backgroundColor = { backgroundColor }
        accessibilityLabel = { accessibilityLabel }
        { ...extraProps }
    >
        <StyledButtonText fontSize = { fontSize }>{ children }</StyledButtonText>
    </StyledButton>
);

export default Button;