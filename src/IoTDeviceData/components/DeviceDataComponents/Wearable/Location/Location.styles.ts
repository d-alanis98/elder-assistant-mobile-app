import styled from 'styled-components/native';
//Components
import Label from '../../../../../Shared/components/Layout/Labels/Label';


export const LastLocationLabelContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    opacity: 0.8;
`;

export const LastLocationLabel = styled(Label)`
    font-size: 16px;
    font-weight: 700;
`;

export const LastLocationTime = styled(Label)`
    font-size: 16px;
    font-weight: 400;
    margin: 5px;
`