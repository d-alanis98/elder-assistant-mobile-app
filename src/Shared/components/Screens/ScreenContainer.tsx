import React, { useContext, useEffect } from 'react';
import { ViewProps, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//Components
import Label from '../Layout/Labels/Label';
import Header from '../Header/Header';
import FadeIn from '../Layout/Animations/FadeIn/FadeIn';
//Styles
import containerStyles from '../../../../App.styles';
//Context
import CurrentScreenContext from './context/CurrentScreenContext';
//Hooks
import useCurrentScreen from '../Navigation/hooks/useCurrentScreen';

interface Props extends ViewProps {
    title?: string | React.ReactElement;
    style?: ViewStyle;
    animated?: boolean;
    headerComponent?: React.ReactElement | ((props: any) => React.ReactElement);
    containerStyle?: ViewStyle;
}

const ScreenContainer: React.FC<Props> = ({ 
    title,
    style = [],
    children,
    animated = true,
    headerComponent = <Header />,
    containerStyle,
}) => {
    /**
     * Hooks
     */
    //Current screen
    const currentScreen = useCurrentScreen();
    //Context consumer
    const { setCurrentScreen } = useContext(CurrentScreenContext);
    //Effects
    useEffect(() => {
        //We set the current screen at context level
        setCurrentScreen?.(currentScreen);
    }, [currentScreen]);

    return (
        <>
            { headerComponent }
            <ScrollView 
                style = {{
                    ...containerStyle,
                    flexGrow: 1 
                }}
                contentContainerStyle = {[
                    containerStyles.scrollContainer,
                    style
                ]}
            >
                { 
                    animated
                        ? (
                            <FadeIn>
                                <ScreenContent 
                                    title = { title }
                                    children = { children }
                                />
                            </FadeIn>
                        )
                        : (
                            <ScreenContent 
                                title = { title }
                                children = { children }
                            />
                        ) 
                }    
            </ScrollView>
        </>
    );
}
export default ScreenContainer;

//Internal components

interface ScreenTitleProps {
    title?: string | React.ReactElement;
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({ title }) => title 
    ?  typeof title === 'string'
        ? <Label style={{ textAlign: 'center'}}>{ title }</Label>
        : title
    : null;

const ScreenContent: React.FC<ScreenTitleProps> = ({ title, children }) => (
    <>
        <ScreenTitle 
            title = { title }
        />
        { children }
    </>
);
