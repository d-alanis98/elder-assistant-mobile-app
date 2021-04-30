import React from 'react';
import { ViewProps, ImageProps as NativeImageProps, Image } from 'react-native';
//Components
import Label from '../../Labels/Label';
//Styled components
import { ImageSelectorAsset, ImageSelectorContainer, ImageSelectorOption } from './ImageSelector.styles';


export interface ImageSelectorProps extends ViewProps {
    options: ImageSelectorOption[];
    selected: string;
    setSelected: (value: string) => void;
    imageProperties?: NativeImageProps;
    selectedBorderWidth?: string | number;
    selectedBorderColor?: string | number;
}

export interface ImageProps {
    selected: boolean;
    numberOfOptions: number;
    selectedBorderWidth?: string | number;
    selectedBorderColor?: string | number;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
    options,
    selected,
    setSelected,
    imageProperties,
    selectedBorderWidth,
    selectedBorderColor
}) => (
    <ImageSelectorContainer>
        {
            options.map((option: ImageSelectorOption) => (
                <ImageSelectorOption
                    key = { option.value }
                    onPress = { () => setSelected(option.value) }
                    selected = { selected === option.value }
                    numberOfOptions = { options.length }
                    selectedBorderWidth = { selectedBorderWidth }
                    selectedBorderColor = { selectedBorderColor }
                >
                    <ImageSelectorAsset
                        source = { option.imageSource }
                        style = {{ resizeMode: 'contain' }}
                        { ...imageProperties }
                    />
                    <Label style={{ flexGrow: 1, textAlign: 'center' }}> { option.description } </Label>
                </ImageSelectorOption>
            ))
        }
    </ImageSelectorContainer>
);

export default ImageSelector;

//Helpers
export interface ImageSelectorOption {
    value: string;
    imageSource: any;
    description: string | React.ReactElement; 
}