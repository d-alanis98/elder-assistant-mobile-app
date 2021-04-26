import { AnyAction } from 'redux'
//Properties
import { themeToApply } from '../../components/Theme/constants/theme';
import { ValidThemes, ThemeParameters, defaultThemeParameters } from '../../components/Theme/constants/ThemeParameters';
//Base action type
import { ThunkAppAction } from '../store';

/**
 * Constants
 */

//Action types
const SET_THEME = 'SET_THEME';
//Initial state contract
interface ThemeState {
    type: ValidThemes;
    theme: ThemeParameters;
}
//Initial state
const initialState: ThemeState = {
    type:  ValidThemes.LIGHT_THEME,
    theme: defaultThemeParameters
}

/**
 * Reducer
 */
const reducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action;
    switch(type) {
        case SET_THEME:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}

export default reducer;

/**
 * Actions
 */
/**
 * Action to toggle the current theme.
 * @returns New state
 */
export let toggleThemeAction = (): ThunkAppAction => (dispatch, getState) => {
    const { theme: { type } } = getState();
    //We toggle the theme type
    const themeType = type === ValidThemes.LIGHT_THEME 
    ? ValidThemes.DARK_THEME 
    : ValidThemes.LIGHT_THEME;
    //We get the theme data
    const updatedTheme = themeToApply(themeType);
    dispatch({
        type: SET_THEME,
        payload: {
            type: themeType,
            theme: updatedTheme,
        }
    });
}