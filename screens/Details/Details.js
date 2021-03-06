import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  ColorPropType,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  InteractionManager,
  Platform,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";

import * as Haptics from "expo-haptics";

import { connect, useSelector } from "react-redux";
// import { addToCart, addQuantity, subtractQuantity, removeItem } from "../../stores/cart/cartActions";
import { IconButton, TextButton } from "../../components";
import { AddToCartModal } from "../";
import {
  COLORS,
  SIZES,
  icons,
  images,
  FONTS,
  constants,
} from "../../constants";
import { BlurView } from "expo-blur";
import ItemCard from "../../components/ItemCard";

import { SwipeablePanel } from "rn-swipeable-panel";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import CartVal from "./CartVal";
import { addToCart, destroyCart } from "../../stores/cart/cartActions";
import CartTab from "../Cart/CartTab";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Modalize } from "react-native-modalize";
import { setSelectedTab } from "../../stores/tab/tabActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../api/api";
import CartCard from "../../components/CartCard";

const HEADER_HEIGHT = 250;

const RenderRatingCard = ({ restaurant }) => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: SIZES.radius / 2,
        backgroundColor: COLORS.transparentBlack1,
        borderColor: COLORS.white,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h2,

          fontWeight: "bold",
        }}
      >
        {restaurant?.name}
      </Text>
    </View>
  );
};
const RenderAddressCard = ({ restaurant }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        padding: SIZES.padding,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderRadius: SIZES.radius / 2,
          alignItems: "center",
          alignItems: "left",
        }}
      >
        <Feather name="clock" color={COLORS.darkGray} size={18} />

        <Text
          style={{
            color: COLORS.darkGray,
            ...FONTS.h3,
            marginLeft: 8,
            textAlignVertical: "center",
            fontWeight: "bold",
          }}
        >
          {restaurant?.duration}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          borderRadius: SIZES.radius / 2,
          alignItems: "center",
        }}
      >
        <Feather
          style={{ alignSelf: "center" }}
          name="map-pin"
          color={COLORS.darkGray}
          size={18}
        />

        <Text
          style={{
            color: COLORS.darkGray,
            ...FONTS.h4,
            marginHorizontal: 8,
          }}
        >
          {String(restaurant?.address)}
        </Text>
      </View>
    </View>
  );
};

const Details = ({
  route,
  navigation,
  cartItems,
  addToCart,
  restaurant_id,
  destroyCart,
  setSelectedTab,
}) => {
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
  const [selectedCategories, setSelectedCategories] = React.useState(null);
  const [isPanelActive, setIsPanelActive] = React.useState(false);
  const [isCartPanelActive, setIsCartPanelActive] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [itemCount, setItemCount] = React.useState(1);

  const [isReady, setIsReady] = React.useState(false);

  const cartModalRef = useRef(false);
  const itemModalRef = useRef(false);
  const api = new Api();

  const showPanel = (item) => {
    setSelectedItem(item);
    itemModalRef.current?.open();
    setIsPanelActive(true);
  };
  const closePanel = () => {
    setIsPanelActive(false);
    setSelectedItem(null);
    setItemCount(1);
  };

  const showCartPanel = () => {
    cartModalRef.current?.open();
    setIsCartPanelActive(true);
  };
  const closeCartPanel = () => {
    setIsCartPanelActive(false);
  };

  const addItemsTOCart = () => {
    if (
      restaurant_id !== 0 &&
      restaurant_id != selectedRestaurant.id &&
      cartItems.length
    ) {
      Alert.alert(
        "Are your sure?",
        "You have items in your cart from another restaurant, adding this item will removed previous items",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              destroyCart();
              selectedItem.quantity = itemCount;
              selectedItem.item_total = itemCount * selectedItem.price;
              selectedItem.restaurant_id = selectedRestaurant.id;

              addToCart(selectedItem);
              itemModalRef.current?.close();
              closePanel();
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    } else {
      selectedItem.quantity = itemCount;
      selectedItem.item_total = itemCount * selectedItem.price;
      selectedItem.restaurant_id = selectedRestaurant.id;

      addToCart(selectedItem);
      itemModalRef.current?.close();
      closePanel();
    }
  };

  const renderCartModalHeader = () => {
    return (
      <View
        style={{
          height: 50,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            ...FONTS.body1,
            color: COLORS.darkGray,
            textAlign: "center",
            paddingVertical: 10,
          }}
        >
          Cart
        </Text>
      </View>
    );
  };
  const renderCartModalFooter = () => {
    if (cartItems.length) {
      return (
        <View style={{ flex: 1, position: 'absolute', bottom: Platform.OS === 'ios' ? 25 : 0, right: 0, left: 0, margin: SIZES.padding}}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab(constants.screens.cart);
              navigation.navigate("MainLayout");
            }}
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
              opacity: 1,
             
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
              View Full Cart
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, marginTop: SIZES.padding, marginBottom: 150 }}>
        <Text
          style={{
            ...FONTS.h3,
            width: "100%",
            height: 50,
            textAlign: "center",
            color: COLORS.darkGray,
          }}
        >
          Your Cart is empty! Please add items
        </Text>
      </View>
    );
  };

  const getRestaurant = async (id) => {
    const api_token = await AsyncStorage.getItem("userToken");

    api.api_token = api_token;
    return await api
      .getRestaurant(id)
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
    let { item_id } = route.params;

    getRestaurant(item_id).then((restaurant) => {
      setSelectedRestaurant(restaurant.data);
      setSelectedCategories(restaurant.data.categories);
      InteractionManager.runAfterInteractions(() => setIsReady(true));
    });
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;

  const [cartModalData, SetCartModalData] = React.useState({
    isVisible: false,
    product: null,
  });

  const renderCartItem = ({ item }) => <CartCard item={item} />;

  function renderRestaurantHeader() {
    return (
      <View
        style={{
          marginTop: -1000,
          paddingTop: 1000,
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Animated.Image
          source={{ uri: selectedRestaurant?.photo }}
          resizeMode="contain"
          style={{
            height: HEADER_HEIGHT,
            width: "200%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />

        {/* rating */}
        <Animated.View
          style={{
            zIndex: 1,
            position: "absolute",
            bottom: 120,
            left: 30,
            right: 30,
            height: 50,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100, 200],
                  outputRange: [0, 0, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <RenderRatingCard restaurant={selectedRestaurant} />
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 0,
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            height: 200,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100, 200],
                  outputRange: [0, 0, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <LinearGradient
            locations={[0, 1.0]}
            colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.80)"]}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          ></LinearGradient>
        </Animated.View>
        <Animated.View
          style={{
            position: "relative",
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            width: "100%",
            backgroundColor: COLORS.lightGray2,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100, 200],
                  outputRange: [0, 0, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          {Platform.OS == "ios" ? (
            <RenderAddressCard restaurant={selectedRestaurant} />
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                padding: SIZES.padding,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <Feather
                  style={{ alignSelf: "center" }}
                  name="clock"
                  color={COLORS.darkGray}
                  size={18}
                />

                <Text
                  style={{
                    color: COLORS.darkGray,
                    ...FONTS.h3,
                    marginLeft: 8,
                    textAlignVertical: "center",
                    fontWeight: "bold",
                  }}
                >
                  {selectedRestaurant?.duration}
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  // alignItems: "center",
                }}
              >
                <Feather
                  style={{ alignSelf: "center" }}
                  name="map-pin"
                  color={COLORS.darkGray}
                  size={18}
                />

                <Text
                  style={{
                    color: COLORS.darkGray,
                    ...FONTS.h4,
                    marginHorizontal: 8,
                    textAlignVertical: "center",
                  }}
                >
                  {selectedRestaurant?.address}
                </Text>
              </View>
            </View>
          )}
        </Animated.View>
      </View>
    );
  }

  const getCartQuantity = (id) => {
let val = 0
    if (cartItems.length) {

     cartItems.forEach(item => {
        if (item.id === id) {
          val = item.quantity
        }
      });
    
    }
 return val;
  }

  function renderHeaderBar() {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: Platform.OS === "ios" ? 90 : 60,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
        }}
      >
        {/* screen overlay */}

        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.white2,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        />

        {/* header title */}

        <Animated.View
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

            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
              outputRange: [0, 1],
            }),
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {selectedRestaurant?.name}
          </Text>
        </Animated.View>

        {/* back button */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,

            backgroundColor: COLORS.primary,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
        {/* headertext */}

        {/* cart button */}

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: COLORS.primary,
            backgroundColor: COLORS.transparent,
          }}
          onPress={() => {
            showCartPanel();
          }}
        >
          {!cartItems.length ? null : (
            <Animatable.View
            animation="pulse" 
            delay={100}
            iterationCount="infinite"
              style={{
                position: "absolute",
                top: -5,
                left: -5,
                height: 20,
                width: 20,
                borderRadius: 20,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CartVal
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                }}
              />
            </Animatable.View>
          )}
          <Image
            source={icons.cart}
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


  return !isReady ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="small" color={COLORS.gray}/>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray2,
      }}
    >
      <Animated.FlatList
        data={selectedCategories}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* header */}
            {renderRestaurantHeader()}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => {
          if (item.item_count > 0) {
            return (
              <View
                style={{
                  marginBottom: 20,
                  paddingHorizontal: SIZES.padding,
                  backgroundColor: COLORS.white,
                }}
              >
                <Text
                  style={{
                    marginTop: 20,
                    color: COLORS.darkGray,
                    ...FONTS.h2,
                  }}
                >
                  {item.name}
                </Text>

                {item.items.map((food) => {
                  return (
                    <TouchableWithoutFeedback
                      key={food.id}
                      onPress={() => showPanel(food)}
                    >
                      <ItemCard item={food} cartQuantity={getCartQuantity(food.id)}/>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            );
          }
        }}
      />

      {/* header bar */}

      <Modalize
        ref={itemModalRef}
        onClose={() => closePanel()}
        adjustToContentHeight
      >
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            marginBottom: Platform.OS == 'ios' ? 30 : 0,
          }}
        >
          <ItemCard item={selectedItem} cartQuantity={0}/>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingHorizontal: SIZES.padding,
              marginVertical: 5,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  opacity: itemCount < 2 ? 0.5 : 1,
                }}
                disabled={itemCount < 2}
                onPress={() =>
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                  ).then(setItemCount(itemCount - 1))
                }
              >
                <View
                  style={{
                    width: 35,
                    height: 35,

                    justifyContent: "center",

                    backgroundColor: COLORS.primary,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      ...FONTS.h2,
                      color: COLORS.white,
                    }}
                  >
                    -
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  ...FONTS.largeTitle,
                  color: COLORS.darkGray,
                  textAlign: "center",
                }}
              >
                {itemCount}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 35,
                  opacity: 1,
                }}
                onPress={() =>
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                  ).then(setItemCount(itemCount + 1))
                }
              >
                <View
                  style={{
                    width: 35,
                    height: 35,

                    justifyContent: "center",

                    backgroundColor: COLORS.primary,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      ...FONTS.h2,
                      color: COLORS.white,
                    }}
                  >
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => addItemsTOCart()}
              style={{
                borderColor: COLORS.primary,
                borderWidth: 1,

                width: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                fontFamily: "PoppinsLight",
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
                Add To Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
      <Modalize
        ref={cartModalRef}
        modalStyle={{
          paddingHorizontal: SIZES.padding,
        }}
        // adjustToContentHeight={true}
        HeaderComponent={renderCartModalHeader()}
        FooterComponent={renderCartModalFooter()}
        childrenStyle={{
          marginBottom: 100
        }}
        flatListProps={{
          data: cartItems,
          renderItem: renderCartItem,
          keyExtractor: (item) => item.id + item.name,

        }}
      />

     

      {renderHeaderBar()}
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    borderRadius: 0,
  },
});
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducer.cartItems,
    restaurant_id: state.cartReducer.restaurant_id,
    selectedTab: state.tabReducer.selectedTab,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      return dispatch(addToCart(item));
    },
    destroyCart: () => {
      return dispatch(destroyCart());
    },
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);

// function mapStateToProps(state) {
//   return {
//       selectedTab: state.tabReducer.selectedTab
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//       setSelectedTab: (selectedTab) => { return dispatch(setSelectedTab(selectedTab)) }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
