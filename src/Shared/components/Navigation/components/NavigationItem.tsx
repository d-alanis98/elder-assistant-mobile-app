import React from 'react';
import { TouchableOpacity } from 'react-native';
//Icons
import { NavigationItemContainer, NavigationItemIcon, NavigationItemLabel } from './NavigationItem.styles';

interface Props {
    icon: string,
    active: boolean,
    section: string;
    onPress?: (section: string) => void;
    iconSize?: number | string;
    iconColor?: string;
    sectionLabel?: string;
    showSectionLabel?: boolean;
};

const NavigationItem: React.FC<Props> = ({
    icon,
    active,
    section,
    onPress,
    iconSize,
    iconColor,
    sectionLabel,
    showSectionLabel
}) => (
    <TouchableOpacity
        onPress = { () => onPress?.(section) }
    >
        <NavigationItemContainer>
            <NavigationItemIcon 
                name = { icon }
                size = { iconSize }
                color = { iconColor }
                solid
                active = { active }
            />
            {
                showSectionLabel && (
                    <NavigationItemLabel
                        active = { active }
                        iconColor = { iconColor }
                    >
                        { sectionLabel }
                    </NavigationItemLabel>
                )
            }
        </NavigationItemContainer>
    </TouchableOpacity>
);


export default NavigationItem;