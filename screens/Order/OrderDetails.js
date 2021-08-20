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
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Animated from "react-native-reanimated";
import Api from "../../api/api";
import { COLORS, FONTS, icons, images, SIZES } from "../../constants";

const OrderDetails = ({ route, navigation }) => {

  const api = new Api();
  const [refreshing, setRefreshing] = React.useState(false);

  const [isReady, setIsReady] = React.useState(false);
  const [order, setOrder] = React.useState({});

  React.useEffect(() => {

    let {order} = route.params;
  
    setOrder(order);
    setIsReady(true)
  
  }, []);


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
      console.log(resData.data);
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
      onPress={() => console.log(item.id)}
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
            {order.order_number}
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
      <ScrollView
        contentContainerStyle={style.scrollView}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //   />
        // }
      >
        <View style={style.orderItem}>
        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'

        }}>
            <Text style={{color: COLORS.gray2}}>From</Text>
           
        </View>
        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'

        }}>
            <Text style={{...FONTS.body2, color: COLORS.darkGray, flex: 2}}>{order.restaurant.name}</Text>
            
           
        </View>
     

        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
          
        }}>
            
          <Text style={{ color: COLORS.gray, fontFamily: 'PoppinsLight'}}>{order.restaurant.address}</Text>
           
            
        </View>
        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: SIZES.padding,

        }}>
            <Text style={{color: COLORS.gray2}}>User</Text>
            {/* <Text style={{color: COLORS.gray2}}>Placed on</Text> */}
           
        </View>
        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'

        }}>
            <Text style={{...FONTS.body2, color: COLORS.darkGray}}>{order.user.name}</Text>
            {/* <Text style={{color: COLORS.primary, fontFamily: 'PoppinsLight'}}>{order.date}</Text> */}
           
        </View>
     

        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
          
        }}>
            
          <Text style={{ color: COLORS.gray, fontFamily: 'PoppinsLight'}}>{order.user.phone}</Text>
          {/* <Text style={{ color: COLORS.primary, fontFamily: 'PoppinsLight'}}>{order.time}</Text> */}
           
            
        </View>
        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: SIZES.padding,

        }}>
            <Text style={{color: COLORS.gray2}}>Delivery Location</Text>
            <Text style={{color: COLORS.gray2}}>Placed on</Text>
           
        </View>
        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'

        }}>
            <Text style={{...FONTS.body2, color: COLORS.darkGray}}>{order.location.name}</Text>
            <Text style={{color: COLORS.primary, fontFamily: 'PoppinsLight'}}>{order.date}</Text>
           
        </View>
     

        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
          
        }}>
            
          <Text style={{ color: COLORS.gray, fontFamily: 'PoppinsLight'}}>{order.location.address}</Text>
          <Text style={{ color: COLORS.primary, fontFamily: 'PoppinsLight'}}>{order.time}</Text>
           
            
        </View>
      </View>
        <View style={style.orderItem}>
        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'

        }}>
            <Text style={{...FONTS.body2, color: COLORS.darkGray}}>Status</Text>
            <Text style={{
              
              color: COLORS.darkGray,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLORS.primary,
              color: COLORS.primary,
              paddingVertical: 10,
              paddingHorizontal: 20
            
            }}>{order.status.name}</Text>
           
        </View>
     
      </View>

        <View style={style.orderItem}>
        {
          order.items.map(item => {
            return (
              <View key={item.id} style={{
                paddingHorizontal: SIZES.padding,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
      
              }}>
                <Text style={{ ...FONTS.h4, color: COLORS.darkGray}}># {item.name} x {item.quantity}</Text>
                <Text style={{ ...FONTS.h4, color: COLORS.darkGray}}>{item.price} x {item.quantity} = {item.total} TK</Text>
              
            </View>
            )
          })
        }
     
      </View>
      <View style={style.orderItem}>
        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 4,

        }}>
            <Text style={{ color: COLORS.darkGray}}>Subotal</Text>
            <Text style={{ color: COLORS.darkGray}}>{order.total} Tk</Text>
        </View>
        {
          order.discounts > 0 ? 
          <View style={{
            paddingHorizontal: SIZES.padding,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 4,
  
          }}>
              <Text style={{ color: COLORS.darkGray}}>Discount</Text>
              <Text style={{ color: COLORS.primary}}>- {order.discounts} Tk</Text>
              
             
          </View>
          :
          null
        }

        <View style={{
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 4,

        }}>
            <Text style={{ color: COLORS.darkGray}}>Delivery Charge</Text>
            <Text style={{ color: COLORS.darkGray}}>{order.delivery_charge} Tk</Text>
        </View>
        <View style={{
          borderTopColor: COLORS.lightGray2,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderTopWidth: 1,
          paddingTop: 15,
          paddingHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 4,

        }}>
            <Text style={{fontFamily: 'PoppinsLight', fontSize: 25, color: COLORS.primary}}>Total</Text>
            <Text style={{fontFamily: 'PoppinsLight', fontSize: 25, color: COLORS.primary}}>{order.grand_total} Tk</Text>
        </View>
     
      </View>
      </ScrollView>
     </View>
  

  );
};

export default OrderDetails;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  
  },
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
