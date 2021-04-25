import React from 'react';
//Components
import NavigationItem from './NavigationItem';
//Styles
import { NavigationContainer } from './Navigation.styles';


const Navigation: React.FunctionComponent = () => (
    <NavigationContainer>
        <NavigationItem 
            icon = 'microchip'
            sectionLabel = 'Devices'
            showSectionLabel
        />
        <NavigationItem 
            icon = 'user' 
            sectionLabel = 'Users'
            showSectionLabel
        />
        <NavigationItem 
            icon = 'cog' 
            sectionLabel = 'Settings'
            showSectionLabel
        />
        <NavigationItem 
            icon = 'comments'
            sectionLabel = 'Chat'
            showSectionLabel
        />
        <NavigationItem 
            icon = 'bell' 
            sectionLabel = 'Notifications'
            showSectionLabel
        />
    </NavigationContainer>
)
        

export default Navigation;