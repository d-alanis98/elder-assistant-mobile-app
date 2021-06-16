import React from 'react';
import ButtonWithIcon from '../../../Shared/components/Layout/Buttons/ButtonWithIcon/ButtonWithIcon';
import LabelWithIcon from '../../../Shared/components/Layout/Labels/LabelWithIcon/LabelWithIcon';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';
import { useAppDispatch } from '../../../Shared/store/hooks';
import { logoutAction } from '../../../Shared/store/reducers/userDuck';
//Styled components
import { SettingsScreenContainer } from './SettingsScreen.styles';
import ThemeSettings from './ThemeSettings/ThemeSettings';


const SettingsScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const logout = React.useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);
    return (
        <ScreenContainer
            title = 'Ajustes'
        >
            <SettingsScreenContainer>
                <ThemeSettings />
                <LabelWithIcon 
                    icon = 'user'
                >
                    Sesión
                </LabelWithIcon>
                <ButtonWithIcon 
                    icon = 'sign-out-alt'
                    type = 'warning'
                    onPress = { logout }
                    buttonText = 'Cerrar sesion'
                />
            </SettingsScreenContainer>
        </ScreenContainer>
    );
}

export default SettingsScreen;