import React from 'react';
import { ValidUserTypes } from '../../../User/domain/User';
import { useAppSelector } from '../../store/hooks';


const PrimaryUserProtected: React.FC = ({ children }) => {
    const { type: userType = 'SECONDARY' } = useAppSelector(state => state?.user);

    return userType === ValidUserTypes.PRIMARY
    ? <>{ children }</>
    : null;
}

export default PrimaryUserProtected;