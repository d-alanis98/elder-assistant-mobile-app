import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//COmponents
import Label from '../../Labels/Label';
//Styled components
import { DateInputContainer } from './DateInput.styles';
//Icon
import { FontAwesome5 } from '@expo/vector-icons'; 

const DateInput: React.FC = () => {
    const [value, setValue] = useState();
    const [showDateInput, setShowInput] = useState(false);
    return (
        <>
            <DateInputContainer
                onPress = { () => setShowInput(prevState => !prevState) }
            >
                <DateValue 
                    value = { value }
                />
            </DateInputContainer>
            {
                showDateInput &&
                    <DateTimePicker 
                        value = { value || new Date() }
                        display = 'default'

                    />
            }
        </>
    );
}

export default DateInput;


interface DateValueProps {
    value?: Date;
}

const DateValue: React.FC<DateValueProps> = ({ value }) => value
    ? <Label>{ value.toString() }</Label>
    : <SelectDateLabel />;


const SelectDateLabel = () => (
    <View
        style = {{ 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}
    >
        <FontAwesome5 
            name = 'calendar'
            size = { 20 }
        />
        <Label
            style = {{ marginLeft: 10 }}
        >
            Seleccionar fecha
        </Label>
    </View>
)