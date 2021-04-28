import React from 'react';
//Components
import IsLoggedIn from '../../Authentication/IsLoggedIn';
import NavigationItem from './NavigationItem';
import PrimaryUserProtected from '../../Screens/PrimaryUserProtected';
//Styles
import { NavigationContainer } from './Navigation.styles';

interface Props {
    navigation: any;
}

const Navigation: React.FC<Props> = ({ navigation }) => {

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
                    sectionLabel = 'Home'
                    showSectionLabel
                />
                <PrimaryUserProtected>
                    <NavigationItem 
                        icon = 'microchip'
                        section = 'Devices'
                        onPress = { handleNavigation }
                        sectionLabel = 'Devices'
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
                    sectionLabel = 'Settings'
                    showSectionLabel
                />
                { /*
                <NavigationItem 
                    icon = 'bell' 
                    section = 'Notifications'
                    onPress = { handleNavigation }
                    sectionLabel = 'Notifications'
                    showSectionLabel
                />
                */ }
            </NavigationContainer>
        </IsLoggedIn>
    )
}
        

export default Navigation;