import React from "react";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { COLORS, FONTS, icons, images, SIZES } from "../../constants";

const Help = ({ navigation }) => {
 
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.Image
        source={images.help}
        resizeMode="contain"
        style={{
          position: "absolute",
          top: 0,
          height: 400,
        }}
      />

      <View
        style={{
          position: "absolute",
          top: 0,
          paddingTop: 320,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginBottom: 10,
            color: COLORS.darkGray,
            ...FONTS.body1,
          }}
        >
          Need Help?
        </Text>
        <Text
          style={{
            color: COLORS.darkGray,
            ...FONTS.body3,
          }}
        >
          Call Our Helpline: 16234
        </Text>
        <Text
          style={{
            color: COLORS.darkGray,
            ...FONTS.body3,
          }}
        >
          Happy To Help
        </Text>
      </View>

      <Text
        style={{
          position: "absolute",
          bottom: 20,
          color: COLORS.darkGray,
          ...FONTS.body3,
        }}
      >
        All Rights Reserved By{" "}
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          FoodGrab
        </Text>
      </Text>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,

          paddingTop: 50,
          paddingLeft: 20,
        }}
      >
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
            source={icons.cross}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

export default Help;
