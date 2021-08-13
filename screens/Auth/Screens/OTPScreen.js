import React, {useEffect} from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import { COLORS, FONTS } from "../../../constants";
import { useFonts } from "expo-font";
import { useTheme } from "@react-navigation/native";
import Api from "../../../api/api";
import { AuthContext } from "../../../components/context";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTPScreen = ({ route, navigation }) => {
  const [isLoading, setIsloading] = React.useState(false);
  const { colors } = useTheme();
  const api = new Api();
  const { signIn } = React.useContext(AuthContext);
  const validPhoneType = new RegExp("^(?:/\\+?88)?01[2-9]\\d{8}$");

  const [userPhone, setUserPhone] = React.useState('');

  const [perviousPage, setperviousPage] = React.useState(null);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You did not verified the OTP. You will not be able to login. Are you sure you want to leave the page?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => {} },
            {
              text: 'Yes leave',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation]
  );

  useEffect(() => {
    let { type } = route.params;
    setperviousPage(type);
        
    setTimeout(async () => {
      // setIsLoading(false);
    
      try {
        const phone = await AsyncStorage.getItem("userPhone");

        setUserPhone(String(phone));
        
      } catch (e) {
        console.log(e);
      }
      console.log(phone);
      dispatch({ type: "RETRIEVE_USERPHONE", phone: phone });
    }, 1000);
  }, []);



  const verifyOTP = async (code) => {
   
    setIsloading(true);

    return await api
      .verify({ phone: userPhone, otp: code })
      .then((resData) => {
        // setLoginDaata();
        
        if (resData.data.code !== 200) {
          Alert.alert("Error!", resData.data.message, [{ text: "Okay" }]);

          setIsloading(false);
        } else {
          let user = {
            userName: resData.data.data.user.name,
            userToken: resData.data.data.access_token,
            userImage: resData.data.data.user.avatar,
          };

          // setIsloading(false);

          console.log('====================================');
          console.log(perviousPage);
          console.log('====================================');
          if (perviousPage == 'register') {
            signIn([user]);
          }else if(perviousPage == 'forget'){
            navigation.navigate('ResetPassword');
          }
        }
      })
      .then(() => setIsloading(false))
      .catch((error) => {
        setIsloading(false);
        Alert.alert(
          "Error!",
          "Something Went Wrong. Please Try after some time",
          [{ text: "Okay" }]
        );
      });
  };

  const [data, setData] = React.useState({
    name: "",
    mobile: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidName: false,
    isValidPassword: false,
    isValidMobile: false,
  });

if (userPhone == '') {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  
}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={COLORS.primary}
            barStyle="light-content"
          />
          <View style={styles.header}>
            <Text style={styles.text_header}>Verify your OTP</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>

            {!isLoading ? 
            
            <OTPInputView
              style={{width: '60%', height: 200, color: COLORS.black}}
              pinCount={4}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled = {(code) => {
                verifyOTP(code)
              }}
            />
            
            :
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="small" />
            </View>
            
            }

          <Text
          style={{
            ...FONTS.h3,
            textAlign: 'center'
          }}
          >
            
            Please Verify the OTP code sent to your given mobile number: {userPhone}


          </Text>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    fontFamily: "PoppinsLight",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
    fontFamily: "PoppinsLight",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
    fontFamily: "PoppinsLight",
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    fontFamily: "PoppinsLight",
    alignItems: 'center'
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "PoppinsLight",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    fontFamily: "PoppinsLight",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray1,
    paddingBottom: 5,
    fontFamily: "PoppinsLight",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontFamily: "PoppinsLight",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
    fontFamily: "PoppinsLight",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    fontFamily: "PoppinsLight",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "PoppinsLight",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    fontFamily: "PoppinsLight",
  },
  color_textPrivate: {
    color: "grey",
    fontFamily: "PoppinsLight",
  },
  borderStyleBase: {
    width: 40,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: COLORS.primary,
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: COLORS.primary
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.primary,
  },
});
