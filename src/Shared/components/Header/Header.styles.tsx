import styled from 'styled-components/native';

//Size constants
export const HEADER_HEIGHT = 50;

//Styles
export const HeaderContainer = styled.View`${({ theme }) => `
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem 1rem;
    height: ${ HEADER_HEIGHT };
    background-color: ${ theme.secondaryColor };
`}`;

export const HeaderTitle = styled.Text`${({ theme }) => `
    color: ${ theme.secondaryFontColor };
    font-size: 1.25rem;
`}`;

const logoSize = HEADER_HEIGHT - 10;

export const HeaderLogo = styled.Image`
    height: ${ logoSize};
    width: ${ logoSize };
    margin-right: 0.25rem;
`;