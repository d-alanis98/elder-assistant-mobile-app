import React, { useEffect, useState } from 'react';
//Components
import DeviceDataWidget from '../../DeviceDataWidget/DeviceDataWidget';
//Domain
import { IoTDevicePrimitives } from '../../../../IoTDevice/domain/IoTDevice';
//Hooks
import useDeviceData from '../../../../Shared/store/hooks/deviceData/useDeviceData';
//Types
import { LastEventData } from '../../../../Shared/store/reducers/deviceDataDuck';
import { getWidgetComponent } from '../../DeviceDataComponents/componentsDictionary';


interface WidgetDataRenderer {
    device: IoTDevicePrimitives;
}

const WidgetDataRenderer: React.FC<WidgetDataRenderer> = ({
    device
}) => {
    /**
     * Hooks
     */
    //Device data
    const { lastData } = useDeviceData();
    //State
    const [deviceLastData, setDeviceLastData] = useState<LastEventData>({});
    //Effects
    useEffect(() => {
        const deviceDataContent = lastData[device._id];
        //We validate the data dictionary
        if(!deviceDataContent)
            return;
        setDeviceLastData(deviceDataContent);
    }, [device, lastData]);

    /**
     * Todo, devolver la funcion getEventTypeWidget en el map, en lugar del DeviceDataWidget.
     * Dicha función buscará el componente a renderizar en el diccionario de componentes por eventKey ()
     */
    return (
        <>
            {
                Object.entries(deviceLastData)
                    .map(([eventKey, value]) => (
                    getWidgetComponent({
                        key: value._id,
                        event: value,
                        device,
                        eventKey,
                        eventData: value.value,
                        deviceType: device.type,
                    })
                ))

            }
        </>
    )
}

export default WidgetDataRenderer;