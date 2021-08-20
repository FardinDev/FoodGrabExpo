import React from "react";
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

const SignInScreen = ({ navigation }) => {
  const [isLoading, setIsloading] = React.useState(false);
  const { colors } = useTheme();
  const api = new Api();
  const { signUp } = React.useContext(AuthContext);
  const validPhoneType = new RegExp("^(?:/\\+?88)?01[2-9]\\d{8}$");
  const signUpViaApi = async (name, mobile, password) => {
    if (!validPhoneType.test(mobile)) {
      Alert.alert("Wrong Input!", "Phone number is not valid", [
        { text: "Okay" },
      ]);

      return;
    }

    if (name.length == 0 || mobile.length == 0 || password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Name, Phone no. or password field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    }
    setIsloading(true);

    return await api
      .register({ name: name, phone: mobile, password: password })
      .then((resData) => {
        // setLoginDaata();
        console.log("====================================");
        console.log(resData.data);
        console.log("====================================");
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
          navigation.navigate('OTPScreen', {type: 'register'})
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

  const mobileInputChange = (val) => {
    if (val.trim().length == 11) {
      setData({
        ...data,
        mobile: val,
        check_textInputChange: true,
        isValidMobile: true,
      });
    } else {
      setData({
        ...data,
        mobile: val,
        check_textInputChange: false,
        isValidMobile: false,
      });
    }
  };

  const textInputChange = (val) => {

    if(/^[\.a-zA-Z ]*$/.test(val)){

      if (val.trim().length >= 4) {
        setData({
          ...data,
          name: val,
          check_textInputChange: true,
          isValidName: true,
        });
      } else {
        setData({
          ...data,
          name: val,
          check_textInputChange: false,
          isValidName: false,
        });
      }
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

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const handleValidName = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidName: true,
      });
    } else {
      setData({
        ...data,
        isValidName: false,
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
            <Text style={styles.text_header}>Register Now!</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
              <Text style={styles.text_footer}>Name</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Enter Your Name"
                  style={styles.textInput}
                  autoCapitalize="words"
                  value={data.name}
                  onChangeText={(val) => textInputChange(val)}
                  onEndEditing={(e) => handleValidName(e.nativeEvent.text)}
                />
              </View>
              {data.isValidName || data.name.length === 0 ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Name must be at least 4 characters long.
                  </Text>
                </Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 10,
                  },
                ]}
              >
                Phone No.
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

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 10,
                  },
                ]}
              >
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />
                <TextInput
                  placeholder="Set Password"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.textInput}
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

              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                  By signing up you agree to our
                </Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                >
                  {" "}
                  Terms of service
                </Text>
                <Text style={styles.color_textPrivate}> and</Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                >
                  {" "}
                  Privacy policy
                </Text>
              </View>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  disabled={
                    isLoading ||
                    !(
                      data.isValidName &&
                      data.isValidPassword &&
                      data.isValidMobile
                    )
                  }
                  onPress={() =>
                    signUpViaApi(data.name, data.mobile, data.password)
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
                        data.isValidName &&
                        data.isValidPassword &&
                        data.isValidMobile
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
                        Sign Up
                      </Text>
                    ) : (
                      <ActivityIndicator color={COLORS.white} size={"small"} />
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.goBack()}
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
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

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
