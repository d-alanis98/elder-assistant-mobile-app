import { compose, createStore, applyMiddleware, combineReducers, AnyAction } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
//Reducers
import userReducer, { restoreSessionAction } from './reducers/userDuck';
import themeReducer from './reducers/themeDuck';

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
});

const generateStore = () => {
    const store = createStore(
        rootReducer,
        compose(applyMiddleware(thunk))
    );

    restoreSessionAction()(store.dispatch, store.getState, undefined);
    return store;
}


const store = generateStore();

export default store;


//Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
//We set the type of the dispatch function to explicitly use ThunkDispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
//Type for ThunkAction
export type ThunkAppAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;