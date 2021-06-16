import React, { useEffect, useState } from 'react';
import styled from'styled-components/native';
import { IoTDevicePrimitives } from '../../../../IoTDevice/domain/IoTDevice';
import Label from '../../../../Shared/components/Layout/Labels/Label';
import useDevices from '../../../../Shared/store/hooks/devices/useDevices';
import useSubscriptions from '../../../../Shared/store/hooks/subscriptions/useSubscriptions';
import { SubscriptionPrimitives } from '../../../../Subscription/domain/Subscription';
import DeviceDataRenderer from '../../../../IoTDeviceData/components/DeviceDataRenderer/DeviceDataRenderer';
import useUsersSearch from '../../../../Shared/store/hooks/users/useUsersSearch';
import { SimpleAvatar } from '../../Layout/Avatar/Avatar';
import ThemeUtils from '../../../../Shared/utils/Theme/ThemeUtils';

const SecondaryUserScreen: React.FC = () => {
    /**
     * Hooks
     */
    //Subscriptions
    const { 
        fetching,
        acceptedSubscriptions,
        getRequestedSubscriptions 
    } = useSubscriptions();
    //Effects
    useEffect(() => {
        getRequestedSubscriptions();
    }, [getRequestedSubscriptions]);

    //Render
    if(fetching)
        return <Label>Obteniendo datos...</Label>
    return <>
        <SubscriptionRendererTitle>
            Actividad de usuarios
        </SubscriptionRendererTitle>
        { 
            acceptedSubscriptions.map(subscription => (
                <SubscriptionDataRenderer 
                    key = { subscription._id }
                    subscription = { subscription }
                />
            ))
        }
    </>
}

export default SecondaryUserScreen;

//Components
export const SubscriptionRendererTitle = styled(Label)`${({ theme }) => `
    font-size: 22px;
    font-weight: 600;
    background-color: ${ theme.backgroundColor };
    padding: 10px;
    width: 100%;
`}`;

interface SubscriptionDataProps {
    subscription: SubscriptionPrimitives;
}

const SubscriptionDataRenderer: React.FC<SubscriptionDataProps> = ({
    subscription
}) => {
    /**
     * Hooks
     */
    //Devices
    const { 
        fetching,
        devicesByUser,
        getUserDevices 
    } = useDevices();
    //Local state
    const [devices, setDevices] = useState<IoTDevicePrimitives[]>([]);
    //Effects
    useEffect(() => {
        const userDevices = devicesByUser?.[subscription.to];
        if(!userDevices)
            getUserDevices(subscription.to);
        else setDevices(userDevices)
    }, [
        subscription,
        devicesByUser,
        getUserDevices
    ]);

    if(fetching)
        return <Label>Obteniendo dispositivos...</Label>

    return (
        <PrimaryUserDataContainer>
            <SubscriptionCard 
                subscription = { subscription }
            />
            <DeviceDataRenderer 
                devices = { devices }
            />
        </PrimaryUserDataContainer>
    )
}

const PrimaryUserDataContainer = styled.View`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => ThemeUtils.getThemedTranslucidBackground(theme, 0.035) };
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
`;


const SubscriptionCard: React.FC<SubscriptionDataProps> = ({
    subscription
}) => {
    /**
     * Hooks
     */
    //Users search
    const { usersDictionary } = useUsersSearch();
    //Constants
    const userData = usersDictionary?.[subscription.to];

    //Render
    if(!userData)
        return null;
    return (
        <FlexRow>
            <SimpleAvatar 
                size = { 40 }
                userName = { userData.name }
                userLastName = { userData.lastName }
            />
            <FlexColumn>
                <Label fontSize = { 19 } >{ userData.name } { userData.lastName }</Label>
                <Label fontSize = { 16 } color = '#aaaaaa'>{ userData.email }</Label>
            </FlexColumn>
        </FlexRow>
    )
}

const FlexRow = styled.View`
    display: flex;
    flex-grow: 1;
    align-items: center;
    flex-direction: row;
    margin-bottom: 20px;
`;

const FlexColumn = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
`;