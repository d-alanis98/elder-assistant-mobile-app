import styled from 'styled-components/native';
//Props
import { TouchableIconProps } from './TouchableIcon';
//Icons
import { FontAwesome5 } from '@expo/vector-icons'; 

export const TouchableIconContainer = styled.TouchableOpacity<TouchableIconProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    padding: 3px;
    margin-right: 5px;
`

export const StyledTouchableIcon = styled(FontAwesome5)`${({ theme }) => `
    color: ${ theme.secondaryFontColor };
`}`

export const TouchableIconBadgeContainer = styled.View<TouchableIconProps>`${({ theme, badgeText }) => `
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    top: -3px;
    right: ${ getRightPositionBasedOnBadgeText(badgeText) }px;
    background-color: ${ theme.alertColor };
    width: auto;
    min-width: ${ getBadgeContainerWidth(badgeText) }px;
    height: 20px;
    padding: 2px;
    border-radius: 10px;
`}`;

export const TouchableIconBadgeText = styled.Text`
    color: #fff;
    font-size: 12px;
`;

const getBadgeContainerWidth = (badgeText?: string | number) => {
    if(!badgeText || typeof badgeText !== 'string')
        return 20;
    const badgeTextLength = badgeText.length;
    return badgeTextLength >= 3 ? badgeTextLength * 10 : 20;
}

const getRightPositionBasedOnBadgeText = (badgeText?: string | number) => {
    if(!badgeText || typeof badgeText !== 'string')
        return -5;
    const badgeTextLength = badgeText.length;
    return badgeTextLength >= 3 ? (badgeText.length - 1) * -5 : -5;
}