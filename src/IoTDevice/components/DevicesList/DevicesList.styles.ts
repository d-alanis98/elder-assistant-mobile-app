import styled from 'styled-components/native';
import ButtonWithIcon from '../../../Shared/components/Layout/Buttons/ButtonWithIcon/ButtonWithIcon';
import TouchableIcon from '../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
//Theme
import { isDarkTheme } from '../../../Shared/components/Theme/constants/theme';

export const DevicesListContainer = styled.View`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    margin: 5px;
`;

export const LinkDeviceButton = styled(ButtonWithIcon)`
    margin: 20px 0px;
    align-self: flex-end;
`;

export const DevicesListItem = styled.TouchableOpacity`${({ theme }) => `
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: ${ isDarkTheme(theme) ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' };
    padding: 20px 10px;
    border-radius: 25px;
`}`;

export const DeviceName = styled.Text`${({ theme }) => `
    color: ${ theme.fontColor };
    font-size: 18px;
    flex-grow: 1;
    text-align: justify;
`}`;


export const DeviceSettings = styled(TouchableIcon).attrs(props => ({
    ...(props as Object),
    icon: 'cog',
    size: 24,
}))`
    width: 40px;
`;
