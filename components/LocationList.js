import React from "react";
import {
  View,
  Text,
  Animated,
  KeyboardAvoidingView,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import RadioButton from "react-native-radio-button";
import { COLORS, FONTS, icons, images, SIZES } from "../constants";
import * as Haptics from 'expo-haptics';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../api/api";

const LocationList = ({ onCloseAction }) => {
  const [locationData, setLocationData] = React.useState([]);
  const [masterLocationData, setMasterLocationData] = React.useState([]);
  const [selectedIndex, setSelectedindex] = React.useState(null);
const api = new Api();

  const getLocations = async () => {
   
    const userCurrentColation = await AsyncStorage.getItem("userLocation");
    setSelectedindex(userCurrentColation);
    const api_token = await AsyncStorage.getItem("userToken");

  
    api.api_token = api_token;
    return await api
      .getLocations()
      .then((resData) => {
 
        if (resData.data.code !== 200) {
          Alert.alert("Error!", resData.data.message, [{ text: "Okay" }]);
          return null;
        } 

        return resData.data.data;
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


  React.useEffect(() => {

    let isMounted = true;               
    getLocations().then((locations) => {
      if (isMounted){ setLocationData(locations); setMasterLocationData(locations)}
    })

    return () => { isMounted = false };
   


  }, [])

  
  const onPress = async (index) => {
    setSelectedindex(index);
    return index;
  };

  const filterList = (e) => {
    let newlocations = masterLocationData.filter((listItem) =>
      listItem.name.toLowerCase().includes(e.toLowerCase())
    );

    setLocationData(newlocations);
  };


  if (locationData.length < 1) {
    <View style={{ flex: 1, alignItems: 'center'}}> 
        <ActivityIndicator size={'small'} />
    </View>
  }
  return (
    <KeyboardAvoidingView>
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        {/* Icon */}
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />

        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholder="Search Location"
          onChangeText={(e) => filterList(e)}
        />
      </View>
      <Animated.FlatList
        style={{
          backgroundColor: COLORS.lightGray1,
        }}
        data={locationData}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).then(() =>{
              onPress(item.name).then((index) => {
                onCloseAction(index);
              })
          })
          }
            
          }
          >
            <View
              style={{
                padding: SIZES.padding,
                backgroundColor: COLORS.white,
                marginBottom: 1,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                  textAlignVertical: "center",
                }}
              >
                {item.name}
              </Text>
              <RadioButton
                innerColor={COLORS.primary}
                outerColor={COLORS.primary}
                animation={"bounceIn"}
                isSelected={selectedIndex == item.name}
                onPress={() =>
                  {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).then(() =>{
                      onPress(item.name).then((index) => {
                        onCloseAction(index);
                      })
                  })
                  }
                }
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </KeyboardAvoidingView>
  );
};

export default LocationList;
