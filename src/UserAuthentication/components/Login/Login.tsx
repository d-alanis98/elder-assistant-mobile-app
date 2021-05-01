import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
import Button from '../../../Shared/components/Layout/Buttons/Button';
import Divider from '../../../Shared/components/Layout/Divider/Divider';
import PasswordInput from '../../../Shared/components/Layout/Input/PasswordInput/PasswordInput';
//Actions
import { loginAction } from '../../../Shared/store/reducers/userDuck';
//Hooks
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../Shared/store/hooks';
//Styled components
import { LoginContainer, LoginFormContainer, LoginIllustration, LoginInput } from './Login.styles';
//Styles
import { lightTheme } from '../../../Shared/components/Theme/constants/theme';

const Login: React.FC = () => {
    //Hooks
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //Navigation
    const navigation = useNavigation();
    //State
    const [credentials, setCredentials] = useState<Credentials>(initialCredentials);

    const submit = useCallback(() => {
        dispatch(loginAction(credentials));
    }, [credentials]);

    const handleFieldChange = useCallback((field: string, text: string) => {
        setCredentials({
            ...credentials,
            [field]: text
        });
    }, [credentials]);

    const navigateToRegister = useCallback(() => {
        navigation.navigate('Register');
    }, [navigation]);

    return (
        <LoginContainer>
            <LoginFormContainer>
                <LoginTitle>Iniciar sesión</LoginTitle>

                <FormLabel>Correo electrónico: </FormLabel>
                <LoginInput 
                    placeholder = 'Correo electrónico'
                    onChangeText = { text => handleFieldChange('email', text) }
                />
                <FormLabel>Contraseña: </FormLabel>
                <PasswordInput 
                    placeholder = 'Contraseña'
                    onChangeText = { text => handleFieldChange('password', text) }
                />
                <FormSubmitButton 
                    submit = { submit }
                    credentials = { credentials }
                />
                <Divider />
                <RegisterLink 
                    navigateToRegister = { navigateToRegister }
                />
            </LoginFormContainer>
            <LoginIllustration 
                source = { require('../../../../assets/illustrations/pablo-816.png') }
            />
        </LoginContainer>
    )
}

export default Login;

//Internal components

const LoginTitle: React.FC = ({ children }) => (
    <Label
        fontSize = { 24 }
        fontWeight = '500'
        style = {{ alignSelf: 'center' }}
    >
        { children }
    </Label>
)

const FormLabel: React.FC = ({ children }) => (
    <Label 
        fontSize = { 20 }
        fontWeight = '500'
        style = {{ marginTop: 20, marginBottom: 10 }}
    > 
    { children }
    </Label>
);

interface RegisterLinkProps {
    navigateToRegister: () => void;
}

const RegisterLink: React.FC<RegisterLinkProps> = ({ navigateToRegister }) => (
    <Label
        style = {{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        ¿No tienes cuenta? 
        <TouchableOpacity
            onPress = { navigateToRegister }
        >
        <Label
            color = { lightTheme.primaryColor }
            fontWeight = '500'
            margin = '0 5px'
        >
            Crear una
        </Label>
        </TouchableOpacity>
    </Label>
    
)

interface SubmitButtonProps {
    submit: () => void;
    credentials: Credentials;
}

const FormSubmitButton: React.FC<SubmitButtonProps> = ({ 
    submit,
    credentials
}) => (
    <Button 
        type = 'primary'
        width = '75%'
        margin = '20px'
        onPress = { submit }
        disabled = { !credentials.email || !credentials.password }
        accessibilityLabel = 'Enviar formulario de login'
    >
        Enviar
    </Button>
);

//Helpers

interface Credentials {
    email: string;
    password: string;
}

const initialCredentials = { email: '', password: ''};