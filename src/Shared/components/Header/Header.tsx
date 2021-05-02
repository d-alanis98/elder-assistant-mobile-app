
import React from 'react';
//Components
import HeaderActions from './HeaderActions/HeaderActions';
//Styled components
import { HeaderContainer, HeaderLogo, HeaderTitle } from './Header.styles';
import { HeaderBackButton } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core';

const Header: React.FC = () => (
    <HeaderContainer>
            <GoBackButton />
            <HeaderLogo 
                source = { require('../../../../assets/icon.png') }
            />
            <HeaderTitle>Elder</HeaderTitle>
            <HeaderActions />
    </HeaderContainer>
);

export default Header;

//Internal components
const GoBackButton = () => {
    /**
     * Hooks
     */
    //Navigation
    const navigation = useNavigation();
    //Refs
    const canGoBack = React.useRef(navigation.canGoBack());
    //Effects
    React.useEffect(() => {
        canGoBack.current = navigation.canGoBack();
    }, [navigation]);
    //Render
    if(canGoBack.current)
        return <HeaderBackButton 
            tintColor = '#aaaaaa'
            style = {{ marginLeft: -5 }}
            onPress = { () => navigation.canGoBack() && navigation.goBack() }
        />;
    return null;
}