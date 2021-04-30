import React from 'react';
import { TouchableNativeFeedbackProps } from 'react-native';
//Styled components
import { TouchableIconContainer, StyledTouchableIcon, TouchableIconBadgeContainer, TouchableIconBadgeText } from './TouchableIcon.styles';


export interface TouchableIconProps extends TouchableNativeFeedbackProps {
    icon?: string;
    size?: number;
    width?: number;
    height?: number;
    badgeText?: string | number;
}

const TouchableIcon: React.FC<TouchableIconProps> = ({
    icon,
    size = 20,
    width,
    height,
    badgeText,
    ...restProps
}) => (
    <TouchableIconContainer
        size = { size }
        width = { width }
        height = { height }
        { ...restProps }
    >
        <StyledTouchableIcon 
            name = { icon }
            size = { size }
        />
        {
            badgeText && (
                <TouchableIconBadgeContainer badgeText = { badgeText }>
                    <TouchableIconBadgeText>{ badgeText }</TouchableIconBadgeText>
                </TouchableIconBadgeContainer>
            )
        }
    </TouchableIconContainer>
);

export default TouchableIcon;