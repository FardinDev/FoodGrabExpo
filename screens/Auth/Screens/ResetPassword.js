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
import { COLORS } from "../../../constants";
import { useFonts } from "expo-font";
import { useTheme } from "@react-navigation/native";
import Api from "../../../api/api";
import { AuthContext } from "../../../components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResetPassword = ({ navigation }) => {
  const [isLoading, setIsloading] = React.useState(false);
  const [userPhone, setUserPhone] = React.useState('');

  const { colors } = useTheme();
  const api = new Api();
  const { signUp } = React.useContext(AuthContext);
  const validPhoneType = new RegExp("^(?:/\\+?88)?01[2-9]\\d{8}$");

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You did not reset the password. You will not be able to login. Are you sure you want to leave the page?',
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

  const resetPassword = async (password, confirm_password) => {


    if (confirm_password != password) {
      Alert.alert("Wrong Input!", "PassWord did not matched", [
        { text: "Okay" },
      ]);

      return;
    }


    setIsloading(true);

    return await api
      .resetPassword({ phone: userPhone, password: password, password_confirmation: confirm_password })
      .then((resData) => {
        // setLoginDaata();
        console.log("====================================");
        console.log(resData.data);
        console.log("====================================");
        if (resData.data.code !== 200) {
          Alert.alert("Error!", resData.data.message, [{ text: "Okay" }]);

          setIsloading(false);

        } else {


          setData({
            ...data,
            password: "",
            confirm_password: "",
            securePasswordEntry: true,
            secureConfirmPasswordEntry: true,
            isValidPassword: false,
            isValidConfirmPassword: false,
          });
          Alert.alert(
            'Successfull!',
            resData.data.message,
            [
              { text: "Go to login",  onPress: () => navigation.push('SignInScreen') },
              
            ]
          );
          
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

    password: "",
    confirm_password: "",
    securePasswordEntry: true,
    secureConfirmPasswordEntry: true,
    isValidPassword: false,
    isValidConfirmPassword: false,
 
  });




  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      
      setData({
        ...data,
        password: val,
        confirm_password: '',
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        confirm_password: '',
        isValidPassword: false,
      });
    }
  };

  const handleConfirmPasswordChange = (val) => {
    if (val.trim().length >= 8 && val.trim() == data.password) {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: false,
      });
    }
  };



  const updateSecureTextEntry = () => {
    setData({
      ...data,
      securePasswordEntry: !data.securePasswordEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      secureConfirmPasswordEntry: !data.secureConfirmPasswordEntry,
    });
  };

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
            <Text style={styles.text_header}>Reset Password</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
              


              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 10,
                  },
                ]}
              >
               New Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />
                <TextInput
                  placeholder="Set New Password"
                  secureTextEntry={data.securePasswordEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={data.password}
                  onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.securePasswordEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>

              {data.isValidPassword || data.password.length === 0 ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Password must be 8 characters long.
                  </Text>
                </Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 20,
                  },
                ]}
              >
               Confirm Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />
                <TextInput
                  placeholder="Confirm New Password"
                  secureTextEntry={data.secureConfirmPasswordEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={data.confirm_password}
                  onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                  {data.secureConfirmPasswordEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>

              {data.isValidConfirmPassword || data.confirm_password.length === 0 ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                   Password did not matched!
                  </Text>
                </Animatable.View>
              )}

              
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  disabled={
                    isLoading ||
                    !(
    
                      data.isValidPassword &&
                      data.isValidConfirmPassword
                    )
                  }
                  onPress={() =>
                    resetPassword(data.password, data.confirm_password)
                  }
                >
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.primary]}
                    style={{
                      width: "100%",
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      opacity:
                        data.isValidPassword &&
                        data.isValidConfirmPassword
                          ? 1
                          : 0.5,
                    }}
                  >
                    {!isLoading ? (
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: "#fff",
                          },
                        ]}
                      >
                        Reset
                      </Text>
                    ) : (
                      <ActivityIndicator color={COLORS.white} size={"small"} />
                    )}
                  </LinearGradient>
                </TouchableOpacity>

              
              </View>
            </ScrollView>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;

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
});
