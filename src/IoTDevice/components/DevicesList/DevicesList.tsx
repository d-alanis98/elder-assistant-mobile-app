import React from 'react';
import { useFocusEffect } from '@react-navigation/core';
//Styled components
import { DeviceName, DeviceSettings, DevicesListContainer, DevicesListItem, LinkDeviceButton } from './DevicesList.styles';
//Hooks
import useDevices from '../../../Shared/store/hooks/devices/useDevices';
import { StyleSheet, Text, View } from 'react-native';
import DeviceIcon from '../DeviceIcon/DeviceIcon';
import ButtonWithIcon from '../../../Shared/components/Layout/Buttons/ButtonWithIcon/ButtonWithIcon';
import Label from '../../../Shared/components/Layout/Labels/Label';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { screenHeight } from '../../../../App.styles';




const DevicesList: React.FC = () => {

    /**
     * Hooks
     */
    //Devices
    const { devices, fetching, getDevices } = useDevices();

    const [show, setShow] = React.useState(false);

    //Focus effect
    useFocusEffect(() => {
        getDevices();
    });

    if(fetching)
        return <Text>Cargando</Text>

    return (
        <DevicesListContainer>
            {
                devices.map(({ _id, name, type }) => (
                    <DevicesListItem
                        key = { _id }
                    >
                        <DeviceIcon 
                            deviceType = { type }
                        />
                        <DeviceName>{ name }</DeviceName>
                        <DeviceSettings />
                    </DevicesListItem>
                ))
            }
        </DevicesListContainer>
    );
}

export default DevicesList;