import React from 'react';
import { Text } from 'react-native';
//Components
import DeviceIcon from '../DeviceIcon/DeviceIcon';
//Styled components
import { DeviceName, DeviceRefreshButton, DevicesListContainer, DevicesListItem } from './DevicesList.styles';
//Hooks
import useDevices from '../../../Shared/store/hooks/devices/useDevices';


interface DevicesListProps {
    showRefreshButton?: boolean;
}

const DevicesList: React.FC<DevicesListProps> = ({
    showRefreshButton = true,
}) => {

    /**
     * Hooks
     */
    //Devices
    const { devices, fetching, getDevices } = useDevices();

    if(fetching)
        return <Text>Cargando</Text>

    return (
        <DevicesListContainer>
            <RefreshButton 
                getDevices = { getDevices }
                showRefreshButton = { showRefreshButton }
            />
            {
                devices.map(({ _id, name, type }) => (
                    <DevicesListItem
                        key = { _id }
                    >
                        <DeviceIcon 
                            deviceType = { type }
                        />
                        <DeviceName>{ name }</DeviceName>
                    </DevicesListItem>
                ))
            }
        </DevicesListContainer>
    );
}

export default DevicesList;


//Internal components

interface RefreshButtonProps {
    getDevices: () => void;
    showRefreshButton: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
    getDevices,
    showRefreshButton
}) => showRefreshButton 
    ? (
        <DeviceRefreshButton 
            onPress = { () => getDevices() }
        />
    )
    : null;