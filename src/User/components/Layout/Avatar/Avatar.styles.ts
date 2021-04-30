import { ImageProps } from 'react-native';
import styled from 'styled-components/native';
//Theme
import { darkTheme } from '../../../../Shared/components/Theme/constants/theme';
//Props
import { AvatarProps } from './Avatar';

export const AvatarContainer = styled.TouchableOpacity<AvatarProps>`${({ 
    size,
    theme,
    marginLeft, 
    marginRight
}) => `
    width: ${ getAvatarSize(size) }px; 
    height: ${ getAvatarSize(size) }px; 
    display: flex;
    padding: 5px;
    margin-left: ${ marginLeft || 0}px;
    margin-right: ${ marginRight || 0 }px;
    align-items: center;
    border-radius: ${ getAvatarSize(size) / 2 }px;
    justify-content: center;
    background-color: ${ theme.fontColor === darkTheme.fontColor ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0,0,0,0.07)'}; 
`}`;

interface AvatarImageProps extends ImageProps {
    size: number;
    resizeImage: boolean;
}

export const AvatarImage = styled.Image<AvatarImageProps>`${({ size, resizeImage }) => `
    width: ${ getImageDimensions(size) }px;
    height: ${ getImageDimensions(size) }px;
    border-radius: ${ getImageDimensions(size) / 2 }px;
    resize-mode: ${ resizeImage ? 'contain' : 'cover'};
`}`;

const getImageDimensions = (size?: number) => size ? size - 5: 25;

export const getAvatarSize = (size?: number) => size || 30;