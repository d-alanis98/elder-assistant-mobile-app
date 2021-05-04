import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';

export const LabelWithIconContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const LabelStyledIcon = styled(FontAwesome5)`${({ 
    theme, 
    color, 
    fontSize 
}) => `
    color: ${ color || theme.fontColor };
    fontSize: ${ fontSize || 20 }px;
    margin-right: 10px;
`}`