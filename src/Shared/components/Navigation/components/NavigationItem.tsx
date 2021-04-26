import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
//Icons
import { FontAwesome5 } from '@expo/vector-icons'; 

interface Props {
    icon: string,
    section: string;
    onPress?: (section: string) => void;
    iconSize?: number | string;
    iconColor?: string;
    sectionLabel?: string;
    showSectionLabel?: boolean;
};

const NavigationItem: React.FC<Props> = ({
    icon,
    section,
    onPress,
    iconSize = iconDefaults.size,
    iconColor = iconDefaults.color,
    sectionLabel,
    showSectionLabel
}) => (
    <TouchableWithoutFeedback
        onPress = { () => onPress?.(section) }
    >
        <View style = { styles.container }>
            <FontAwesome5 
                name = { icon }
                size = { iconSize }
                color = { iconColor }
            />
            {
                showSectionLabel && (
                    <Text style = { styles.sectionlabel }>{ sectionLabel }</Text>
                )
            }
        </View>
    </TouchableWithoutFeedback>
);


export default NavigationItem;


const iconDefaults = {
    size: '1rem',
    color: '#aaaaaa',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0.25rem',
    },
    sectionlabel: {
        color: '#aaaaaa',
        marginTop: '0.25rem',
    }
})