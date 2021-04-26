import styled from 'styled-components/native';
import { screenWidth } from '../../../../App.styles';
import { darkTheme } from '../../../Shared/components/Theme/constants/theme';


export const LoginContainer = styled.View`
    flex: 1;
    flex-direction: column;
    padding: 1rem;
    background-color: #457b9d;
`;

export const LoginFormContainer = styled.View`
    background-color: rgba(255,255,255,0.85);
    padding: 1.5rem 0.75rem;
    border-radius: 0.5rem;
    z-index: 90;
`;


export const LoginInput = styled.TextInput`${({ theme }) => `
    width: 100%;
    height: 3rem;
    color: ${ theme.fontColor }
    background-color: ${ theme.fontColor === darkTheme.fontColor 
        ? 'rgba(255,255,255, 0.09)'
        : 'rgba(0,0,0,0.05)'
    };
    border-radius: 0.25rem;
    padding: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 1rem;
`}`;

const illustrationSize = screenWidth / 1.5;
export const LoginIllustration = styled.Image`
    position: absolute;
    bottom: -35;
    left: 0;
    right: 0;
    justify-content: center;
    height: ${ illustrationSize };
    width: ${ illustrationSize };
    margin-right: 0.25rem;
    z-index: 10;
`