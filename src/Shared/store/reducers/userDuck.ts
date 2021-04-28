import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyAction } from 'redux';
//Domain
import { UserData, ValidUserTypes } from '../../../User/domain/User';
//Domain exceptions
import SessionNotFound from '../../../UserAuthentication/domain/exceptions/SessionNotFound';
//Infrastructure
import { login } from '../../../UserAuthentication/infrastructure/userAuthenticationApi';
//Thunk action base type
import { ThunkAppAction } from '../store';

/**
 * Constants
 */

//Action types
const LOGIN         = 'LOGIN';
const LOGOUT        = 'LOGOUT';
const LOGIN_ERROR   = 'LOGIN_ERROR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
//Other constants
const USER_KEY          = 'USER';
const TOKEN_KEY         = 'TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
//Initial state
interface UserState extends UserData {
    name: string;
    type: ValidUserTypes;
    error?: string;
    token: string;
    loading: boolean;
    loggedIn: boolean;
    lastName: string;
    dateOfBirth: string;
};

const initialState: UserState = {
    name: '',
    type: ValidUserTypes.SECONDARY,
    token: '',
    loading: false,
    loggedIn: false,
    lastName: '',
    dateOfBirth: ''
};

/**
 * Reducer
 */

const reducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action;

    switch(type) {
        case LOGIN:
            return {
                ...state,
                loading: true,
            };
        case LOGOUT:
            return initialState;
        case LOGIN_SUCCESS:
            const userData: UserData = payload;
            return {
                ...state,
                ...userData,
                loading: false,
                loggedIn: true,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        default:
            return state;
    }
}

export default reducer;

/**
 * Actions
 */

/**
 * Action to make the HTTP request to the login endpoint and handle the response, either dispatching the LOGIN_SUCCESS action
 * or the LOGIN_ERROR. It also saves the session data in the local storage.
 * @param {FormData|Object} data The credentials object or form data.
 * @returns 
 */
export let loginAction = (data: FormData | Object): ThunkAppAction<Promise<void>> => async dispatch => {
    try {
        const { user, token, refreshToken } = await login(data);
        //We save the tokens in the storage
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_KEY, token);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        //We dispatch the login success action
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                ...user,
                token
            }
        });
        
    } catch(error) {
        console.log(error)
        dispatch({
            type: LOGIN_ERROR,
            payload: error.message,
        });
    }
}

/**
 * Action to handle the session restoring, firstly looking for the session data in the storage and dispatching the 
 * LOGIN_SUCCESS action if it succeeds, otherwise it dispatchs the LOGIN_ERROR action with a custom exception SessionNotFound.
 * @returns 
 */
export let restoreSessionAction = (): ThunkAppAction => async dispatch => {
    try {
        //We get the data from the local storage
        const user = await AsyncStorage.getItem(USER_KEY);
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        //We validate the data existance
        if(!user || !token)
            throw new SessionNotFound();
        //We parse the user data
        const parsedUser = JSON.parse(user);
        //We dispatch the success action
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                ...parsedUser,
                token,
            }
        });
    } catch(error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.message,
        })
    };
}