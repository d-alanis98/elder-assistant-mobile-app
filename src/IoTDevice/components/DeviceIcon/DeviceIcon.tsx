import React from 'react';
//Domain
import { IoTDeviceTypes } from '../../domain/value-objects/IoTDeviceTypes';
//Styled components
import { DeviceIconContainer, DeviceStyledIcon } from './DeviceIcon.styles';


interface DeviceIconProps {
    deviceType: string,
}

const DeviceIcon: React.FC<DeviceIconProps> = ({
    deviceType
}) => (
    <DeviceIconContainer>
        <DeviceStyledIcon
            name = { getDeviceIconByType(deviceType) } 
        />
    </DeviceIconContainer>
);

export default DeviceIcon;


//Helpers
const getDeviceIconByType = (deviceType: string) => {
    switch(deviceType) {
        case IoTDeviceTypes.PILLBOX:
            return 'pills';
        case IoTDeviceTypes.WEARABLE:
            return 'microchip';
        default:
            return 'microchip';
    } 
}