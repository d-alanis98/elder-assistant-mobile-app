import React from 'react';
import { StyleProp, TextStyle, StyleSheet, View } from 'react-native';
//Components
import LabelWithIcon from '../../Layout/Labels/LabelWithIcon/LabelWithIcon';
//Dimensions
import { screenHeight } from '../../../../../App.styles';

interface EmptyDataProps {
    icon?: string;
    text?: string;
    style?: StyleProp<TextStyle>;
    opacity?: number;
    fontSize?: number;
}

const EmptyData: React.FC<EmptyDataProps> = ({
    icon,
    text,
    style,
    opacity,
    children,
    fontSize
}) => {
    //Constants
    const DEFAULT_TEXT      = 'Sin datos';
    const DEFAULT_ICON      = 'info-circle';
    const DEFAULT_OPACITY   = 0.75;
    const DEFAULT_FONT_SIZE = 16;

    //Render
    return (
        <View
            style = { style || defaultStyles(opacity || DEFAULT_OPACITY).container }
        >
            <LabelWithIcon 
                icon = { icon || DEFAULT_ICON }
                fontSize = { fontSize || DEFAULT_FONT_SIZE } 
            >
                { children || text || DEFAULT_TEXT }
            </LabelWithIcon>
        </View>
    );
}

export default EmptyData;

//Styles
const defaultStyles = (opacity: number) => StyleSheet.create({
    container: {
        opacity,
        alignSelf: 'center',
        marginTop: screenHeight / 3
    }
})