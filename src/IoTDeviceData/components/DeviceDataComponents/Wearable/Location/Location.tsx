import React from 'react';
import DeviceDataWidget, { BaseWidgetProps } from '../../../DeviceDataWidget/DeviceDataWidget';


interface LocationProps extends BaseWidgetProps {
    eventData: LocationData;
}

const Location: React.FC<LocationProps> = () => {
    return (
        <DeviceDataWidget
            icon = 'map-marker-alt'
            widgetTitle = 'Última ubicación'
        >

        </DeviceDataWidget>
    );
}

export default Location;



interface LocationData {
    lat: number;
    lon: number;
}