import React, { useState, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
import Button, { ButtonTypes } from '../../../Shared/components/Layout/Buttons/Button';
import Divider from '../../../Shared/components/Layout/Divider/Divider';
import DateInput from '../../../Shared/components/Layout/Input/DateInput/DateInput';
import PasswordInput from '../../../Shared/components/Layout/Input/PasswordInput/PasswordInput';
import ImageSelector, { ImageSelectorOption } from '../../../Shared/components/Layout/Input/ImageSelector/ImageSelector';
//Styled components
import { RegisterInput, RegisterFormContainer } from './Register.styles';
//API
import { register } from '../../infrastructure/userAuthenticationApi';



const Register: React.FC = () => {
    /**
     * Hooks
     */
    //Navigation
    const navigation = useNavigation()
    //State
    const [userData, setUserData] = useState<UserData>(initialUserData);

    /**
     * Functions
     */
    const handleFieldChange = useCallback((field: string, text: string) => {
        setUserData({
            ...userData,
            [field]: text
        });
    }, [userData]);

    const handleUserTypeChange = useCallback((userType: string) => {
        setUserData({
            ...userData,
            type: userType,
        });
    }, [userData]);

    const submit = useCallback(async () => {
        try {
            const createdUser = await register(userData);
            /**
             * @todo Reemplazar por createNotification del hook de notificaciones
             */
            alert(`Felicidades ${createdUser.name} ${createdUser.lastName}, la cuenta se ha creado con éxito. Ya puede iniciar sesión`);
            navigation.navigate('Login');
        } catch(error) {
                        /**
             * @todo Reemplazar por createNotification del hook de notificaciones
             */
            alert(error.message);
        }
    }, [userData]);


    const isValid = useCallback(() => validateData(userData), [userData]);

    return (
        <RegisterScrollContainer>
            <RegisterFormContainer>
                <RegisterTitle>Crear cuenta</RegisterTitle>
                <FormLabel>Nombre: </FormLabel>
                <RegisterInput 
                    placeholder = 'Nombre'
                    onChangeText = { text => handleFieldChange('name', text) }
                />
                <FormLabel>Apellido: </FormLabel>
                <RegisterInput 
                    placeholder = 'Apellido'
                    onChangeText = { text => handleFieldChange('lastName', text) }
                />
                <FormLabel>Correo electrónico: </FormLabel>
                <RegisterInput 
                    placeholder = 'Correo electrónico'
                    onChangeText = { text => handleFieldChange('email', text) }
                />
                <FormLabel>Contraseña: </FormLabel>
                <PasswordInput 
                    placeholder = 'Contraseña'
                    onChangeText = { text => handleFieldChange('password', text) }
                />
                <FormLabel>Fecha de nacimiento: </FormLabel>
                <RegisterInput 
                    placeholder = 'Fecha de nacimiento'
                    onChangeText = { text => handleFieldChange('dateOfBirth', text) }
                />
                { /** @todo Terminar de implementar en mobile (en web no tiene soporte) <DateInput /> */ }
                <FormLabel>Tipo de usuario</FormLabel>
                <ImageSelector 
                    selected = { userData.type }
                    options = { userTypeOptions }
                    setSelected = { handleUserTypeChange }
                />
                <Divider />
                <SubmitButton 
                    submit = { submit }
                    validated = { isValid() }
                />
            </RegisterFormContainer>
        </RegisterScrollContainer>
    )
}

export default Register;


//Internal components
const RegisterScrollContainer: React.FC = ({ children }) => (
    <ScrollView
        style = {{
            flex: 1,
            padding: 15,
            backgroundColor: '#457b9d',
        }}
    >
     { children }
    </ScrollView>
);

const RegisterTitle: React.FC = ({ children }) => (
    <Label
        fontSize = '24px'
        fontWeight = '500'
        style = {{ alignSelf: 'center' }}
    >
        { children }
    </Label>
);

const FormLabel: React.FC = ({ children }) => (
    <Label 
        fontSize = '20px'
        fontWeight = '500'
        style = {{ marginTop: 10, marginBottom: 5 }}
    > 
    { children }
    </Label>
);

interface SubmitButtonProps {
    submit: () => void;
    validated: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    submit,
    validated
}) => (
    <Button
        type = { ButtonTypes.PRIMARY }
        width = '75%'
        margin = '20px'
        onPress = { submit }
        disabled = { !validated }
        accessibilityLabel = 'Register button'
    >
        Crear cuenta
    </Button>
)

//Internal helpers
interface UserData {
    name: string;
    type: string;
    email: string;
    password: string;
    lastName: string;
    dateOfBirth: string;
}

const initialUserData = {
    name: '',
    type: '',
    email: '',
    password: '',
    lastName: '',
    dateOfBirth: ''
}

//User type options
const userTypeOptions: ImageSelectorOption[] = [
    {
        value: 'PRIMARY',
        imageSource: require('../../../../assets/illustrations/pablo-816.png'),
        description: <>
            <Label fontWeight='500'>{ 'Principal\n' }</Label>
            <Label fontSize = { 17 }>Usuario de la tercera edad que puede vincular dispositivos</Label>
        </>
    },
    {
        value: 'SECONDARY',
        imageSource: require('../../../../assets/illustrations/pluto-180.png'),
        description: <>
            <Label fontWeight='500'>{ 'Suscriptor\n' }</Label>
            <Label fontSize = { 17 }>Puede suscribirse a la actividad de un usuario primario</Label>
        </>
    }
]

//Helper functions
const validateData = (userData: UserData) => (
    userData.name && 
    userData.email && 
    userData.type && 
    userData.password && 
    userData.lastName && 
    userData.dateOfBirth
) ? true : false;