import React from 'react';
//Components
import Map from '../../../../../Shared/components/Map/Map';
//Base widget
import DeviceDataWidget, { BaseWidgetProps } from '../../../DeviceDataWidget/DeviceDataWidget';
//Styled components
import { LastLocationLabel, LastLocationLabelContainer, LastLocationTime } from './Location.styles';
//Helpers
import DateHelper from '../../../../../Shared/utils/Date/DateHelper';

interface LocationProps extends BaseWidgetProps {
    eventData: LocationData;
}

const Location: React.FC<LocationProps> = ({
    event,
    eventData
}) => {
    return (
        <DeviceDataWidget
            icon = 'map-marker-alt'
            widgetTitle = 'Última ubicación'
        >
            <Map 
                lat = { eventData.lat }
                lon = { eventData.lon }
                height = { 300 }
                scrollEnabled
            />
            <LastLocationLabelContainer>
                <LastLocationLabel>
                    Última actualización: 
                </LastLocationLabel>
                <LastLocationTime>
                    { DateHelper.getDateDifferenceFromIsoString(event.issuedAt) }
                </LastLocationTime>
            </LastLocationLabelContainer>
        </DeviceDataWidget>
    );
}

export default Location;



interface LocationData {
    lat: number;
    lon: number;
}