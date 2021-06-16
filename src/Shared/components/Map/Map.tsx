import React from 'react';
import { Marker } from 'react-native-maps';
//Components
import Avatar from '../../../User/components/Layout/Avatar/Avatar';
//Styled components
import { MapContainer, StyledMap } from './Map.styles';


interface MapProps {
    lat: number;
    lon: number;
    delta?: number;
    width?: number | string;
    height?: number | string;
    zoomEnabled?: boolean;
    scrollEnabled?: boolean;
}
const Map: React.FC<MapProps> = ({
    lat,
    lon,
    delta,
    width,
    height,
    zoomEnabled = false,
    scrollEnabled = false
}) => {
    //Constants
    const DEFUALT_DELTA = 0.0035;

    //Render
    return (
        <MapContainer
            width = { width }
            height = { height }
        >
            <StyledMap 
                zoomEnabled = { zoomEnabled }
                scrollEnabled =  { scrollEnabled }
                initialRegion = {{
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: delta || DEFUALT_DELTA,
                    longitudeDelta: delta || DEFUALT_DELTA,
                }}
            >
                <Marker 
                    coordinate = {{
                        latitude: lat,
                        longitude: lon
                    }}
                />
            </StyledMap>
        </MapContainer>
    );
}

export default Map;