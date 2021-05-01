
//IoTDevice domain
import { IoTDevicePrimitives } from '../../domain/IoTDevice';
//Request manager
import AxiosRequest from '../../../Shared/infrastructure/Requests/AxiosRequest';
/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description API facade to access relevant data for the user views and use cases.
 */

export const getDevicesData = async (): Promise<IoTDevicePrimitives[]> => {
    try {
        const response = await AxiosRequest.get('/iot/devices');
        return response.data;
    } catch(error) {
        return Promise.reject(error);
    }
}





