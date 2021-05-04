import React from 'react';
import { ViewProps } from 'react-native';
//Domain
import { IoTDevicePrimitives } from '../../../IoTDevice/domain/IoTDevice';
import { IoTDeviceDataPrimitives } from '../../domain/IoTDeviceData';
//Styled components
import { DeviceDataWidgetContainer, DeviceDataWidgetTitleContainer, DeviceDataWidgetTitleIcon, DeviceDataWidgetTitleText } from './DeviceDataWidget.styles';

export interface DeviceDataWidgetProps extends ViewProps {
    icon?: string;
    width?: number | string;
    height?: number | string;
    fontSize?: number;
    iconSize?: number;
    fontWeight?: string;
    widgetTitle?: string;
    borderRadius?: number;
    marginBottom?: number;
    backgroundColor?: string;
}

const DeviceDataWidget: React.FC<DeviceDataWidgetProps> = ({
    icon,
    width,
    height,
    children,
    fontSize,
    iconSize,
    fontWeight,
    widgetTitle,
    borderRadius,
    marginBottom,
    backgroundColor
}) => {
    return (
        <DeviceDataWidgetContainer
            width = { width }
            height = { height }
            borderRadius = { borderRadius }
            marginBottom = { marginBottom }
            backgroundColor = { backgroundColor }
        >
            <DeviceDataWidgetTitleContainer>
                <DeviceDataWidgetTitleIcon 
                    name = { icon }
                    iconSize = { iconSize }
                />
                <DeviceDataWidgetTitleText
                    fontSize = { fontSize }
                    fontWeight = { fontWeight }
                >
                    { widgetTitle }
                </DeviceDataWidgetTitleText>
            </DeviceDataWidgetTitleContainer>
            { children }
        </DeviceDataWidgetContainer>
    );
}

export default DeviceDataWidget;

//Helpers
export interface BaseWidgetProps {
    key: string;
    event: IoTDeviceDataPrimitives;
    device: IoTDevicePrimitives;
    eventData: string | Object;
}