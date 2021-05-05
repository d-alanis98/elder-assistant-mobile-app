import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
//Components
import Label from '../Layout/Labels/Label';

//Constants
const DEFAULT_LOADING_TEXT = 'Cargando...';

//Props
interface LoadingTextProps {
    text?: string;
    style?: StyleProp<TextStyle>;
}

const LoadingText: React.FC<LoadingTextProps> = ({
    text,
    style
}) => (
    <Label
        style = { style || defaultStyle.label }
    >
        { text || DEFAULT_LOADING_TEXT }
    </Label>
);

export default LoadingText;

//Styles
const defaultStyle = StyleSheet.create({
    label: {
        opacity: 0.75,
        alignSelf: 'center',
    }
});