import { DefaultTheme } from 'styled-components/native';
import { defaultThemeParameters, ThemeParameters, ValidThemes } from './ThemeParameters';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeParameters {
  }
}

export const lightTheme: DefaultTheme = defaultThemeParameters;

export const darkTheme: DefaultTheme = {
    fontColor: '#ffffff',
    backgroundColor: '#333',
    alertColor: '#d9534f',
    successColor: '#5cb85c',
    primaryColor: '#0275d8',
    warningColor: '#f0ad4e',
    secondaryColor: '#aaaaaa',
    informationColor: '#5bc0de'
}

export const themeToApply = (theme: ValidThemes): ThemeParameters => {
    switch(theme) {
        case ValidThemes.LIGHT_THEME:
            return lightTheme;
        case ValidThemes.DARK_THEME:
            return darkTheme;
        default:
            return lightTheme;
    }
}