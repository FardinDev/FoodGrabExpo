import React , { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    RefreshControl,
    StyleSheet,
    Alert,
    RadioButton
} from 'react-native';
import {
    Details
} from "../";
import { FilterModal } from "../";
import { AddToCartModal } from "../";
import {
    HorizontalFoodCard,
    VerticalFoodCard
} from "../../components";
import { FONTS, SIZES, COLORS, icons, dummyData, constants } from "../../constants";

import Api from "../../api/api";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Permissions } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

import { Modalize } from 'react-native-modalize';
import LocationList from '../../components/LocationList';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

const Section = ({ title, onPress, children }) => {
    return (
        <View>
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    marginTop: 30,
                    marginBottom: 20
                }}
            >
                <Text style={{ flex: 1, ...FONTS.h3 }}>
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={onPress}
                >
                    
                </TouchableOpacity>
            </View>

            {/* Content */}
            {children}
        </View>
    )
}

const Home = ({navigation}) => {
    const api = new Api();

const locationModalRef = useRef(false);

  const onOpen = () => {
    locationModalRef.current?.open();
  };

  const onCloseAction = (location) => {
    setUserLocation(location).then((location) => {
        setUserCurrentLocation(location);
        locationModalRef.current?.close();
    })
  
  }
  const checkLocationOnClose = () => {
      if (!userCurrentLocation) {
        
        locationModalRef.current?.open();
    }
 
  
  }

  const fetchUser = () => {
    api
      .getUserList()
      .then((response) => console.log(response.data.data[0]))
      .catch((err) => console.log(err));
  };

    const wait = (timeout) => {
        setSelectedMenuType(1);
        setSelectedCategoryId(1);
        handleChangeCategory(1, 1)

        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    
    const [refreshing, setRefreshing] = React.useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(1)
    const [selectedMenuType, setSelectedMenuType] = React.useState(1)
    const [popular, setPopular] = React.useState([])
    const [recommends, setRecommends] = React.useState([])
    const [menuList, setMenuList] = React.useState([])
    const [allLocations, setAllLocation] = React.useState([])
    const [showFilterModal, setShowFilterModal] = React.useState(false)
    const [notification, setNotification] = useState(false);
    const [isLocationPanelActive, setIsLocationPanelActive] = React.useState(false);
    const [userCurrentLocation, setUserCurrentLocation] = React.useState('');
    const [cartModalData, SetCartModalData] = React.useState({
        isVisible: false,
        product: null,
      })

    const [restaurants, setRestaurants] = React.useState([])

    const notificationListener = useRef();
    const responseListener = useRef();

    const closeLocationPanel = () => {
        setIsLocationPanelActive(false);
      };
      
      const getUserLocation = async () => {
          
          return await AsyncStorage.getItem("userLocation");
  }
      
      const setUserLocation = async (location) => {
          
           await AsyncStorage.setItem("userLocation", location);

           return location;
  }

useEffect( () => {

    getUserLocation().then((location) => {
     
        if (!location) {
            getRecomended().then((recommends) => {
                setRecommends(recommends.data)
                return
            } ).then(() => locationModalRef.current?.open())
            
        }else{
            setUserCurrentLocation(location)
        }
    })
    

    getRestaurants().then((restaurants) => 
    {
        setRestaurants(restaurants.data)
        handleChangeCategory(selectedCategoryId, selectedMenuType);
    }
    
    )


    getRecomended().then((recommends) => {
        setRecommends(recommends.data)
    } )

    getLocations().then((locations) => {
        setAllLocation(locations.data)
        
    } )

}, [refreshing, userCurrentLocation]);

    React.useEffect(() => {
        
        

        registerForPushNotificationsAsync().then(token => setToken(token));
       
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            
          });
      
          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
           ;
          });
      
          return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
          };
      
    }, [])




    const setToken = async (token) => {
   
        const api_token = await AsyncStorage.getItem("userToken");

      
        api.api_token = api_token;
        return await api
          .setToken({ token: token})
          .then((resData) => {
            // setLoginDaata();
            
            if (resData.data.code !== 200) {
              Alert.alert("Error!", resData.data.message, [{ text: "Okay" }]);
    
            
            } 
          })
          .then(() => {})
          .catch((error) => {
      
            Alert.alert(
              "Error!",
              "Something Went Wrong. Please Try after some time",
              [{ text: "Okay" }]
            );
          });
      };


    const getRecomended = async () => {
   
        const api_token = await AsyncStorage.getItem("userToken");

      
        api.api_token = api_token;
        return await api
          .getRecomended()
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
    const getRestaurants = async () => {
   
        const api_token = await AsyncStorage.getItem("userToken");

      
        api.api_token = api_token;
        return await api
          .getRestaurants()
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

    const getLocations = async () => {
   
        const api_token = await AsyncStorage.getItem("userToken");

      
        api.api_token = api_token;
        return await api
          .getLocations()
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

      async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
        //   console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => 
       
        setRefreshing(false)
        );
    }, []);

    // Handler

    function handleChangeCategory(categoryId, menuTypeId) {
      
        // Retrieve the popular menu
        let selectedPopular = dummyData.menu.find(a => a.name == "Popular")

        // Retrieve the recommended menu
        let selectedRecommend = dummyData.menu.find(a => a.name == "Recommended")

        // Find the menu based on the menuTypeId
        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId)


        let selectedRestaurants = restaurants;

        // Set the popular menu based on the categoryId
        setPopular(selectedPopular?.list.filter(a => a.restaurant_categories.includes(categoryId)))

        // Set the recommended menu based on the categoryId
 

        // setRecommends(selectedRestaurants[randomNumber]?.categories[randomNumber]?.items)


   
        // Set the menu based on the categoryId
        setMenuList(selectedMenu?.list.filter(a => a.restaurant_categories.includes(categoryId)))
        
        // setRestaurants(dummyData.restaurantData);
        // setRestaurants(selectedRestaurants?.filter(a => a.restaurant_categories.includes(categoryId)))
    }

    // Render
    function getCategoryNameById(id) {
        let category = dummyData.categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }
    function renderSearch() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 40,
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                {/* Icon */}
                <Image
                    source={icons.search}
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.black
                    }}
                />

                {/* Text Input */}
                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        ...FONTS.body3
                    }}
                    placeholder="search food..."
                />

                {/* Filter Button */}
                <TouchableOpacity
                    onPress={() => setShowFilterModal(true)}
                >
                    <Image
                        source={icons.filter}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderMenuTypes() {
        return (
            <FlatList
                horizontal
                data={dummyData.menu}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0
                        }}
                        onPress={() => {
                            setSelectedMenuType(item.id)
                            handleChangeCategory(selectedCategoryId, item.id)
                        }}
                    >
                        <Text
                            style={{
                                color: selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        )
    }

    function renderRecommendedSection() {
        return (
            <Section
                title="Recommended Items"
               
            >
                <FlatList
                    data={recommends}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 180,
                                width: SIZES.width * 0.85,
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                                paddingRight: SIZES.radius,
                                alignItems: 'center'
                            }}
                            imageStyle={{
                                marginTop: 0,
                                height: 150,
                                width: 150
                            }}
                            item={item}
                            onPress={
                         
                                () => SetCartModalData({isVisible: true, product: item})
                            
                            }
                        />
                    )}
                />
            </Section>
        )
    }


    function renderPopularSection() {
        return (
            <Section
                title="Popular Near You"
                onPress={() => console.log("Show all popular items")}
            >
                <FlatList
                    data={popular}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <VerticalFoodCard
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == popular.length - 1 ? SIZES.padding : 0
                            }}
                            item={item}
                            onPress={() => navigation.navigate('Details', {item: item})}
                        />
                    )}
                />
            </Section>
        )
    }

    function renderFoodCategories() {
        return (
            <FlatList
                data={dummyData.categories}
                keyExtractor={item => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'column',
                            height: 100,
                            width: 100,
                            marginTop: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0,
                            paddingHorizontal: 8,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2,
                            borderColor: selectedCategoryId == item.id ? COLORS.primary : COLORS.transparent,
                            borderWidth: 1,

                            justifyContent: 'center',
                            alignItems: 'center'
                        
                        }}
                        onPress={() => {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).then(() =>{

                                setSelectedCategoryId(item.id)
                                handleChangeCategory(item.id, selectedMenuType)
                            }
                              
                               
                              )
                        }}
                    >
                        <Image
                            source={item.icon}
                            style={{
                                marginTop: 10,
                               
                                height: 30,
                                width: 30
                            }}
                        />

                        <Text
                            style={{
                                alignSelf: 'center',
                                marginTop: SIZES.base,
                                color: COLORS.darkGray,
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>

                    </TouchableOpacity>
                )}
            />
        )
    }

    function renderDeliveryTo() {
        return (
            <View
                style={{
                    flex:1,
                    flexDirection: 'row',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    style={{
                        flex:1,
                        color: COLORS.primary,
                        ...FONTS.body3,
                        textAlignVertical: 'center'
                    }}
                >
                    DELIVERY TO
                </Text>

                <TouchableOpacity
                    style={{
                        flex: 3,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end'
                    }}

                    onPress={() => onOpen()}
                >
                    <Text style={{ ...FONTS.h3 }}>
                        {userCurrentLocation}
                    </Text>
                    <Image
                        source={icons.down_arrow}
                        style={{
                            marginLeft: SIZES.base,
                            height: 20,
                            width: 20
                        }}
                    />
                </TouchableOpacity>


            </View>
        )
    }


    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: 0, padding: SIZES.padding}}
                onPress={() => navigation.navigate('Details', {item: item})}
            >
                {/* Image */}
                <View
                    style={{
                        marginBottom: 10
                    }}
                >
                    <Image
                        source={ {uri: item.photo} || item.photo}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 180,
                            borderRadius: SIZES.radius / 2
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            height: 30,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.white,
                            borderTopRightRadius: SIZES.radius /2,
                            borderBottomLeftRadius: SIZES.radius /2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>{item.duration}</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <Text style={{ ...FONTS.h3, fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>

                <View
                    style={{
                        marginTop: 5,
                        flexDirection: 'row'
                    }}
                >
                    {/* Rating */}
                    <Image
                        source={icons.star}
                        style={{
                            height: 15,
                            width: 15,
                            tintColor: COLORS.primary,
                            marginRight: 10,
                            marginTop: 3
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {
                            item.restaurant_categories.map((categoryId) => {
                                return (
                                    <View
                                        style={{ flexDirection: 'row' }}
                                        key={categoryId}
                                    >
                                        <Text style={{ ...FONTS.body3, fontSize: 14 }}>{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray, fontSize: 14 }}> . </Text>
                                    </View>
                                )
                            })
                        }

                        {/* Price */}
                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...FONTS.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                    }}
                                >$</Text>
                            ))
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }


    return (
        <View
            style={{
                flex: 1
            }}
        >
            

            {/* Filter */}
            {showFilterModal &&
                <FilterModal
                    isVisible={showFilterModal}
                    
                    onClose={() => setShowFilterModal(false)}
                />
            }
            {cartModalData.isVisible &&
                <AddToCartModal
                    isVisible={cartModalData.isVisible}
                    product={cartModalData.product}
                    onClose={() => SetCartModalData({isVisible: false, product: null})}
                />
            }

            {/* List */}
            <FlatList
                data={menuList}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                    colors={[COLORS.primary, COLORS.black]}
                    progressBackgroundColor={COLORS.white}
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                ListHeaderComponent={
                    <View>
                        {/* Search */}
                        {renderSearch()}
                        
                        {/* Delivery To */}
                        {renderDeliveryTo()}

                        {/* Food Categories */}
                        {renderFoodCategories()}

                        {/* Menu Type */}
                        {renderMenuTypes()}

                         {/*Restaurant List */}
                         {renderRestaurantList()}

                    
                        {/* Recommended */}
                        {renderRecommendedSection()}


                        {/* Popular */}
                        {renderPopularSection()}


   
                    </View>
                }
                
                renderItem={({ item, index }) => {
                    return (

                        <View></View>
                        // <HorizontalFoodCard
                        //     containerStyle={{
                        //         height: 130,
                        //         alignItems: 'center',
                        //         marginHorizontal: SIZES.padding,
                        //         marginBottom: SIZES.radius
                        //     }}
                        //     imageStyle={{
                        //         marginTop: 20,
                        //         height: 110,
                        //         width: 110
                        //     }}
                        //     item={item}
                        //     onPress={() => console.log("HorizontalFoodCard")}
                        // />
                        
                    )
                }}
                ListFooterComponent={
                    <View style={{ height: 200 }} />
                }
            />

            <Modalize ref={locationModalRef}
            onClose={checkLocationOnClose}
            HeaderComponent={renderHeader()}
            >
          
                  <LocationList locations={allLocations} userLocation={userCurrentLocation} onCloseAction={onCloseAction}/>      
            </Modalize>
        </View>
    )
}


const renderHeader = () => {

    return (
  
      <View 
      style={{
        padding: SIZES.padding,
        height: 50,
        alignItems: 'center'
      }}
      >
        <Text style={{...FONTS.h2, color: COLORS.darkGray}}>
            Select Delivery Location
        </Text>
      </View>
  
    )
  
  }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})


export default Home;