import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Animated from "react-native-reanimated";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { addQuantity, subQuantity, removeItem } from "../stores/cart/cartActions";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import * as Haptics from 'expo-haptics';
const CartCard = ({ item, onPress, cartItems, total, addQuantity, subQuantity, removeItem }) => {
  return (
    <Animated.View>
      <View
        style={{
          paddingVertical: SIZES.padding /1.5,
          borderColor: "transparent",
          borderBottomColor: COLORS.lightGray2,
          borderWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {/* icon */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 60,
              width: 60,
              borderRadius: 5,
              backgroundColor: COLORS.lightGray1,
            }}
          >
            <Image
              resizeMode="cover"
              source={item?.photo}
              style={{
                height: 50,
                width: 50,
              }}
            />
          </View>


          <View
            style={{
              flex: 4,
              marginLeft: 10,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 3}}>
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.darkGray,
                    fontSize: 13,
                  }}
                >
                  {item?.quantity + " x"} {item?.name}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.darkGray,
                    fontSize: 13,
                  }}
                >
                  {item?.price * item.quantity + " Tk"}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 3 }}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 2,
                  }}
                >
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
                      marginHorizontal: 5,
                      opacity: item.quantity < 2 ? 0.3 : 1
                    }}
                    disabled={item.quantity < 2}
                    onPress={() => 
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).then(
                        subQuantity(item.id)
                      )
                    }
                  >
                    <FontAwesome
                      name="minus"
                      color={COLORS.primary}
                      size={20}
                    />
                  </TouchableOpacity>
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
                      marginHorizontal: 5,
                    }}
                    onPress={() => 
                      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).then(
                        addQuantity(item.id)
                      )
                    
                    }
                  >
                    <FontAwesome name="plus" color={COLORS.primary} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
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
                  onPress={() => 
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).then(
                      removeItem(item)
                    )
                  
                  }
                >
                  <FontAwesome name="trash" color={COLORS.primary} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducer.cartItems,
    total: state.cartReducer.total,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      return dispatch(addToCart(item));
    },
    addQuantity: (item) => {
      return dispatch(addQuantity(item));
    },
    subQuantity: (item) => {
      return dispatch(subQuantity(item));
    },
    subQuantity: (item) => {
      return dispatch(subQuantity(item));
    },
    removeItem: (item) => {
      return dispatch(removeItem(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCard);
