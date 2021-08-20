import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { Modalize } from "react-native-modalize";
import { StackActions } from "@react-navigation/native";
import { connect } from "react-redux";
import Api from "../../api/api";
import { IconButton } from "../../components";
import CartCard from "../../components/CartCard";
import ItemCard from "../../components/ItemCard";
import LocationList from "../../components/LocationList";
import { COLORS, FONTS, icons, images, SIZES } from "../../constants";

const Checkout = ({ cartItems, total, restaurantId, navigation }) => {
  const [isLoading, setIsloading] = React.useState(false);
  const [cartValues, setCartValues] = React.useState({});
  const [userCurrentLocation, setUserCurrentLocation] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [addressError, setAddressError] = React.useState(false);
  const api = new Api();
  const locationModalRef = useRef(false);

  const locationModalOpen = () => {
    locationModalRef.current?.open();
  };

  React.useEffect(() => {
    if (total > 0) {
      setIsloading(true);
      getValues(total).then((data) => {
        setCartValues(data.data);
        setIsloading(false);
      });
    }
  }, [total, userCurrentLocation]);

  const onCloseAction = async (location) => {
    await AsyncStorage.setItem("userLocation", location);
    setUserCurrentLocation(location);
    locationModalRef.current?.close();
  };

  const onChangeAddress = (text) => {

    
    if(/^[\.a-zA-Z0-9,!? ]*$/.test(text)){

      setAddress(text);
    }
   
    if (address.length < 10) {
      setAddressError(true);
    } else {
      setAddressError(false);
    }
  };

  const placeOrder = () => {
    if (address.length < 10) {
      alert("Please Enter Your Address");
      setAddressError(true);
    }
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          padding: SIZES.padding,
          height: 50,
          alignItems: "center",
        }}
      >
        <Text style={{ ...FONTS.h2, color: COLORS.darkGray }}>
          Select Delivery Location
        </Text>
      </View>
    );
  };
  const getValues = async (total) => {
    // let location = await AsyncStorage.getItem('userLocation');
    const userLocation = await AsyncStorage.getItem("userLocation");
    const userName = await AsyncStorage.getItem("userName");
    setUserCurrentLocation(userLocation);
    setUserName(userName);
    const api_token = await AsyncStorage.getItem("userToken");

    let data = {
      restaurant_id: restaurantId,
      amount: total,
      location: userLocation,
    };

    api.api_token = api_token;
    return await api
      .getValues(data)
      .then((resData) => {
        if (resData.data.code !== 200) {
          Alert.alert("Error!", resData.data.message, [{ text: "Okay" }]);
          return null;
        }

        return resData.data;
      })

      .catch((error) => {
        Alert.alert(
          "Error!",
          "Something Went Wrong. Please Try after some time",
          [{ text: "Okay" }]
        );
        return null;
      });
  };

  const renderDeliveryTo = () => {
    return (
      <View
        style={{
          flexDirection: "column",
    
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
          ...style.shadow
          
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: SIZES.padding,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              flex: 1,
              color: COLORS.primary,
              ...FONTS.body3,
              textAlignVertical: "center",
            }}
          >
            CUSTOMER
          </Text>

          
            <Text style={{ ...FONTS.h3 }}>{userName}</Text>
            
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: SIZES.padding,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              flex: 1,
              color: COLORS.primary,
              ...FONTS.body3,
              textAlignVertical: "center",
            }}
          >
            DELIVERY TO
          </Text>

          <TouchableOpacity
            style={{
              flex: 3,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
            onPress={() => {
              locationModalOpen();
            }}
          >
            <Text style={{ ...FONTS.h3 }}>{userCurrentLocation}</Text>
            <Image
              source={icons.down_arrow}
              style={{
                marginLeft: SIZES.base,
                height: 20,
                width: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "column",
            marginTop: SIZES.padding,
            justifyContent: "space-between",
          
          }}
        >
          <TextInput
            value={address}
            onChangeText={onChangeAddress}
            mode={"outlined"}
            label={"Address"}
            placeholder={"Enter Address (In Detail)"}
            multiline={true}
            error={addressError}
            outlineColor={COLORS.gray}
            underlineColor={COLORS.primary}
            theme={{
              colors: {
                primary: COLORS.darkGray2,
                underlineColor: "transparent",
                error: "red",
              },
            }}
            style={{
              width: "100%",
              
              backgroundColor: COLORS.white,
              color: COLORS.primary,
            }}
          />
          
          <HelperText
            type="error"
            style={{
              color: "red",
            }}
            visible={addressError}
          >
            Please Enter Your Full Address
          </HelperText>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            // marginTop: SIZES.padding,
            marginBottom: SIZES.padding,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              flex: 1,
              color: COLORS.primary,
              ...FONTS.body3,
              textAlignVertical: "center",
            }}
          >
            Payment Method
          </Text>

          
            <Text style={{ ...FONTS.h3 }}>Cash on Delivey (COD)</Text>
            
        </View>
      </View>
    );
  }

  const renderCheckoutHeader = () => {
    return (
      <View
        style={{
          height: Platform.OS === "ios" ? 90 : 60,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
          ...style.shadow
         
        }}
      >
  

        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.white2,
          }}
        />


        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: Platform.OS === "ios" ? "flex-end" : "center",
            paddingBottom: Platform.OS === "ios" ? 20 : 15,
            paddingTop: Platform.OS === "ios" ? 0 : 20,
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
          >
            Checkout
          </Text>
        </View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,
            borderColor: COLORS.primary,
            borderWidth: 1,
            backgroundColor: COLORS.transparent,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
   
      </View>
    );
  }

  const renderFlatListHeader = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{
          marginBottom: Platform.OS === "ios" ? 20 : 20,
        }}
      >
        {renderDeliveryTo()}
      <View
      style={{
        height: 30,
        backgroundColor: COLORS.lightGray1,
        justifyContent: 'center'
      }}
      >
<Text 
style={{
  textAlign: 'center',
  ...FONTS.h3,
  color: COLORS.darkGray
}}
>Order Details</Text>
      </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    );
  };

  const renderFlatListFooter = () => {
    return (
      <View
      style={{
        borderTopColor: COLORS.lightGray1,
        borderTopWidth: 1,
        backgroundColor: COLORS.white,
        flex: 1,
        flexDirection: "column",
        padding: SIZES.padding,
        marginVertical: SIZES.padding,
        marginBottom: 200,
        justifyContent: "flex-end",
        ...style.shadow
       
    
        
       
      }}
    >
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={"small"} color={COLORS.gray} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", marginVertical: 2 }}>
            <View style={{ flex: 4 }}>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "left",
                  color: COLORS.darkGray,
                }}
              >
                Subtotal
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "center",
                  color: COLORS.darkGray,
                }}
              >
                {total} Tk
              </Text>
            </View>
          </View>

          {cartValues?.discount ? (
            <View style={{ flexDirection: "row", marginVertical: 2 }}>
              <View style={{ flex: 4 }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    textAlign: "left",
                    color: COLORS.darkGray,
                  }}
                >
                  Discount
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                    textAlign: "center",
                    color: COLORS.primary,
                  }}
                >
                  {cartValues?.discount_label || 0}
                </Text>
              </View>
            </View>
          ) : null}

          <View style={{ flexDirection: "row", marginVertical: 2 }}>
            <View style={{ flex: 4 }}>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "left",
                  color: COLORS.darkGray,
                }}
              >
                Delivery Charge
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "center",
                  color: COLORS.darkGray,
                }}
              >
                {cartValues?.delivery_charge || 0} Tk
              </Text>
            </View>
          </View>
          <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                borderBottomColor: COLORS.lightGray1,
                borderBottomWidth: 1,
              }}
            ></View>
       
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 5,
            }}
          >
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text
                style={{
                  ...FONTS.body2,
                  textAlign: "left",
                  color: COLORS.darkGray,
                  textAlignVertical: "center",
                }}
              >
                Total
              </Text>
            </View>

            {cartValues?.discount ? (
                <View
                  style={{
                    flex: 2,
                    borderColor: COLORS.green,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                      ...FONTS.body23,
                      textAlign: "center",
                      textAlignVertical: "bottom",
                      color: COLORS.gray,
                    }}
                  >
                    {total + cartValues?.delivery_charge} Tk
                  </Text>

                  <Text
                    style={{
                      ...FONTS.body2,
                      textAlign: "center",
                      color: COLORS.green,
                    }}
                  >
                    {cartValues.total} Tk
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flex: 2,
                    borderColor: COLORS.green,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.body2,
                      textAlign: "center",
                      color: COLORS.green,
                    }}
                  >
                    {total + cartValues?.delivery_charge} Tk
                  </Text>
                </View>
              )}


          </View>


        </View>
      )}

      
    </View>
    );
  };

  const renderCheckoutFooter = () => {
    return (
      <View
        style={{
          borderTopColor: COLORS.lightGray1,
          borderTopWidth: 1,
          backgroundColor: COLORS.white,
          flex: 1,
          flexDirection: "column",
          paddingHorizontal: SIZES.padding,
          // marginVertical: SIZES.padding,
          justifyContent: "flex-end",
          position: "absolute",
          bottom: Platform.OS === 'ios' ? 20 : 0,
          left: 0,
          right: 0,
          paddingTop: 2,
        }}
      >
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size={"small"} color={COLORS.gray} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            

         
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 5,
              }}
            >
              <View style={{ flex: 3, justifyContent: "center" }}>
                <Text
                  style={{
                    ...FONTS.body2,
                    textAlign: "left",
                    color: COLORS.darkGray,
                    textAlignVertical: "center",
                  }}
                >
                  Total Amount
                </Text>
              </View>

              <View
                style={{
                  flex: 2,
                  
                }}
              >
                <Text
                  style={{
                    ...FONTS.body2,
                    textAlign: "right",
                    color: COLORS.darkGray,
                  }}
                >
                  {cartValues?.total} Tk
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={{ flex: 1, marginTop: 2 }}>
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => placeOrder()}
            style={{
              borderColor: COLORS.green,
              borderWidth: 1,
              backgroundColor: COLORS.green,
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              fontFamily: "PoppinsLight",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: "PoppinsLight",
              }}
            >
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCheckoutItem = (item) => {
    return (
      <View
            style={{
            
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding / 3,
            }}
          >
            <View
              style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
            
            >
              <Text
                style={{
                  // flex: 1,
                  ...FONTS.h4,
                  // fontSize: "13",
                  color: COLORS.darkGray,
                }}
              >
                {" # " + item.name + " x " + item.quantity}
              </Text>
              <Text
              
                style={{
                  // flex: 2,
                  ...FONTS.h4,
                  // fontSize: "13",
                  color: COLORS.darkGray,
                }}
              >
                {item.price +
                  " x " +
                  item.quantity +
                  " = " +
                  item.price * item.quantity}{" "}
                Tk
              </Text>
            </View>
          </View>
        
    );
  };


  if (cartItems.length == 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: COLORS.white,
          paddingHorizontal: SIZES.padding,
          marginBottom: 400,
        }}
      >
        <Animated.Image
          source={images.addToCart}
          resizeMode="contain"
          style={{
            paddingHorizontal: SIZES.padding,
            position: "absolute",
            top: 0,
            height: 400,
          }}
        />
        <Text
          style={{
            ...FONTS.body2,
            textAlign: "center",
          }}
        >
          Your cart is empty! Please Add Items
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {renderCheckoutHeader()}

      <FlatList
    
        bounces={false}
        data={cartItems}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={true}
        ListHeaderComponent={renderFlatListHeader()}
        ListFooterComponent={renderFlatListFooter()}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={5}
        renderItem={({ item }) => renderCheckoutItem(item)}
      />

 
      {renderCheckoutFooter()}

      <Modalize ref={locationModalRef} HeaderComponent={renderHeader()}>
        <LocationList onCloseAction={onCloseAction} />
      </Modalize>
    </View>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  shadow_bottom: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  }
})

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducer.cartItems,
    total: state.cartReducer.total,
    restaurantId: state.cartReducer.restaurant_id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      return dispatch(addToCart(item));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
