import React from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { connect } from "react-redux";
import { IconButton } from "../../components";
import CartCard from "../../components/CartCard";
import ItemCard from "../../components/ItemCard";
import { COLORS, FONTS, icons, images, SIZES } from "../../constants";
const CartTab = ({ cartItems, total }) => {
  // React.useEffect(() => {

  // }, [cartItems]);
  if (cartItems.length == 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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

  const renderCartHeader = () => {
    return (
      <View>
        <Text
          style={{
            ...FONTS.body1,
            textAlign: "center",
          }}
        >
          Cart
        </Text>
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
        }}
      >
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
              {total} TK
            </Text>
          </View>
        </View>
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
              30 TK
            </Text>
          </View>
        </View>
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
              -10 TK
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
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <View style={{ flex: 3 }}>
            <Text
              style={{
                ...FONTS.body2,
                textAlign: "left",
              }}
            >
              Total
            </Text>
          </View>
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
              {total + 30 - 10} tk
            </Text>
          </View>

          
        </View>
        <View style={{ flex: 1, marginTop: 5, marginBottom: 100 }}>
            <TouchableOpacity
              onPress={() => addItemsTOCart()}
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
      </View>
    );
  };

  return (
    <Animated.FlatList
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTab);
