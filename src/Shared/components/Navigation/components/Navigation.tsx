import React from 'react';
//Components
import IsLoggedIn from '../../Authentication/IsLoggedIn';
import NavigationItem from './NavigationItem';
import PrimaryUserProtected from '../../Screens/PrimaryUserProtected';
//Styled components
import { NavigationContainer } from './Navigation.styles';


interface NavigationProps {
    navigation: any;
}

const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
    
    /**
     * Method to navigate to the selected section.
     * @param section Section (screen) name.
     */
    const handleNavigation = (section: string) => {
        navigation.navigate(section);
    }

    return (
        <IsLoggedIn>
            <NavigationContainer>
                <NavigationItem 
                    icon = 'home' 
                    section = 'Home'
                    onPress = { handleNavigation }
                    sectionLabel = 'Inicio'
                    showSectionLabel
                />
                <PrimaryUserProtected>
                    <NavigationItem 
                        icon = 'microchip'
                        section = 'Devices'
                        onPress = { handleNavigation }
                        sectionLabel = 'Dispositivos'
                        showSectionLabel
                    />
                </PrimaryUserProtected>
                <NavigationItem 
                    icon = 'comments'
                    section = 'Chat'
                    onPress = { handleNavigation }
                    sectionLabel = 'Chat'
                    showSectionLabel
                />
                <NavigationItem 
                    icon = 'cog' 
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