import React from 'react';
//Components
import Avatar from '../../../../User/components/Layout/Avatar/Avatar';
//Styled components
import { HeaderActionsContainer } from './HeaderActions.styles';

const HeaderActions: React.FC = () => (
    <HeaderActionsContainer>
        <Avatar 
            size = { 50 }
            marginLeft = { 7 }
        />
    </HeaderActionsContainer>
);

export default HeaderActions;


