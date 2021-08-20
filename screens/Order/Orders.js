import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Animated from "react-native-reanimated";
import Api from "../../api/api";
import { COLORS, FONTS, icons, images, SIZES } from "../../constants";

const Orders = ({ navigation }) => {

  const api = new Api();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [orderData, setOrderData] = React.useState([]);

  React.useEffect(() => {
    getOrderData().then((res) => {
      setOrderData(res.data);
      setIsReady(true)
      setRefreshing(false);

    })

  }, [refreshing]);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
}, []);

  const getOrderData = async () => {

    const api_token = await AsyncStorage.getItem("userToken");

    api.api_token = api_token;
    return await api
      .orderList()
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


  const renderOrderItem = (item) => {
    return (
      <TouchableWithoutFeedback
      onPress={() => navigation.navigate('OrderDetails', {order: item})}
      >
        <View style={style.orderItem}>
        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'

        }}>
            <Text style={{...FONTS.body2, color: COLORS.darkGray}}>{item.order_number}</Text>
            <Text style={{...FONTS.h4, color: COLORS.primary}}>{item.status.name}</Text>
        </View>
        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          
        }}>
            <Text style={{ color: COLORS.darkGray}}>From: {item.restaurant.name}</Text>
            
        </View>

        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
          
        }}>
            <Text style={{ color: COLORS.primary}}>{item.date +', '+ item.time}</Text>
            <Text style={{ ...FONTS.body2, color: COLORS.darkGray}}>{item.grand_total} Tk</Text>
            
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderOrdersHeader = () => {
    return (
      <View
        style={{
          zIndex: 1000,
          height: Platform.OS === "ios" ? 90 : 60,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
          ...style.shadow,
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.white2,
          }}
        />

        <View
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
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
          >
            My Orders
          </Text>
        </View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,
            borderColor: COLORS.primary,
            borderWidth: 1,
            backgroundColor: COLORS.transparent,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} color={COLORS.darkGray2} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderOrdersHeader()}
      <FlatList
      // style={{marginVertical: SIZES.padding}}
        bounces={true}
        data={orderData}
        keyExtractor={(item) => `${item.id}`}

        refreshControl={
          <RefreshControl
          colors={[COLORS.primary, COLORS.black]}
          progressBackgroundColor={COLORS.white}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        // showsVerticalScrollIndicator={true}
        // ListHeaderComponent={renderFlatListHeader()}
        // ListFooterComponent={renderFlatListFooter()}
        // stickyHeaderIndices={[0]}
        scrollEventThrottle={5}
        renderItem={({ item }) => renderOrderItem(item)}
      />

    </View>
  );
};

export default Orders;

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 3.25,

    elevation: 3,
  },
  shadow_bottom: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  orderItem:{
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.padding /2,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  }
});
