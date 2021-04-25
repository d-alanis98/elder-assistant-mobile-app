import styled from 'styled-components/native';

//Size constants
export const NAVIGATION_BAR_HEIGHT = 60;

export const NavigationContainer = styled.View`${({ theme }) => `
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: ${NAVIGATION_BAR_HEIGHT}px;
    flex: 1;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    padding: 0.5rem;
    background-color: ${ theme.backgroundColor }
`}`;

