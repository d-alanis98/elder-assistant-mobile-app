import React, { useEffect } from 'react';
//Components
import EmptyData from '../../../Shared/components/Miscelaneous/EmptyData/EmptyData';
import LoadingText from '../../../Shared/components/Loaders/LoadingText';
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
        if(!devices || devices.length === 0)
            return;
        setFetching(true)
        //We retrieve the last data for each device
        devices.forEach(device => {
            getLastDeviceData(device._id)
                .then(() => setFetching(false))
                .catch(() => setFetching(false));
        });
    }, [devices]);

    if(devices.length === 0)
        return <EmptyData />


    if(fetching)
        return <LoadingText />

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