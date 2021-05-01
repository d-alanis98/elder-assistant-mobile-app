import React from 'react';
import { StatusBar as NativeStatusBar } from 'react-native';
//Theme
import { isDarkTheme } from '../Theme/constants/theme';
import { ThemeParameters } from '../Theme/constants/ThemeParameters';


interface StatusBarProps {
    theme: ThemeParameters;
}

const StatusBar: React.FC<StatusBarProps> = ({ theme }) => (
    <NativeStatusBar
        backgroundColor = { theme.secondaryColor }
        barStyle = { isDarkTheme(theme) ? 'light-content' : 'dark-content' }
    />
);

export default StatusBar;