import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  ColorPropType,
  Image,
  TouchableOpacity,
} from "react-native";
import { IconButton, TextButton } from "../../components";
import { AddToCartModal } from "../";
import { COLORS, SIZES, icons, images, FONTS } from "../../constants";
import { BlurView } from "expo-blur";
import ItemCard from "../../components/ItemCard";

import { SwipeablePanel } from "rn-swipeable-panel";
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
  const [isPanelActive, setIsPanelActive] = React.useState(false);

  const [selectedItem, setSelectedItem] = React.useState(null);

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={selectedRestaurant?.menu}
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
          <TouchableOpacity
         
          onPress={() => showPanel(item)}
          >
            <ItemCard item={item}  />
          </TouchableOpacity>
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
        }}
      >
        <View style={{ flex: 2 }}></View>
        <ItemCard item={selectedItem}  />
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
              fixed footer
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

export default Details;
