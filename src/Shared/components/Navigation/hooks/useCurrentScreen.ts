import { useNavigationState } from '@react-navigation/core';
import { useState, useEffect } from 'react';

const useCurrentScreen = () => {
    /**
     * Hooks
     */
    //State
    const [currentScreen, setCurrentScreen] = useState<string>();
    //Navigation state
    const { index: activeScreenIndex, routes: screens } = useNavigationState(state => state);
    //Effects
    useEffect(() => {
        const currentScreen = screens[activeScreenIndex]?.name;
        setCurrentScreen(currentScreen);
    }, [
        screens,
        activeScreenIndex
    ]);

    return currentScreen;
}

export default useCurrentScreen;