import React, { useCallback } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Label from '../../../../Shared/components/Layout/Labels/Label';
import LabelWithIcon from '../../../../Shared/components/Layout/Labels/LabelWithIcon/LabelWithIcon';
import { ValidThemes } from '../../../../Shared/components/Theme/constants/ThemeParameters';
import { useAppDispatch, useAppSelector } from '../../../../Shared/store/hooks';
import { toggleThemeAction } from '../../../../Shared/store/reducers/themeDuck';

const ThemeSettings: React.FC = () => {
    const { type: currentTheme } = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();
    /**
     * Function to get the current theme icon.
     */
    const getCurrentThemeIcon = useCallback(() => {
        if(currentTheme === ValidThemes.DARK_THEME)
            return 'moon';
        return 'sun';
    }, [currentTheme]);

    return (
        <>
            <LabelWithIcon
                icon = { getCurrentThemeIcon() }
            >
                Tema
            </LabelWithIcon>
            <View
                style = {{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}
            >
                <TouchableOpacity onPress = {() => dispatch(toggleThemeAction()) }>
                    <Label fontSize={17}>Cambiar</Label>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default ThemeSettings;


