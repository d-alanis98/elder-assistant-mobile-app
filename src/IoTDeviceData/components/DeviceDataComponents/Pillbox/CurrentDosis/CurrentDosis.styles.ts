import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
//Components
import Label from '../../../../../Shared/components/Layout/Labels/Label';
import ButtonWithIcon from '../../../../../Shared/components/Layout/Buttons/ButtonWithIcon/ButtonWithIcon';

export const CurrentDosisContainer = styled.View`
    padding: 10px;
    display: flex;
    align-content: center;
    justify-content: center;
`;


export const CurrentDosisLabel = styled(Label).attrs(props => ({
    ...(props as Object),
    fontSize: 18,
}))`
    opacity: 0.85;
    align-self: center;
    margin-bottom: 15px;
`;

export const CurrentDosisCompleteButton =  styled(ButtonWithIcon)`
    color: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const NextDosisContainer = styled.View`${({ theme }) => `
    width: 100%;
    padding: 15px 25px;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    border-top-color: ${ theme.fontColor };
    border-top-width: ${ StyleSheet.hairlineWidth }px;
`}`;

export const NextDosisRow = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const NextDosisLabel = styled(Label).attrs(props => ({
    ...(props as Object),
    fontSize: 16,
}))`
    opacity: 0.85;
    font-weight: 700;
    margin-bottom: 15px;
    margin-right: 5px;
`;

export const NextDosisTimeLabel = styled(Label).attrs(props => ({
    ...(props as Object),
    fontSize: 16,
}))`
    opacity: 0.75;
    margin-bottom: 15px;
`;