import React, { useCallback, useState } from 'react';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
import Button, { ButtonTypes } from '../../../Shared/components/Layout/Buttons/Button';
//Actions
import { loginAction } from '../../../Shared/store/reducers/userDuck';
//Custom hooks
import { useAppDispatch } from '../../../Shared/store/hooks';
//Styled components
import { LoginContainer, LoginFormContainer, LoginIllustration, LoginInput } from './Login.styles';

const Login: React.FC = () => {
    //Hooks
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //State
    const [credentials, setCredentials] = useState<Credentials>(initialCredentials);

    const submit = useCallback(() => {
        console.log('Submitting')
        dispatch(loginAction(credentials));
    }, [credentials]);

    const handleFieldChange = useCallback((field: string, text: string) => {
        setCredentials({
            ...credentials,
            [field]: text
        });
    }, [credentials]);

    return (
        <LoginContainer>
            <LoginFormContainer>
                <Label>Login</Label>

                <FormLabel>Email: </FormLabel>
                <LoginInput 
                    placeholder = 'Email'
                    onChangeText = { text => handleFieldChange('email', text) }
                />
                <FormLabel>Password: </FormLabel>
                <LoginInput 
                    placeholder = 'Contraseña'
                    onChangeText = { text => handleFieldChange('password', text) }
                    secureTextEntry = { true }
                />
                <FormSubmitButton 
                    submit = { submit }
                    credentials = { credentials }
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
const FormLabel: React.FC = ({ children }) => (
    <Label 
        fontSize = '22px'
        fontWeight = 'bold'
        style = {{ marginTop: 20, marginBottom: 10 }}
    > 
    { children }
    </Label>
);

interface SubmitButtonProps {
    submit: () => void;
    credentials: Credentials;
}

const FormSubmitButton: React.FC<SubmitButtonProps> = ({ 
    submit,
    credentials
}) => (
    <Button 
        type = { ButtonTypes.PRIMARY }
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