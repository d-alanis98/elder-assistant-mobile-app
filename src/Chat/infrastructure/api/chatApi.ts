

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Facade to access chat API endpoints.
 */

import AxiosRequest from "../../../Shared/infrastructure/Requests/AxiosRequest";
import { ChatPrimitives } from "../../domain/Chat";

export const getChats = async (): Promise<ChatPrimitives[]> => {
    try {
        const response = await AxiosRequest.get('/chats');
        console.log(response.data)
        return response.data;
    } catch(error) {
        return Promise.reject(error);
    }
}