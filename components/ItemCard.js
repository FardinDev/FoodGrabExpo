import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Animated from "react-native-reanimated";


import { COLORS, FONTS, icons, SIZES } from "../constants";

const ItemCard = ({ item, onPress, cartQuantity  }) => {
 
  return (
    <Animated.View>
      <View
        style={{
         paddingVertical: SIZES.padding,
          borderColor: 'transparent',
          borderBottomColor: COLORS.lightGray1,
          borderWidth: 1
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
              height: 100,
              width: 100,
              borderRadius: 5,
              backgroundColor: COLORS.lightGray1,
            }}
          >
            {
              cartQuantity != 0 ?
            <View
              style={{
                zIndex: 10,
                position: "absolute",
                top: -5,
                right: -5,
                height: 20,
                width: 20,
                borderRadius: 20,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                  textAlign: 'center'
                }}
              >{cartQuantity}</Text>
            </View>
            : 
            null
            }


            <Image
              resizeMode="cover"
              source={{uri: item?.image}}
              style={{
                height: 90,
                width: 90,
              }}
            />
          </View>

          {/* description */}

          <View
            style={{
              flex: 2,
              paddingHorizontal: 10,
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={{
                marginBottom: 1,
                ...FONTS.body2,
                color: COLORS.darkGray,
                fontWeight: 'bold',
                fontSize: 16
                
              }}
            >
              {item?.name}
            </Text>
            <Text
            numberOfLines={2}
            style={{
              fontFamily: 'PoppinsLight',
              color: COLORS.gray
            }}>{item?.description}</Text>
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
                ...FONTS.h3,
                color: COLORS.darkGray,
                fontWeight: 'bold'
              }}
            >
              TK. {item?.price}
            </Text>
          </View>
        </View>
      </View>


    </Animated.View>
  );
};

export default ItemCard;
