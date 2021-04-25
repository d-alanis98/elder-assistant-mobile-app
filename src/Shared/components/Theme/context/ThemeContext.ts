import React from 'react';
import { defaultThemeParameters, ThemeContextParameters, ThemeParameters } from '../constants/ThemeParameters';

const ThemeContext: React.Context<ThemeContextParameters> = React.createContext({ 
    theme: defaultThemeParameters,
    setTheme: (theme: ThemeParameters) => { }
});

export default ThemeContext;