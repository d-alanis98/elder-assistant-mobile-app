import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';


export interface FadeInProps {
    duration?: number;
}

const FadeIn: React.FC<FadeInProps> = ({ 
    children, 
    duration
}) => {
    //Constants
    const DEFAULT_ANIMATION_DURATION = 500;
    /**
     * Hooks
     */
    //Refs
    //Initial value for opacity: 0
    const opacity = useRef(new Animated.Value(0)).current;

    //Effects
    //Animation starts on focus
    useFocusEffect(() => {
        opacity.setValue(0);
        Animated.timing(opacity, {
            toValue: 1,
            duration: duration || DEFAULT_ANIMATION_DURATION,
            useNativeDriver: false
        }).start();
        return () => opacity.setValue(0)
    });

    return (
            <Animated.View
                style = {{ opacity }}
            >
                { children }
            </Animated.View>
    );
}

export default FadeIn;