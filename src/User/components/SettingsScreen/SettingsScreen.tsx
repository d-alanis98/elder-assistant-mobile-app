import React from 'react';
import { Text, View } from 'react-native';


const SettingsScreen: React.FC = () => (
    <View
        style = {{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <Text>Settings</Text>
    </View>
);

export default SettingsScreen;