import React from 'react';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';
import ChatsList from '../ChatsList/ChatsList';

const ChatScreen: React.FC = () => {

    return (
        <ScreenContainer
            title = 'Chat'
        >
            <ChatsList />
        </ScreenContainer>
    );
}

export default ChatScreen;
