import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '..';
import { IoTDevicePrimitives } from '../../../../IoTDevice/domain/IoTDevice';
//Actions
import { getDevicesAction, getDevicesWithLoaderAction } from '../../reducers/devicesDuck';

/**
 * Custom hook to get the user devices in the application.
 */
const useDevices = () => {
    /**
     * Hooks
     */
    //Redux store
    const { devices, fetching } = useAppSelector(state => state.devices);
    //Actions dispatcher
    const dispatch = useAppDispatch();

    //Effects
    useEffect(() => {
        dispatch(devices?.length === 0
            ? getDevicesWithLoaderAction()
            : getDevicesAction()
        );
    }, []);

    return { 
        devices: <IoTDevicePrimitives[]>devices, 
        fetching,
        getDevices: getDevicesAction,
    };
}

export default useDevices;