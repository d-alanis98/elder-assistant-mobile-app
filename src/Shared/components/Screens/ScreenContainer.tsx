import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//Styles
import containerStyles from '../../../../App.styles';


interface Props {
    style?: ViewStyle;
}

const ScreenContainer: React.FC<Props> = ({ 
    style = [],
    children,
}) => (
    <ScrollView 
        contentContainerStyle = {[
            containerStyles.scrollContainer,
            style
        ]}
    >
        { children }    
    </ScrollView>
);

export default ScreenContainer;