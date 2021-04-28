import React, { useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//Styled components
import { PasswordInputContainer, PasswordInputField } from './PasswordInput.styles';
//Icons
import { FontAwesome5 } from '@expo/vector-icons'; 

export interface PasswordInputProps extends TextInputProps {
    width?: number;
    height?: number;
    fontSize?: number;
    fontColor?: string;
    marginTop?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    marginBottom?: number | string;
    borderRadius?: number | string;
    backgroundColor?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    width,
    height,
    fontSize,
    fontColor,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    borderRadius,
    backgroundColor,
    ...restProps
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const getIconName = useCallback((): string => showPassword 
        ? 'eye'
        : 'eye-slash'
    , [showPassword]);

    return (
        <PasswordInputContainer
            width = { width }
            height = { height }
            fontSize = { fontSize }
            fontColor = { fontColor }
            marginTop = { marginTop }
            marginLeft = { marginLeft }
            marginRight = { marginRight }
            marginBottom = { marginBottom }
            borderRadius = { borderRadius }
            backgroundColor = { backgroundColor }
        
        >
            <PasswordInputField 
                fontSize = { fontSize }
                fontColor = { fontColor }
                secureTextEntry = { !showPassword }
                { ...restProps }
            />
            <ShowOrHideIcon 
                iconSize = { fontSize }
                getIconName = { getIconName }
                setShowPassword = { setShowPassword }
            />
        </PasswordInputContainer>
    )
}

export default PasswordInput;


interface ShowOrHideIconProps {
    iconSize?: number;
    getIconName: () => string;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowOrHideIcon: React.FC<ShowOrHideIconProps> = ({
    iconSize,
    getIconName,
    setShowPassword
}) => (
    <TouchableOpacity
        style = {{ 
            width: iconSize ? iconSize + 10 : 30, 
            display: 'flex',
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        onPress = { () => setShowPassword(prevState => !prevState) }
    >
        <FontAwesome5 
            name = { getIconName() }
            size = { iconSize || 20 }
        />
    </TouchableOpacity>
)