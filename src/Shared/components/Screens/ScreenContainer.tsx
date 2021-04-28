import React from 'react';
import { ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//Styles
import containerStyles from '../../../../App.styles';


interface Props {
    style?: ViewStyle;
    containerStyle?: ViewStyle;
}

const ScreenContainer: React.FC<Props> = ({ 
    style = [],
    children,
    containerStyle
}) => (
    <ScrollView 
        style = { containerStyle }
        contentContainerStyle = {[
            containerStyles.scrollContainer,
            style
        ]}
    >
        { children }    
    </ScrollView>
);

export default ScreenContainer;