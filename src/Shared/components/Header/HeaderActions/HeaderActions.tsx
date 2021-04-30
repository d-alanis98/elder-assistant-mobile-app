import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
//Components
import Avatar from '../../../../User/components/Layout/Avatar/Avatar';
import TouchableIcon from '../../Layout/Icons/TouchableIcon/TouchableIcon';
//Styled components
import { HeaderActionsContainer } from './HeaderActions.styles';

const HeaderActions: React.FC = () => {
    const navigation = useNavigation();

    const redirectToScreen = useCallback((screen: string) => () => {
        navigation.navigate(screen);
    }, [navigation]);

    return (
        <HeaderActionsContainer>
            <TouchableIcon 
                icon = 'bell'
                size = { 25 }
                onPress = { redirectToScreen('Notifications') }
                badgeText = '1'
            />
            <Avatar 
                size = { 50 }
                marginLeft = { 7 }
            />
        </HeaderActionsContainer>
    );
}

export default HeaderActions;


