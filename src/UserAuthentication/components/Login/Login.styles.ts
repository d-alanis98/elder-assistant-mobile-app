import styled from 'styled-components/native';
import { screenWidth } from '../../../../App.styles';
import { darkTheme } from '../../../Shared/components/Theme/constants/theme';


export const LoginContainer = styled.View`
    flex: 1;
    flex-direction: column;
    padding: 20px;
    background-color: #457b9d;
`;

export const LoginFormContainer = styled.View`
    background-color: rgba(255,255,255,0.85);
    padding: 30px 15px;
    border-radius: 10px;
    z-index: 90;
`;


export const LoginInput = styled.TextInput`${({ theme }) => `
    height: 60px;
    color: ${ theme.fontColor };
    background-color: ${ theme.fontColor === darkTheme.fontColor 
        ? 'rgba(255,255,255, 0.09)'
        : 'rgba(0,0,0,0.05)'
    };
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 20px;
`}`;

const illustrationSize = screenWidth / 1.5;
export const LoginIllustration = styled.Image`
    position: absolute;
    bottom: -35px;
    left: 0;
    right: 0;
    justify-content: center;
    height: ${ illustrationSize }px;
    width: ${ illustrationSize }px;
    z-index: 10;
`