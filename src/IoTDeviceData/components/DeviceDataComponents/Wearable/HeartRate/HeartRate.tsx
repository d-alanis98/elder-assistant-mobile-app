import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import TouchableIcon from '../../../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
import Label from '../../../../../Shared/components/Layout/Labels/Label';
import LastUpdate from '../../../../../Shared/components/LastUpdate/LastUpdate';
import ThemeUtils from '../../../../../Shared/utils/Theme/ThemeUtils';
import DeviceDataWidget, { BaseWidgetProps } from "../../../DeviceDataWidget/DeviceDataWidget";

interface HeartRateProps extends BaseWidgetProps {
    eventData: HeartRateData;
}


const HeartRate: React.FC<HeartRateProps> = ({
    event,
    eventData
}) => {
    //Props
    const { heartRate, saturation } = eventData;
    /**
     * Hooks
     */
    //Callbacks
    const getHeartRateStatus = useCallback(() => {
        if(heartRate >= 75 && heartRate <= 130)
            return 'excellent';
        if(heartRate > 130 && heartRate < 145)
            return 'moderate';
        return 'outOfRange';
    }, [heartRate]);

    const getSaturationStatus = useCallback(() => {
        if(saturation >= 95 && saturation <= 100)
            return 'excellent';
        if(saturation < 95 && saturation >= 90)
            return 'moderate';
        return 'outOfRange';
    }, [saturation]);

    return (
        <DeviceDataWidget
            icon = 'heartbeat'
            widgetTitle = 'Ritmo cardiaco'
        >
            <HeartRateIcon 
                heartRateStatus = { getHeartRateStatus() }
            />
            <HeartRateEntryEmphasis
                heartRateStatus = { getHeartRateStatus() }
            >
                { heartRate } BPM
            </HeartRateEntryEmphasis>
            <HeartRateEntry>
            <HeartRateEntryText>
                SPO2:
            </HeartRateEntryText>
            <HeartRateEntryEmphasis
                heartRateStatus = { getSaturationStatus() }
            >
                { saturation.toFixed(0) }%
            </HeartRateEntryEmphasis>
            </HeartRateEntry>
            <LastUpdate 
                issueDate = { event.issuedAt }
            />
        </DeviceDataWidget>
    )
}

export default HeartRate;

//Types
interface HeartRateData {
    heartRate: number;
    saturation: number;
}

//Components


export const HeartRateEntry = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

interface HeartRateIconProps {
    heartRateStatus: HeartRateStatus;
}

export const HeartRateIcon = styled(TouchableIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: 'heart',
        size: 100,
    }))<HeartRateIconProps>`${({
        heartRateStatus
    }) => `
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-size: 100px; 
    color: ${ heartRateColorsDictionary[heartRateStatus].fontColor };
    border: 2px solid ${ heartRateColorsDictionary[heartRateStatus].backgroundColor };
    background-color: ${ heartRateColorsDictionary[heartRateStatus].borderColor };
    margin: 14px auto; 
`}`;

export const HeartRateEntryEmphasis = styled(Label)<HeartRateIconProps>`
    font-size: 22px;
    margin: 10px 0;
    opacity: 0.9;
    font-weight: 500;
    color: ${({ 
        theme,
        heartRateStatus 
    }) => ThemeUtils.isDarkMode(theme)
        ? heartRateColorsDictionary[heartRateStatus].borderColor
        : heartRateColorsDictionary[heartRateStatus].fontColor 
    };
`;


export const HeartRateEntryText = styled(Label)`
    font-size: 22px;
    font-weight: 500;
    margin: 12px 0;
    margin-right: 10px;
`;

export const HeartRateSubText = styled(Label)`
    font-size: 15px;
    opacity: 0.9;
`;


//Helpers
const heartRateColorsDictionary = {
    excellent: {
        fontColor: '#0f5132',
        borderColor: '#badbcc',
        backgroundColor: '#d1e7dd',
    },
    moderate: {
        fontColor: '#664d03',
        borderColor: '#ffecb5',
        backgroundColor: '#fff3cd',
    },
    outOfRange: {
        fontColor: '#842029',
        borderColor: '#f5c2c7',
        backgroundColor: '#f8d7da',
    }
}

type HeartRateStatus = keyof typeof heartRateColorsDictionary;

