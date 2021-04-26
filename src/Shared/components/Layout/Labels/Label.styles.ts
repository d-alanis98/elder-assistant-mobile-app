import styled from 'styled-components/native';
//Props
import { LabelProps } from './Label';

export const StyledLabel = styled.Text.attrs((props: LabelProps) => ({
    style: {
        fontFamily: props.fontFamily || 'sans-serif',
        ...props.style,
    }
}))<LabelProps>`${({ 
    theme,
    color,
    margin,
    fontSize,
    fontWeight,
}) => `
    color: ${ color || theme.fontColor };
    margin: ${ margin || '0' };
    font-size: ${ fontSize || '20px' };
    font-weight: ${ fontWeight || 'normal' };
`}`;
