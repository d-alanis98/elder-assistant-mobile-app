import React, { useState } from 'react';
import { defaultThemeParameters, ThemeContextParameters } from '../constants/ThemeParameters';
import ThemeContext from './ThemeContext';

const ThemeProvider: React.FC = ({ children }) => {
    const [themeState, setThemeState] = useState(defaultThemeParameters);

    const context: ThemeContextParameters = {
        theme: themeState,
        setTheme: setThemeState,
    }

    return (
        <ThemeContext.Provider
            value = { context }
        >
            { children }
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;