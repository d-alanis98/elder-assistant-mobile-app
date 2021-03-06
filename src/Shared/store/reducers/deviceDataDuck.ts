import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Domain
import { IoTDevicePrimitives } from '../../../IoTDevice/domain/IoTDevice';
import { IoTDeviceDataPrimitives } from '../../../IoTDeviceData/domain/IoTDeviceData';
//External actions
import { getDeviceEventKeysAction } from './devicesDuck';
//API
import { getDevicesDataByEventType } from '../../../IoTDeviceData/infrastructure/api/deviceDataApi';
//Base action type
import { ThunkAppAction } from '../store';


/**
 * @author Damián Alanís Ramírez
 * @version 1.6.2
 * @description Specification of the device data reducer, containing action types, the reducer itself and the action functions.
 */

/**
 * Constants
 */
const GET_DEVICE_DATA                    = 'GET_DEVICE_DATA';
const GET_DEVICE_DATA_ERROR              = 'GET_DEVICE_DATA_ERROR';
const GET_DEVICE_DATA_SUCCESS            = 'GET_DEVICE_DATA_SUCCESS';
const GET_DEVICE_DATA_HISTORY_SUCCESS    = 'GET_DEVICE_DATA_HISTORY_SUCCESS';
const SET_VIEWED_PANIC_ALERTS_DICTIONARY = 'SET_VIEWED_PANIC_ALERTS_DICTIONARY';
//Others
const PANIC_ALERTS_DICTIONARY = 'PANIC_ALERTS_DICTIONARY';
//State shape
interface DeviceDataState {
    error?: string;
    fetching: boolean;
    lastData: LastDataDictionary;
    historyData: HistoryDataDictionary;
    attendedPanicAlerts: PanicAlertsDictionary;
}
// Initial state
const initialState: DeviceDataState = {	
    fetching: false,
    lastData: { },
    historyData: { },
    attendedPanicAlerts: { },
};

/**
 * Reducer
 */

const reducer = (state = initialState, action: AnyAction): DeviceDataState => {
    const { type, payload } = action;
    switch(type) {
        case GET_DEVICE_DATA:
            return {
                ...state,
                fetching: true,
            };
        case GET_DEVICE_DATA_ERROR:
            return {
                ...state,
                error: payload,
                fetching: false,
            };
        case GET_DEVICE_DATA_SUCCESS:
            return {
                ...state,
                error: undefined,
                fetching: false,
                lastData: {
                    ...state.lastData,
                    ...payload
                },
            };
        case GET_DEVICE_DATA_HISTORY_SUCCESS:
            return {
                ...state,
                error: undefined,
                fetching: false,
                historyData: payload,
            }
        case SET_VIEWED_PANIC_ALERTS_DICTIONARY:
            return {
                ...state,
                attendedPanicAlerts: payload,
            }
        default:
            return state;
    };
};

export default reducer;


/**
 * Actions
 */

/**
 * Action to get the last data of a device.
 * @param {string} deviceId Id of the device whose data we want to get.
 * @returns 
 */
export let getLastDeviceDataAction = (
    deviceId: string,
    ownerUserId: string = ''
): ThunkAppAction<Promise<void>> => async (dispatch, getState) => new Promise((resolve, reject) => {
    //We get the device's event keys
    const eventKeys: string[] = getDeviceEventKeysAction(
        deviceId,
        ownerUserId
    )(dispatch, getState, null);
    //We get the fetch data promises for each event key
    const promises: Promise<IoTDeviceDataPrimitives>[] = getDeviceDataByEventKeysPromises(eventKeys, deviceId, ownerUserId);
    //We await for all the promises to resolve
    Promise.all(promises)
        .then(deviceEventsData => {
            //We get the last data dictionary
            const deviceLastData = getDeviceLastDataDictionary(deviceId, deviceEventsData);
            //We dispatch the GET_DEVICE_DATA_SUCCESS action with the device last data dictionary as payload
            dispatch({
                type: GET_DEVICE_DATA_SUCCESS,
                payload: deviceLastData
            });
            resolve();
        })
        .catch(error => {
            dispatch({
                type: GET_DEVICE_DATA_ERROR,
                payload: error,
            });
            reject();
        })
});

/**
 * Action to get the last data of a device with the loader state.
 * @param {string} deviceId Id of the device whose data we want to get.
 * @returns 
 */
export let getLastDeviceDataWithLoaderAction = (
    deviceId: string,
    ownerUserId?: string
): ThunkAppAction => (dispatch, getState) => {
    //To set the fetching state to true
    dispatch({
        type: GET_DEVICE_DATA,
    });
    //We dispatch the action to get the last device data
    getLastDeviceDataAction(deviceId, ownerUserId)(dispatch, getState, null);
}

/**
 * Method to update a last device data entry in the dictionary with received data
 * (from WebSockets).
 * @param {IoTDeviceDataPrimitives} deviceData Device data record to update.
 * @returns 
 */
export let updateLastDeviceDataAction = (deviceData: IoTDeviceDataPrimitives): ThunkAppAction => (dispatch, getState) => {
    //We get the current last device data dictionary
    const { lastData: deviceLastData } = { ...getState().deviceData }; 
    //We update the record
    updateLastDataDictionaryEntry(
        deviceData.deviceId,
        deviceData,
        deviceLastData
    );
    //We dispatch the GET_DEVICE_DATA_SUCCESS action with the device last data dictionary as payload
    dispatch({
        type: GET_DEVICE_DATA_SUCCESS,
        payload: deviceLastData
    });
    //We set the updated panic alerts dictionary
    dispatch({
        type: SET_VIEWED_PANIC_ALERTS_DICTIONARY,
        payload: getDictionaryWithAddedPanicAlert(
            deviceData,
            getState().deviceData.attendedPanicAlerts
        )
    });
}

/**
 * Action to set a Panic alert as viewed.
 * @param alertId Id of the devie data record (Panic alert).
 * @returns 
 */
export const setPanicAlertAsAttendedAction = (
    alertId: string
): ThunkAppAction => (dispatch, getState) => {
    dispatch({
        type: SET_VIEWED_PANIC_ALERTS_DICTIONARY,
        payload: getUpdatedPanicAlertsDictionary(
            alertId,
            true,
            getState().deviceData.attendedPanicAlerts
        )
    });
}

/**
 * Action to retrieve the attended panic alerts dictionary from the local storage.
 * @returns 
 */
export const restoreAttendedPanicAlertsDictionary = (): ThunkAppAction => async (dispatch, _) => {
    dispatch({
        type: SET_VIEWED_PANIC_ALERTS_DICTIONARY,
        payload: await retrievePanicAlertsDictionary()
    });
}


/**
 * Helpers
 */
/**
 * Function to get the device data fetch promises for each key in an array ready to be used in Promise.all().
 * @param {string[]} eventKeys The key of the events whose last data we want to get.
 * @param {string} deviceId The ID of the device.
 * @returns 
 */
const getDeviceDataByEventKeysPromises = (
    eventKeys: string[], 
    deviceId: string,
    ownerUserId?: string
) => {
    const promises: Promise<IoTDeviceDataPrimitives>[] = [];
    //We get the request promise for each event key
    eventKeys.forEach((eventKey: string) => {
        const deviceEventsDataPromise = getDevicesDataByEventType({ 
            eventKey, 
            deviceId, 
            ownerUserId 
        });
        promises.push(deviceEventsDataPromise);        
    });
    return promises;
}

/**
 * Function to get the result last event dictionary for this device.
 * @param {string} deviceId The ID of the device.
 * @param {IoTDeviceDataPrimitives[]} deviceEventsData The obtained events data from the API.
 * @returns 
 */
const getDeviceLastDataDictionary = (
    deviceId: string,
    deviceEventsData: IoTDeviceDataPrimitives[]
) => {
    //We initialize the result dictionary
    const deviceLastData: LastDataDictionary = {};
    //We iterate through the results array
    deviceEventsData.forEach(deviceData => {
        //We validate the data existance
        if(!deviceData)
            return;
        //We update the dictionary record
        updateLastDataDictionaryEntry(
            deviceId,
            deviceData,
            deviceLastData
        );
    });
    //We return the final dictionary
    return deviceLastData;
}


/**
 * Function to get the updated last data dictionary.
 * @param deviceId Id of the device.
 * @param deviceData Device data.
 * @param deviceLastData Existing device data.
 */
const updateLastDataDictionaryEntry = (
    deviceId: string,
    deviceData: IoTDeviceDataPrimitives,
    deviceLastData: LastDataDictionary
) => {
    //We create the empty object for the device id key if it does not exist
    if(!deviceLastData[deviceId])
        deviceLastData[deviceId] = { };
    //We append the data to the dictionary
    deviceLastData[deviceId][deviceData.key] = deviceData;
}

/**
 * Function to get the dictionary with a new panic alert, with status of non-viewed, so
 * we can display it as a banner.
 * @param {IoTDeviceDataPrimitives} deviceData IoT device data record.
 * @param {PanicAlertsDictionary} existingPanicAlerts Existing panic alerts dictionary.
 * @returns 
 */
const getDictionaryWithAddedPanicAlert = (
    deviceData: IoTDeviceDataPrimitives,
    existingPanicAlerts: PanicAlertsDictionary
): PanicAlertsDictionary => {
    if(deviceData.key !== 'PanicAlert')
        return existingPanicAlerts;
    const alertId = deviceData._id;
    return getUpdatedPanicAlertsDictionary(
        alertId,
        false,
        existingPanicAlerts
    );
}

/**
 * Fucntion to get the panic alerts dictionary with an updated entry.
 * @param {string} alertId Id of the alert.
 * @param {boolean} viewed View status.
 * @param {PanicAlertsDictionary}existingPanicAlerts Existing panic alerts dictionary. 
 * @returns 
 */
const getUpdatedPanicAlertsDictionary = (
    alertId: string,
    viewed: boolean,
    existingPanicAlerts: PanicAlertsDictionary
): PanicAlertsDictionary => {
    //We create the empty object for the device id key if it does not exist
    existingPanicAlerts[alertId] = viewed;
    //We persist the updated panic alerts dictionary
    persistPanicAlertsDictionary(existingPanicAlerts);
    //We return the updated dictionary
    return existingPanicAlerts;
}

/**
 * Function to retrieve the panic alerts dictionary from the local storage.
 * @returns {PanicAlertsDictionary}
 */
const retrievePanicAlertsDictionary = async () => {
    const panicAlertsDictionary = await AsyncStorage.getItem(PANIC_ALERTS_DICTIONARY);
    return panicAlertsDictionary 
        ? JSON.parse(panicAlertsDictionary)
        : {};
}

/**
 * Funciton to persist the panic alerts dictionary to the local storage.
 * @param {PanicAlertsDictionary} panicAlertsDictionary Alerts dictionary.
 */
const persistPanicAlertsDictionary = async (panicAlertsDictionary: PanicAlertsDictionary) => {
    await AsyncStorage.setItem(PANIC_ALERTS_DICTIONARY, JSON.stringify(panicAlertsDictionary));
}

//Types
type LastDataDictionary = { 
    [deviceId: string]: LastEventData,
};
type HistoryDataDictionary = { 
    [deviceId: string]: {
        [eventKey: string]: IoTDevicePrimitives[] 
    }
};

interface PanicAlertsDictionary {
    [panicAlertId: string]: boolean;
}

export type LastEventData = {
    [eventKey: string]: IoTDeviceDataPrimitives
};