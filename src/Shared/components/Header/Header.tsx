
import React from 'react';
//Styled components
import { HeaderContainer, HeaderLogo, HeaderTitle } from './Header.styles';

const Header: React.FC = () => (
    <HeaderContainer>
            <HeaderLogo 
                source = { require('../../../../assets/icon.png') }
            />
            <HeaderTitle>Elder</HeaderTitle>
    </HeaderContainer>
);

export default Header;