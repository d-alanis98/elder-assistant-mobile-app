import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
//Components
import Label from '../Label';
//Styled components
import { LabelStyledIcon, LabelWithIconContainer } from './LabelWithIcon.styles';

interface LabelWithIconProps {
    icon: string;
    text?: string | React.ReactElement;
    color?: string;
    style?: StyleProp<TextStyle>;
    fontSize?: number;
}


const LabelWithIcon: React.FC<LabelWithIconProps> = ({
    text,
    icon,
    color,
    style,
    children,
    fontSize,
}) => (
    <LabelWithIconContainer>
        <LabelStyledIcon 
            name = { icon }
            fontSize = { fontSize }
            color = { color }
        />
        <Label
            color = { color }
            style = { style }
            fontSize = { fontSize }
        >
            { text || children }    
        </Label>
    </LabelWithIconContainer>
);

export default LabelWithIcon;