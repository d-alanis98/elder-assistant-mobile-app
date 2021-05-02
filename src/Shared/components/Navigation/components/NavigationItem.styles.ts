import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';

export const NavigationItemContainer = styled.View`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5px;
`;


interface NavigationIconProps {
    active: boolean;
    iconSize?: number;
    iconColor?: string;
}
export const NavigationItemIcon = styled(FontAwesome5)<NavigationIconProps>`${({ 
    theme,
    active,
    iconSize = 20,
    iconColor = '#aaaaaa'
}) => `
    color: ${ active ? theme.primaryColor : iconColor };
    fontSize: ${ iconSize }px;
`}`;

export const NavigationItemLabel = styled.Text<NavigationIconProps>`${({ 
    theme,
    active,
    iconColor = '#aaaaaa'
}) => `
    color: ${ active ? theme.primaryColor : iconColor };
    margin-top: 5px;
`}`