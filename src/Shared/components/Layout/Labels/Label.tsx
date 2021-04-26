import React from 'react';
import { StyledLabel } from './Label.styles';


export interface LabelProps {
    color?: string;
    style?: React.CSSProperties;
    margin?: string | number;
    fontSize?: number | string;
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