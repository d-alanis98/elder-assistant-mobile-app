import React, { useEffect, useState } from 'react';
//Components
import Button from '../../../../../Shared/components/Layout/Buttons/Button';
import Pillbox from '../Pillbox/Pillbox';
import DeviceDataWidget, { BaseWidgetProps } from '../../../DeviceDataWidget/DeviceDataWidget';
//Styled components
import { CurrentDosisCompleteButton, CurrentDosisContainer, CurrentDosisLabel, NextDosisContainer, NextDosisLabel, NextDosisRow, NextDosisTimeLabel } from './CurrentDosis.styles';


interface CurrentDosisProps extends BaseWidgetProps {
    eventData: CurrentSectionEventData;
}

const CurrentDosis: React.FC<CurrentDosisProps> = ({ 
    device,
    eventData: currentDosis,
}) => {
    /**
     * Hooks
     */
    //State
    const [nextSection, setNextSection] = useState<PillboxScheduleType>({ });

    useEffect(() => {
        //Validation
        if(!currentDosis || !currentDosis.schedule || !(currentDosis.schedule instanceof Object))
            return;
        //Definitions
        const getSchedule = () => {
            return currentDosis.schedule[currentDosis.section];
        }

        const getNextSections = () => (
            Object.entries(currentDosis.schedule)
                .filter(([sectionKey]) => (
                    sectionKey > currentDosis.section
                ))
        );

        const getSectionNumber = (sectionLabel: string) => Number(sectionLabel.split('_')[1] || 1);

        const getSectionLabel = (section: string) => (
            `Sección ${ getSectionNumber(section) }`
        );

        const setNextSectionData = () => {
            const currentSectionHour: string|undefined = getSchedule();
            //We validate the hour
            if(!currentSectionHour) return { };
            const sections = getNextSections();
            //We validate the sections
            if(!sections || sections.length === 0) return { };
            //We extract the data of the first item (the actual next dosis)
            const [[nextSectionKey, nextSectionHour]] = sections;
            setNextSection({
                hour: nextSectionHour,
                section: getSectionLabel(nextSectionKey)
            });
        }

        //Execution
        setNextSectionData();
        
    }, [currentDosis]);


    return (
        <DeviceDataWidget 
            icon = 'clock'
            widgetTitle = { device.name }
        >
            <CurrentDosisContainer>
                <CurrentDosisLabel>Dosis actual</CurrentDosisLabel>
                <Pillbox 
                    activeSection = { currentDosis.section }
                />
            </CurrentDosisContainer>
            {
                currentDosis.status === CurrentDosisStatus.PENDING
                    ? <CompleteButton />
                    : null
            }
            <NextDosisContainer>
                <NextDosisRow>
                    <NextDosisLabel>Próxima dosis: </NextDosisLabel>
                    <NextDosisTimeLabel>{ nextSection?.hour }</NextDosisTimeLabel>
                </NextDosisRow>
                <NextDosisRow>
                    <NextDosisLabel>Próxima sección: </NextDosisLabel>
                    <NextDosisTimeLabel>{ nextSection?.section }</NextDosisTimeLabel>
                </NextDosisRow>
            </NextDosisContainer>
        </DeviceDataWidget>
    );
}

export default CurrentDosis;

//Internal components
const CompleteButton: React.FC = () => (
    <CurrentDosisCompleteButton
        icon = 'check'
        type = 'primary'
        color = '#fff'
        onPress = { () => { } }
        fontSize = { 17 }
        buttonText = 'Marcar como tomado'
    />
)

//Helpers
interface CurrentSectionEventData {
    section: string;
    status: CurrentDosisStatus;
    schedule: PillboxScheduleType;
}

export enum CurrentDosisStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
};

type PillboxScheduleType = {
    [key: string]: string;
}