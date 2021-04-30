import React from 'react';
import { TouchableOpacityProps } from 'react-native';
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
}) => (
    <AvatarContainer
        size = { size }
        marginLeft = { marginLeft }
        marginRight = { marginRight }
        { ...ownProps }
    >
        <AvatarImage 
            size = { size }
            source = {{ uri: 'https://lh3.googleusercontent.com/ogw/ADGmqu_cw1cb-p8jWvIdXx00alyC3r5RtAmPE4bkLHHBGg=s64-c-mo' }}
            resizeImage = { resizeImage }
        />
    </AvatarContainer>
);

export default Avatar;