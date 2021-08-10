import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Animated from "react-native-reanimated";


import { COLORS, FONTS, icons, SIZES } from "../constants";

const ItemCard = ({ item, onPress }) => {
 
  return (
    <Animated.View>
      <View
        style={{
          marginVertical: SIZES.padding,
        }}

      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            marginVertical: 5,
          }}
        >
          {/* icon */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 100,
              width: 100,
              borderRadius: 5,
              backgroundColor: COLORS.lightGray1,
            }}
          >
            <Image
              resizeMode="cover"
              source={item?.photo}
              style={{
                height: 90,
                width: 90,
              }}
            />
          </View>

          {/* description */}

          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                marginBottom: 1,
                ...FONTS.body3,
              }}
            >
              {item?.name}
            </Text>
            <Text>{item?.description}</Text>
          </View>

          {/* price */}

          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                marginBottom: 1,
                ...FONTS.body3,
              }}
            >
              {item?.price}
            </Text>
          </View>
        </View>
      </View>


    </Animated.View>
  );
};

export default ItemCard;
