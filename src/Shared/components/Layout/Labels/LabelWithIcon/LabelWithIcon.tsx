import React from 'react';
import Label from '../Label';
//Styled components
import { LabelStyledIcon, LabelWithIconContainer } from './LabelWithIcon.styles';

interface LabelWithIconProps {
    icon: string;
    text?: string | React.ReactElement;
    color?: string;
    fontSize?: number;
}


const LabelWithIcon: React.FC<LabelWithIconProps> = ({
    text,
    icon,
    color,
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
            fontSize = { fontSize }
        >
            { text || children }    
        </Label>
    </LabelWithIconContainer>
);

export default LabelWithIcon;