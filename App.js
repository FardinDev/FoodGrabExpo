import React, { useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CustomDrawer from "./navigation/CustomDrawer";
import AuthRoot from "./screens/Auth/AuthRoot";
import { Details, Help, CartTab } from "./screens";
import { View, ActivityIndicator } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./stores/rootReducer";
import { AuthContext } from "./components/context";
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();


const store = createStore(rootReducer, applyMiddleware(thunk));

const App = ({navigation}) => {

 
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    userPhone: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_USERNAME":
        return {
          ...prevState,
          userName: action.name,
          isLoading: false,
        };
      case "RETRIEVE_USERPHONE":
        return {
          ...prevState,
          userPhone: action.phone,
          isLoading: false,
        };
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userPhone: action.phone,
          isLoading: false,
        };
    }
  };


  const [loaded] = useFonts({
       
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBlack: require('./assets/fonts/Poppins-Black.ttf'),
    PoppinsLight: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsThin: require('./assets/fonts/Poppins-Thin.ttf'),
    PoppinsExtraLight: require('./assets/fonts/Poppins-ExtraLight.ttf'),
  });

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].userName;
        const userImage = foundUser[0].userImage;

        try {
        //   await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.multiSet([['userToken', userToken], ['userName', userName], ['userImage', userImage]], () => {
            //to do something
            console.log('done');
        });
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          let keys = ['userToken', 'userLocation']
          await AsyncStorage.multiRemove(keys);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: async (foundUser) => {


        const userName = foundUser[0].userName;
        const userPhone = foundUser[0].userPhone;

        try {
        //   await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.multiSet([ ['userName', userName], ['userPhone', userPhone]], () => {
            //to do something
            console.log('done');
        });
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({ type: "REGISTER", id: userName, phone: userPhone });
      }
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }
  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }


  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName={"Home"}
            >
              <Stack.Screen name="Home" component={CustomDrawer} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen name="Help" component={Help} />
              <Stack.Screen name="Cart" component={CartTab} />
            </Stack.Navigator>
          ) : (
            <AuthRoot />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
