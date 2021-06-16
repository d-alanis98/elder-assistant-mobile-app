import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Button from '../../../../../Shared/components/Layout/Buttons/Button';
import Label from '../../../../../Shared/components/Layout/Labels/Label';
import Map from '../../../../../Shared/components/Map/Map';
import usePanicAlerts from '../../../../../Shared/store/hooks/deviceData/usePanicAlerts';
import DeviceDataWidget, { BaseWidgetProps } from '../../../DeviceDataWidget/DeviceDataWidget';
import { Audio } from 'expo-av';
import configuration from '../../../../../../configuration';
import TouchableIcon from '../../../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
import ThemeUtils from '../../../../../Shared/utils/Theme/ThemeUtils';

interface PanicAlertProps extends BaseWidgetProps {
    eventData: string;
}

const PanicAlert: React.FC<PanicAlertProps> = ({
    event,
    device,
    eventData
}) => {
    return (
        <DeviceDataWidget
            icon = 'exclamation-circle'
            widgetTitle = 'Alerta de panico'
        >
            <PanicAlertRenderer 
                key = { event._id }
                event = { event }
                device = { device }
                eventData = { eventData }
            />
        </DeviceDataWidget>
    )
}

export default PanicAlert;

//Internal components
const PanicAlertRenderer: React.FC<PanicAlertProps> = ({
    event,
    eventData
}) => {
    /**
     * Hooks
     */
    //Panic alerts
     const { 
        isAlertAttended, 
        setPanicAlertAsAttended 
    } = usePanicAlerts();

    //State
    const [sound, setSound] = useState<any>();
    const [isPlaying, setIsPlaying] = useState(false);
    //Callbacks
    const getLocation = useCallback(() => {
        //We parse the location from the eventData string
        const { location } = JSON.parse(eventData);
        return location;
    }, [eventData]);

    const playAlertAudio = useCallback(async () => {
        const { sound } = await Audio.Sound.createAsync(
            { uri: `${ configuration.SERVER_URL }/PanicAlerts/${ event.filePath }` },
            { shouldPlay: true }
        );
        setSound(sound);
        setIsPlaying(true);
        sound._onPlaybackStatusUpdate = (status: any) => {
            setIsPlaying(status.isPlaying || false);
        }
        await sound.playAsync();
    }, [setSound]);

    React.useEffect(() => {
        
        return () => {
            sound?.unloadAsync();
            setIsPlaying(false);
        }
      }, [sound]);
    


    if(!isAlertAttended(event._id))
        return null;
    return (
        <>
            <AudioContainer>
                <AudioIcon
                    icon = { isPlaying ?  'pause' : 'play' }
                    onPress = { playAlertAudio }
                />
                <AudioLabel>
                    { isPlaying ? 'Reproduciendo...' : 'Reproducir audio' }
                </AudioLabel>
            </AudioContainer>
            <Label>
                Ubicación de la alerta: 
            </Label>
            <Map 
                lat = { getLocation().lat }
                lon = { getLocation().lon }
                height = { 200 }
                scrollEnabled
            />
        </>
    )
}


const AudioIcon = styled(TouchableIcon)`
    margin-right: auto;
    margin-left: 10px;
`;

const AudioLabel = styled(Label)`
    margin-left: 10px;
    margin-right: 10px;
    color: #666;
    font-size: 16px;
`;

const AudioContainer = styled.View`
    height: 50px;
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border-radius: 25px;
    background-color: ${({ theme }) => ThemeUtils.getThemedTranslucidBackground(theme, 0.1) };
`;