import React from 'react';
//Components
import { ButtonProps } from '../Button';
import LabelWithIcon from '../../Labels/LabelWithIcon/LabelWithIcon';
//Styled components
import { ButtonWithIconContainer } from './ButtonWithIcon.styles';


interface ButtonWithIconProps extends ButtonProps {
    icon: string;
    fontSize?: number;
    buttonText: string;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
    icon,
    type,
    color = '#fff',
    onPress,
    fontSize = 18,
    buttonText,
    ...restProps
}) => (
    <ButtonWithIconContainer
        type = { type }
        onPress = { onPress }
        { ...restProps }
    >
        <LabelWithIcon 
            icon = { icon }
            color = { color }
            fontSize = { fontSize }
        >
            { buttonText }
        </LabelWithIcon>


    </ButtonWithIconContainer>
);

export default ButtonWithIcon;
