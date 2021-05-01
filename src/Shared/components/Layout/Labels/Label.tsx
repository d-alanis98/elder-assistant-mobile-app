import React from 'react';
import { TextProps } from 'react-native';
import { StyledLabel } from './Label.styles';


export interface LabelProps extends TextProps {
    color?: string;
    margin?: string | number;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
}


const Label: React.FC<LabelProps> = ({ 
    color,
    style,
    margin,
    fontSize,
    children,
    fontFamily,
    fontWeight
}) => (
    <StyledLabel
        color = { color }
        style = { style }
        margin = { margin }
        fontSize = { fontSize }
        fontFamily = { fontFamily }
        fontWeight = { fontWeight }
    >
        { children }
    </StyledLabel>
);

export default Label;