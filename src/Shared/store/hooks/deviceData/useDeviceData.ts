import { useEffect } from 'react'
//Hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { getLastDeviceDataAction, getLastDeviceDataWithLoaderAction } from '../../reducers/deviceDataDuck';


/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Custom hooks to access the device data state and actions.
 */
const useDeviceData = (deviceId?: string) => {
    /**
     * Hooks
     */
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //Redux state selector
    const { lastData, fetching } = useAppSelector(state => state.deviceData);

    useEffect(() => {
        deviceId &&
            dispatch(Object.keys(lastData).length === 0
                ? getLastDeviceDataWithLoaderAction(deviceId)
                : getLastDeviceDataAction(deviceId)
            );
    }, []);

    return {
        fetching,
        lastData,
        getLastDeviceData: (deviceId: string) => dispatch(getLastDeviceDataAction(deviceId))
    }
}

export default useDeviceData;