import React from 'react';
import { TouchableOpacityProps, Text } from 'react-native'
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
//Styles
import { StyledButton, StyledButtonText } from './Button.styles';

export interface ButtonProps extends TouchableOpacityProps {
    type?: ButtonTypes;
    color?: string;
    width?: number | string;
    height?: number | string;
    margin?: number | string;
    onPress: (event?: NativeSyntheticEvent<NativeTouchEvent>) => void;
    fontSize?: number | string;
    borderRadius?: number | string;
    backgroundColor?: string;
    accessibilityLabel?: string;
}


const Button: React.FC<ButtonProps> = ({ 
    type = ButtonTypes.PRIMARY,
    color,
    width,
    height,
    onPress,
    children,
    fontSize,
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
        borderRadius = { borderRadius }
        backgroundColor = { backgroundColor }
        accessibilityLabel = { accessibilityLabel }
        { ...extraProps }
    >
        <StyledButtonText fontSize = { fontSize }>{ children }</StyledButtonText>
    </StyledButton>
);

export default Button;

//Helpers
export enum ButtonTypes {
    DANGER = 'danger',
    PRIMARY = 'primary',
    SUCCESS = 'success',
    WARNING = 'warning',
    INFORMATION = 'information'
}