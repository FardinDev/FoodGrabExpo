import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS, FONTS, icons, images, SIZES } from "../constants";

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
  const [isValidImage, setIsvalidImage] = React.useState(false);

  React.useEffect(() => {
    fetch(item.image)
      .then((res) => {
        if (res.status == 404) {
          setIsvalidImage(false);
        } else {
          setIsvalidImage(true);
        }
      })
      .catch((err) => {
        setIsvalidImage(false);
      });
  }, []);

  return (
    <TouchableWithoutFeedback
    
    onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          padding: SIZES.padding,
          overflow: "hidden",
          ...containerStyle,
        }}
        
      >
        {/* Image */}

        {isValidImage ? (
          <Image
            source={{ uri: item.image }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              resizeMode: "cover",
            }}
          />
        ) : (
          <Image
            source={images.baked_fries}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,

              resizeMode: "cover",
            }}
          />
        )}

        <LinearGradient
          locations={[0, 1.0]}
          colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.80)"]}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        ></LinearGradient>

        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 5,

            right: SIZES.radius,
          }}
        >
          <Image
            source={icons.calories}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <Text style={{ ...FONTS.body5, color: COLORS.white2 }}>Hot Item</Text>
        </View>

        <View
          style={{
            flex: 1,
            alignSelf: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>
            {item.price} Tk
          </Text>
          <Text
            style={{
              ...FONTS.h2,
              fontFamily: "PoppinsExtraLight",
              fontSize: 17,
              color: COLORS.white,
            }}
          >
            {item.name}
          </Text>

          <Text
            style={{
              ...FONTS.h4,
              fontFamily: "PoppinsExtraLight",
              fontSize: 10,
              color: COLORS.white,
            }}
          >
            From: {item?.restaurant?.name}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HorizontalFoodCard;
