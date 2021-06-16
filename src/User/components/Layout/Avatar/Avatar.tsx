import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import Label from '../../../../Shared/components/Layout/Labels/Label';
import { useAppSelector } from '../../../../Shared/store/hooks';
//Styled components
import { AvatarContainer, AvatarImage } from './Avatar.styles';

export interface AvatarProps extends TouchableOpacityProps {
    size: number;
    marginLeft?: number;
    marginRight?: number;
    resizeImage?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ 
    size,
    marginLeft,
    marginRight,
    resizeImage = false,
    ...ownProps 
}) => {
    /**
     * Hooks
     */
    //State selector
    const { name, lastName } = useAppSelector(state => state.user);
    return <SimpleAvatar 
        size = { size }
        userName = { name }
        marginLeft = { marginLeft }
        marginRight = { marginRight }
        resizeImage = { resizeImage }
        userLastName = { lastName }
        { ...ownProps }
    />
}

export default Avatar;


interface SimpleAvatarProps extends AvatarProps {
    userName: string;
    userLastName: string
}

export const SimpleAvatar: React.FC<SimpleAvatarProps> = ({
    size,
    userName,
    marginLeft,
    marginRight,
    resizeImage = false,
    userLastName,
    ...ownProps 
}) => (
    <AvatarContainer
        size = { size }
        marginLeft = { marginLeft }
        marginRight = { marginRight }
        { ...ownProps }
    >
        <Label
            color = '#999'
            fontSize = { 17 }
        >
            { userName[0] }{ userLastName[0] }
        </Label>
    </AvatarContainer>
)