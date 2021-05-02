import React, { useEffect } from 'react';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
import WidgetDataRenderer from './WidgetDataRenderer/WidgetDataRenderer';
//Domain
import { IoTDevicePrimitives } from '../../../IoTDevice/domain/IoTDevice';
//Hooks
import useDeviceData from '../../../Shared/store/hooks/deviceData/useDeviceData';


interface DeviceDataRendererProps {
    devices: IoTDevicePrimitives[];
}

const DeviceDataRenderer: React.FC<DeviceDataRendererProps> = ({
    devices
}) => {
    /**
     * Hooks
     */
    //Device data
    const { getLastDeviceData } = useDeviceData();
    const [fetching, setFetching] = React.useState(false)

    //Effects
    useEffect(() => {
        setFetching(true)
        //We retrieve the last data for each device
        devices.forEach(device => {
            getLastDeviceData(device._id)
                .then(() => setFetching(false))
                .catch(() => setFetching(false));
        });
    }, [devices]);

    if(fetching)
        return <Label>Loading...</Label>

    //Render
    return (
        <>
            {
                devices.map(device => (
                    <WidgetDataRenderer 
                        key = { device._id }
                        device = { device }
                    />
                ))
            }
        </>
    );
}

export default DeviceDataRenderer;