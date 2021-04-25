import { compose, createStore, applyMiddleware, combineReducers, AnyAction } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
//Reducers
import themeReducer from './reducers/themeDuck';

const rootReducer = combineReducers({
    theme: themeReducer,
})

const generateStore = () => {
    const store = createStore(
        rootReducer,
        compose(applyMiddleware(thunk))
    );

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