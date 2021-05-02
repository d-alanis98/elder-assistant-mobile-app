import React, { useCallback, useContext } from 'react';
//Components
import IsLoggedIn from '../../Authentication/IsLoggedIn';
import NavigationItem from './NavigationItem';
import PrimaryUserProtected from '../../Screens/PrimaryUserProtected';
//Styled components
import { NavigationContainer } from './Navigation.styles';
//Context
import CurrentScreenContext from '../../Screens/context/CurrentScreenContext';


interface NavigationProps {
    navigation: any;
}

const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
    /**
     * Hooks
     */
    const { currentScreen } = useContext(CurrentScreenContext);

    /**
     * Method to navigate to the selected section.
     * @param section Section (screen) name.
     */
    const handleNavigation = (section: string) => {
        navigation.navigate(section);
    }
    /**
     * Method to determine if the tab is active.
     * @param {string} screenName The screen to which the tab indicator redirects.
     */
    const isActive = useCallback((screenName: string) => (
        screenName === currentScreen
    ), [currentScreen]);

    return (
        <IsLoggedIn>
            <NavigationContainer>
                <NavigationItem 
                    icon = 'home' 
                    active = { isActive('Home') }
                    section = 'Home'
                    onPress = { handleNavigation }
                    sectionLabel = 'Inicio'
                    showSectionLabel
                />
                <PrimaryUserProtected>
                    <NavigationItem 
                        icon = 'microchip'
                        active = { isActive('Devices') }
                        section = 'Devices'
                        onPress = { handleNavigation }
                        sectionLabel = 'Dispositivos'
                        showSectionLabel
                    />
                </PrimaryUserProtected>
                <NavigationItem 
                    icon = 'comments'
                    active = { isActive('Chat') }
                    section = 'Chat'
                    onPress = { handleNavigation }
                    sectionLabel = 'Chat'
                    showSectionLabel
                />
                <NavigationItem 
                    icon = 'cog' 
                    active = { isActive('Settings') }
                    section = 'Settings'
                    onPress = { handleNavigation }
                    sectionLabel = 'Ajustes'
                    showSectionLabel
                />
            </NavigationContainer>
        </IsLoggedIn>
    )
}
        

export default Navigation;