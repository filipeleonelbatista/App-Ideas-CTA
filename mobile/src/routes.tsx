import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import List from './pages/List';
import AddEvent from './pages/AddEvent';

const { Navigator, Screen} = createStackNavigator();

function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false }}>
                <Screen name="List" component={List} />
                <Screen name="AddEvent" component={AddEvent} />
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;