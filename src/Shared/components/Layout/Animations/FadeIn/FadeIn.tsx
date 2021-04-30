import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';


export interface FadeInProps {
    duration?: number;
}


const FadeIn: React.FC<FadeInProps> = ({ 
    children, 
    duration
}) => {
    /**
     * Hooks
     */
    //Refs
    //Initial value for opacity: 0
    const opacity = useRef(new Animated.Value(0)).current;
    //Default animation duration
    const defaultDuration = useRef(1000).current; 

    //Effects
    //Animation starts on mount
    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: duration || defaultDuration,
            useNativeDriver: false
        }).start();
    }, []);

    return (
            <Animated.View
                style={{
                    opacity,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                { children }
            </Animated.View>
    );
}

export default FadeIn;