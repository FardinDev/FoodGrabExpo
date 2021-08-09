import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import {
 IconButton,
    TextButton
} from "../../components";
import { AddToCartModal } from "../";
import { COLORS, SIZES, icons, images } from "../../constants";


const Details = ({route, navigation}) => {
    const { item } = route.params;
    const [cartModalData, SetCartModalData] = React.useState({
        isVisible: false,
        product: null,
      })
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >

            <Image
             source={item?.image || item?.photo}
             resizeMode="cover"
             style={{
                 position: 'absolute',
                 top:0,
                 width: "100%",
                 height: 220,
                 borderRadius: SIZES.radius / 2
             }}
            />

            <View
            style={{
                position: 'absolute',
                top: 40,
                left: 25,
                
            }}>
            <IconButton
        icon={icons.back}
        onPress={() => navigation.pop()}
        />
            </View>
            <View
            style={{
                position: 'absolute',
                top: 40,
                right: 25
            }}>
            <IconButton
        icon={icons.love}
        
        onPress={() => console.warn(`Loved ${item?.name}` )}
        />
            </View>

            {cartModalData.isVisible &&
                <AddToCartModal
                    isVisible={cartModalData.isVisible}
                    product={cartModalData.product}
                    onClose={() => SetCartModalData({isVisible: false, product: null})}
                />
            }
            
            <TextButton
            label="Back"
            buttonContainerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary
            }}
            onPress={() => navigation.pop()}
        />
        
            
            <TextButton
            label={item?.name}
            buttonContainerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.white2
            }}
            onPress={
                () => SetCartModalData({isVisible: true, product: item})
            }
        />
        </View>
    )
}

export default Details;