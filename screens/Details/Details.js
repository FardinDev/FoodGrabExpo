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
} from "react-native";

import { connect } from "react-redux";
import { addToCart, addQuantity, subtractQuantity, removeItem } from "../../stores/cart/cartActions";
import { IconButton, TextButton } from "../../components";
import { AddToCartModal } from "../";
import { COLORS, SIZES, icons, images, FONTS } from "../../constants";
import { BlurView } from "expo-blur";
import ItemCard from "../../components/ItemCard";

import { SwipeablePanel } from "rn-swipeable-panel";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import {CartVal} from "./CartVal";

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
          ...FONTS.h3,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {restaurant?.name}
      </Text>
    </View>
  );
};

const Details = ({ route, navigation }) => {
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
  const [selectedCategories, setSelectedCategories] = React.useState(null);
  const [isPanelActive, setIsPanelActive] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const [isReady, setIsReady] = React.useState(false);

  const showPanel = (item) => {
    setSelectedItem(item);
    setIsPanelActive(true);
  };
  const closePanel = () => {
    setIsPanelActive(false);
    setSelectedItem(null);
  };

  React.useEffect(() => {
    let { item } = route.params;
    setSelectedRestaurant(item);
    setSelectedCategories(item.categories);

    InteractionManager.runAfterInteractions(() => setIsReady(true));
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;

  const [cartModalData, SetCartModalData] = React.useState({
    isVisible: false,
    product: null,
  });

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
          source={selectedRestaurant?.photo}
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
            position: "absolute",
            bottom: 10,
            left: 30,
            right: 30,
            height: 50,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100, 230],
                  outputRange: [0, 0, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <RenderRatingCard restaurant={selectedRestaurant} />
        </Animated.View>
      </View>
    );
  }

  function renderHeaderBar() {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: Platform.OS === "ios" ? 90 : 80,
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
            paddingBottom: Platform.OS === "ios" ? 20 : 0,
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

        {/* Love button */}

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: COLORS.primary,
            backgroundColor: COLORS.transparentBlack1,
          }}
        >
          <Image
            source={icons.love}
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

  // {
  //   !isReady ?
  //   return( <ActivityIndicator/>)
  //   : null
  // }

  return !isReady ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="small" />
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
        renderItem={({ item }) => (
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
                  <ItemCard item={food} />
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        )}
      />

      {/* header bar */}

      <SwipeablePanel
        fullWidth
        closeOnTouchOutside
        onlySmall
        isActive={isPanelActive}
        onClose={closePanel}
        onPressCloseButton={closePanel}
        style={{
          flex: 1,
          marginTop: 50,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <View style={{ flex: 2 }}></View>
        <ItemCard item={selectedItem} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            marginVertical: 5,
            justifyContent: "space-between",
          }}
        >
          <View style={{}}>
            <Text
              style={{
                ...FONTS.body2,
              }}
            >
              fixed footer
            </Text>
          </View>
          <View style={{}}>
            <Text
              style={{
                ...FONTS.body2,
              }}
            >
              <View
                style={{
                  
                  left: 0,
                  right: 0,
                  height: 110,
                  paddingHorizontal: SIZES.padding,
                  paddingVertical: SIZES.radius,
                  backgroundColor: COLORS.white,
                }}
              >
                <TextButton
                  label="Add To Cart"
                  buttonContainerStyle={{
                    height: 50,
                    borderRadius: SIZES.base,
                    backgroundColor: COLORS.primary,
                  }}
                  onPress={() => addToCart(selectedItem?.id)}
                />

                    <CartVal />
                
              </View>
            </Text>
          </View>
        </View>
      </SwipeablePanel>

      {renderHeaderBar()}
      {cartModalData.isVisible && (
        <AddToCartModal
          isVisible={cartModalData.isVisible}
          product={cartModalData.product}
          onClose={() => SetCartModalData({ isVisible: false, product: null })}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state)=>{
  return {
    items: state.items
  }
}
const mapDispatchToProps= (dispatch)=>{
  
  return{
      addToCart: (id)=>{dispatch(addToCart(id))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details)