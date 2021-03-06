import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useRef} from "react";
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
} from "react-native";

import { Modalize } from "react-native-modalize";
import {  StackActions } from '@react-navigation/native';
import { connect } from "react-redux";
import Api from "../../api/api";
import { IconButton } from "../../components";
import CartCard from "../../components/CartCard";
import ItemCard from "../../components/ItemCard";
import LocationList from "../../components/LocationList";
import { COLORS, FONTS, icons, images, SIZES } from "../../constants";
const CartTab = ({ cartItems, total, restaurantId, navigation }) => {
  
  const [isLoading, setIsloading] = React.useState(false);
  const [cartValues, setCartValues] = React.useState({});
  const [userCurrentLocation, setUserCurrentLocation] = React.useState("");

  const api = new Api();
  const locationModalRef = useRef(false);

  const locationModalOpen = () => {
    locationModalRef.current?.open();
  };


  const onCloseAction = async (location) => {
    await AsyncStorage.setItem('userLocation', location);
    setUserCurrentLocation(location);
    locationModalRef.current?.close();
   
 
 }


 const renderHeader = () => {

  return (

    <View 
    style={{
      padding: SIZES.padding,
      height: 50,
      alignItems: 'center'
    }}
    >
      <Text style={{...FONTS.h2, color: COLORS.darkGray}}>
          Select Delivery Location
      </Text>
    </View>

  )

}
  const getValues = async (total) => {
    // let location = await AsyncStorage.getItem('userLocation');
    const userLocation = await AsyncStorage.getItem("userLocation");
    setUserCurrentLocation(userLocation);
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

  React.useEffect(() => {
    if (total > 0) {
      setIsloading(true);
      getValues(total).then((data) => {
        setCartValues(data.data);
        setIsloading(false);
      });
    }
  }, [total, userCurrentLocation]);

  function renderDeliveryTo() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: SIZES.padding,

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
          onPress={() => {locationModalOpen()}}
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
    );
  }

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
            textAlignVertical: 'bottom',
            position: 'absolute',
            bottom: Platform.OS == 'ios' ? -40 : -120
          }}
        >
          Your cart is empty! Please Add Items
        </Text>
      </View>
    );
  }

  const renderCartHeader = () => {
    return (
      <View>
        {/* <Text
          style={{
            ...FONTS.body1,
            textAlign: "center",
          }}
        >
          Cart
        </Text> */}
      </View>
    );
  };
  const renderCartFooter = () => {
    return (
      <View
        style={{
          flexDirection: "column",
          paddingHorizontal: SIZES.padding,
          marginVertical: SIZES.padding,
          marginBottom: 200,
        }}
      >
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center", height: 140 }}>
            <ActivityIndicator size={"small"} color={COLORS.gray} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {renderDeliveryTo()}

            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <View style={{ flex: 4 }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    textAlign: "left",
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
                  }}
                >
                  {total} Tk
                </Text>
              </View>
            </View>

            {cartValues?.discount ? (
              <View style={{ flexDirection: "row", marginVertical: 5 }}>
                <View style={{ flex: 4 }}>
                  <Text
                    style={{
                      ...FONTS.body3,
                      textAlign: "left",
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
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <View style={{ flex: 4 }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    textAlign: "left",
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
            <View style={{ marginVertical: 5 }}>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: COLORS.green,
                }}
              >
                {cartValues.message}
              </Text>
            </View>
          </View>
        )}

        <View style={{ flex: 1, marginTop: 5, marginBottom: 10 }}>
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => navigation.navigate('Checkout')}
            style={{
              borderColor: COLORS.primary,
              borderWidth: 1,
              backgroundColor: COLORS.primary,
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
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 5, marginBottom: 10 }}>
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => navigation.navigate("Details", {item_id: restaurantId}) }
            style={{
              borderColor: COLORS.primary,
              borderWidth: 1,
              backgroundColor: COLORS.white,
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
                color: COLORS.primary,
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: "PoppinsLight",
              }}
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        bounces={false}
        data={cartItems}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderCartHeader()}
        ListFooterComponent={renderCartFooter()}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
            }}
          >
            <View key={item.id}>
              <CartCard item={item} />
            </View>
          </View>
        )}
      />

      <Modalize
        ref={locationModalRef}
        HeaderComponent={renderHeader()}
       
      >
        <LocationList
          onCloseAction={onCloseAction}
        />
      </Modalize>
    </View>
  );
};




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

export default connect(mapStateToProps, mapDispatchToProps)(CartTab);
