//Domain
import { UserPrimitives } from '../../User/domain/User';
//Requests manager
import AxiosRequest from '../../Shared/infrastructure/Requests/AxiosRequest';
//Response data specification
import { AuthenticationResponse } from '../domain/UserAuthentication';



export const login = async (data: FormData | Object): Promise<AuthenticationResponse> => {
    const response = await AxiosRequest.post(
        'http://192.168.1.94:3000/login',
        data
    );
    const responseData: AuthenticationResponse = response.data;
    return responseData;
}

export const register = async(data: FormData | Object): Promise<UserPrimitives> => {
    const response = await AxiosRequest.post(
        'http://192.168.1.94:3000/register',
        data
    );
    const responseData: UserPrimitives = response.data;
    return responseData;
}