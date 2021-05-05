import styled from 'styled-components/native';
import MapView from 'react-native-maps';


//Constants
const DEFAULT_HEIGHT = '350px';
const DEFAULT_WIDTH = '100%';

interface MapContainerProps {
    width?: number | string;
    height?: number | string;
}

export const MapContainer = styled.View<MapContainerProps>`${({
    width,
    height
}) => `
    display: flex;
    width: ${ getDimension(width, DEFAULT_WIDTH) };
    height: ${ getDimension(height, DEFAULT_HEIGHT) };
    align-items: center;
    justify-content: center;
    padding: 10px;
`}`;

export const StyledMap = styled(MapView)`
    width: 100%;
    height: 100%;
`;

//Helpers

const getDimension = (dimension?: string | number, defaultValue?: number | string) => {
    if(!dimension)
        return defaultValue || DEFAULT_WIDTH;
    return typeof dimension === 'string'
        ? dimension
        : `${ dimension }px`;
} 