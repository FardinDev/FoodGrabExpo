import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "@react-navigation/native";

import { AuthContext } from "../../../components/context";
import Users from "../../../model/users";
import { COLORS, SIZES } from "../../../constants";

import Api from "../../../api/api";
import { useFonts } from "expo-font";

const ForgetPassword = ({ navigation }) => {
  const [loaded] = useFonts({
    PoppinsLight: require("../../../assets/fonts/Poppins-Light.ttf"),
  });
  const [isLoading, setIsloading] = React.useState(false);
  const [loginData, setLoginDaata] = React.useState({});
  const api = new Api();
  const validPhoneType = new RegExp("^(?:/\\+?88)?01[2-9]\\d{8}$");
  const getOTP = async (mobile) => {

    if (!validPhoneType.test(mobile)) {
      Alert.alert("Wrong Input!", "Phone number is not valid", [
        { text: "Okay" },
      ]);

      return;
    }


    console.log('====================================');
    console.log(mobile);
    console.log('====================================');
   
    setIsloading(true);
    return await api
      .getOtp({ phone: mobile })
      .then((resData) => {
        // setLoginDaata();

        if (resData.data.code !== 200) {
          Alert.alert("Error!", resData.data.message, [{ text: "Okay" }]);

          setIsloading(false);
        } else {
          let user = {
            userName: resData.data.data.user.name,
            userPhone: resData.data.data.user.phone,
          };

          setIsloading(false);
          signUp([user]);
          navigation.navigate('OTPScreen', {type: 'forget'})
        }
      })
      .then(() => setIsloading(false))
      .catch((error) => {
        setIsloading(false);

        console.log('====================================');
        console.log(error);
        console.log('====================================');
        Alert.alert(
          "Error!",
          "Something Went Wrong. Please Try after some time",
          [{ text: "Okay" }]
        );
      });
  };

  const [data, setData] = React.useState({
    mobile: "",
    password: "",
    check_mobileInputChange: false,
    secureTextEntry: true,
    isValidMobile: false,
    isValidPassword: false,
  });

  const { colors } = useTheme();

  const { signUp } = React.useContext(AuthContext);

  const mobileInputChange = (val) => {
    if (val.trim().length == 11) {
      setData({
        ...data,
        mobile: val,
        check_mobileInputChange: true,
        isValidMobile: true,
      });
    } else {
      setData({
        ...data,
        mobile: val,
        check_mobileInputChange: false,
        isValidMobile: false,
      });
    }
  };




  const handleValidMobile = (val) => {
    if (val.trim().length == 11) {
      setData({
        ...data,
        isValidMobile: true,
      });
    } else {
      setData({
        ...data,
        isValidMobile: false,
      });
    }
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <StatusBar
            backgroundColor={COLORS.primary}
            barStyle="light-content"
          />
          <View style={styles.header}>
            <Text style={styles.text_header}>Verify your phone number</Text>
          </View>
          <Animatable.View
            animation="fadeInUpBig"
            style={[
              styles.footer,
              {
                backgroundColor: colors.background,
              },
            ]}
          >
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                },
              ]}
            >
              Phone no.
            </Text>
            <View style={styles.action}>
              <Octicons name="device-mobile" color={colors.text} size={20} />
              <TextInput
                placeholder="Phone no."
                keyboardType="numeric"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => mobileInputChange(val)}
                onEndEditing={(e) => handleValidMobile(e.nativeEvent.text)}
              />
             
            </View>
            {data.isValidMobile || data.mobile.length === 0 ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Phone no. must be 11 characters long.
                </Text>
              </Animatable.View>
            )}

            
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                disabled={
                  isLoading || !(data.isValidMobile)
                }
                onPress={() => {
                  getOTP(data.mobile);
                }}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primary]}
                  style={{
                    width: "100%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    opacity: data.isValidMobile  ? 1 : 0.5,
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
                      Get OTP
                    </Text>
                  ) : (
                    <ActivityIndicator color={COLORS.white} size={"small"} />
                  )}
                </LinearGradient>
              </TouchableOpacity>

            
            </View>
          </Animatable.View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
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
    flex: 3,
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
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
    fontFamily: "PoppinsLight",
  },

  textInput: {
    flex: 1,
    textAlignVertical: "bottom",
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 12,
    color: "#05375a",
    fontFamily: "PoppinsLight",
    // borderBottomWidth: 0.5,
    // borderBottomColor: COLORS.gray,
    // borderBottomStartRadius: 100
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
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
});
