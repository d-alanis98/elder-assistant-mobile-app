import { CSSProperties } from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
//Props
import { ButtonProps, ButtonTypes } from './Button';

export const StyledButton = styled.TouchableOpacity<ButtonProps>`${props => `
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    justify-content: center;
    width: ${ props.width || '100%' };
    height: ${ props.height || '2.25rem'};
    margin: ${ props.margin || '0'};
    background-color: ${ getBackgroundColorByType(props) };
    border-radius: ${ props.borderRadius || '0.25rem'};
`}`;

const getBackgroundColorByType = (props: any) => {
    const { type, backgroundColor, theme } = props;
    switch(type) {
        case ButtonTypes.DANGER:
            return theme.alertColor;
        case ButtonTypes.PRIMARY:
            return theme.primaryColor;
        case ButtonTypes.SUCCESS:
            return theme.successColor;
        case ButtonTypes.WARNING:
            return theme.warningColor;
        case ButtonTypes.INFORMATION:
            return theme.informationColor;
        default:
            if(backgroundColor)
                return backgroundColor;
            return theme.primaryColor;
    }
}

interface ButtonTextProps extends TextProps {
    fontSize?: number | string;
}

export const StyledButtonText = styled.Text<ButtonTextProps>`${({ theme, fontSize }) => `
    color: ${ theme.backgroundColor };
    font-family: sans-serif;
    fontSize: ${ fontSize || '1.05rem'};
`}`;
