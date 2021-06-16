import React from 'react';
import styled from 'styled-components/native';
import useLastUpdate from '../../hooks/useLastUpdate';
import DateHelper from '../../utils/Date/DateHelper';
import Label from '../Layout/Labels/Label';


interface LastUpdateProps {
    issueDate: string;
}
const LastUpdate: React.FC<LastUpdateProps> = ({
    issueDate
}) => {
    /**
     * Hooks
     */
    //State
    const [lastUpdate, setLastUpdate] = React.useState(DateHelper.getDateDifferenceFromIsoString(issueDate));
    //Effects
    React.useEffect(() => {
        const updateInterval = setInterval(() => {
            setLastUpdate(DateHelper.getDateDifferenceFromIsoString(issueDate) || '')
        }, 10000);
        return () => clearInterval(updateInterval)
    }, [issueDate]);
    return (
        <LastUpdateContainer>
            <LastUpdateLabel
                fontWeight = 'bold'
            >
                Última actualización: 
            </LastUpdateLabel>
            <LastUpdateLabel>
                { lastUpdate }
            </LastUpdateLabel>
        </LastUpdateContainer>
    )
}

export default LastUpdate;

const LastUpdateLabel = styled(Label)`
    font-size: 16px;
    margin-right: 10px;
    opacity: 0.85;
`;

const LastUpdateContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;
