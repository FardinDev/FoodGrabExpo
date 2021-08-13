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

const SignInScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    PoppinsLight: require("../../../assets/fonts/Poppins-Light.ttf"),
  });
  const [isLoading, setIsloading] = React.useState(false);
  const [loginData, setLoginDaata] = React.useState({});
  const api = new Api();
  const validPhoneType = new RegExp("^(?:/\\+?88)?01[2-9]\\d{8}$");
  const loginViaApi = async (mobile, password) => {
    if (!validPhoneType.test(mobile)) {
      Alert.alert("Wrong Input!", "Phone number is not valid", [
        { text: "Okay" },
      ]);

      return;
    }

    if (mobile.length == 0 || password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Phone no. or password field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    }
    setIsloading(true);
    return await api
      .login({ phone: mobile, password: password })
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

          setIsloading(false);
          signIn([user]);
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
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: false,
    isValidPassword: false,
  });

  const { colors } = useTheme();

  const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length == 11) {
      setData({
        ...data,
        mobile: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        mobile: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length == 11) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  // const loginHandle = (userName, password) => {
  //   setIsloading(true);
  //   loginViaApi().then(() => {
  //     // console.log("====================================");
  //     // console.log(loginData);
  //     // console.log("====================================");
  //     // let user = { username: loginData.user.name, userToken: loginData.token };
  //     setIsloading(false);
  //     // signIn(user);
  //   });

  //   // if (userName.length == 0 || password.length == 0) {
  //   //   Alert.alert(
  //   //     "Wrong Input!",
  //   //     "Username or password field cannot be empty.",
  //   //     [{ text: "Okay" }]
  //   //   );
  //   //   return;
  //   // }

  //   // const foundUser = Users.filter((item) => {
  //   //     return userName == item.username && password == item.password;
  //   //   });

  //   // if (foundUser.length == 0) {
  //   //   Alert.alert("Invalid User!", "Username or password is incorrect.", [
  //   //     { text: "Okay" },
  //   //   ]);
  //   //   return;
  //   // }
  //   // signIn(foundUser);
  // };

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

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
            <Text style={styles.text_header}>Welcome!</Text>
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
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.isValidUser || data.mobile.length === 0 ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Phone no. must be 11 characters long.
                </Text>
              </Animatable.View>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  marginTop: 35,
                },
              ]}
            >
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color={colors.text} size={20} />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
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

            <TouchableOpacity>
              <Text style={{ color: COLORS.primary, marginTop: 15 }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                disabled={
                  isLoading || !(data.isValidUser && data.isValidPassword)
                }
                onPress={() => {
                  loginViaApi(data.mobile, data.password);
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
                    opacity: data.isValidUser && data.isValidPassword ? 1 : 0.5,
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
                      Sign In
                    </Text>
                  ) : (
                    <ActivityIndicator color={COLORS.white} size={"small"} />
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("SignUpScreen")}
                style={[
                  styles.signIn,
                  {
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: COLORS.primary,
                    },
                  ]}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;

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
