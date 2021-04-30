import React from 'react';
import Label from '../../../Shared/components/Layout/Labels/Label';
import LabelWithIcon from '../../../Shared/components/Layout/Labels/LabelWithIcon/LabelWithIcon';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';
//Styled components
import { SettingsScreenContainer } from './SettingsScreen.styles';
import ThemeSettings from './ThemeSettings/ThemeSettings';


const SettingsScreen: React.FC = () => (
    <ScreenContainer
        title = 'Ajustes'
    >
        <SettingsScreenContainer>
            <ThemeSettings />
        </SettingsScreenContainer>
    </ScreenContainer>
);

export default SettingsScreen;