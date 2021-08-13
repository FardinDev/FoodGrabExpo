import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './Screens/SplashScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import OTPScreen from './Screens/OTPScreen';

const RootStack = createStackNavigator();

const AuthRoot = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="OTPScreen" component={OTPScreen}/>
    </RootStack.Navigator>
);

export default AuthRoot;