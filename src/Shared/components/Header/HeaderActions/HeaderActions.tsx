import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
//Components
import Avatar from '../../../../User/components/Layout/Avatar/Avatar';
import useNotifications from '../../../store/hooks/notifications/useNotifications';
import TouchableIcon from '../../Layout/Icons/TouchableIcon/TouchableIcon';
import useUnseenNotifications from '../../Notifications/hooks/useUnseenNotifications';
//Styled components
import { HeaderActionsContainer } from './HeaderActions.styles';

const HeaderActions: React.FC = () => {
    const navigation = useNavigation();

    const redirectToScreen = useCallback((screen: string) => () => {
        if(screen === 'Notifications')
            markAllNotificationsAsSeen();
        navigation.navigate(screen);
    }, [navigation]);
    /**
     * Hooks
     */
    //Notifications
    const { markAllNotificationsAsSeen } = useNotifications();
    //Unseen notifications
    const unseenNotifications = useUnseenNotifications()

    return (
        <HeaderActionsContainer>
            <TouchableIcon 
                icon = 'bell'
                size = { 25 }
                onPress = { redirectToScreen('Notifications') }
                badgeText = { unseenNotifications }
            />
            <Avatar 
                size = { 50 }
                marginLeft = { 7 }
            />
        </HeaderActionsContainer>
    );
}

export default HeaderActions;


