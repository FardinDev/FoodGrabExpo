import React from 'react';
import {
    View,
    Text,
    Animated,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    Platform,
    Image
} from 'react-native';

import {
    IconButton,
    TwoPointSlider,
    TextButton,
    TextIconButton
} from "../../components";
import { COLORS, FONTS, SIZES, constants, icons } from "../../constants";

const Section = ({ containerStyle, title, children }) => {
    return (
        <View
            style={{
                marginTop: SIZES.padding,
                ...containerStyle
            }}
        >
            <Text style={{ ...FONTS.h3 }}>{title}</Text>

            {children}
        </View>
    )
}

const AddToCartModal = ({ isVisible, onClose, product }) => {

    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current
    
    const [showAddToCartModal, setShowAddToCartModal] = React.useState(isVisible)
    
    const [deliveryTime, setDeliveryTime] = React.useState("")
    const [ratings, setRatings] = React.useState("")
    const [tags, setTags] = React.useState("")

    React.useEffect(() => {
        if (showAddToCartModal) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start(() => onClose());
        }
    }, [showAddToCartModal])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, 380]
    })

    function renderDistance() {
        return (
            <Section
                title="Distance"
            >
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <TwoPointSlider
                        values={[3, 10]}
                        min={1}
                        max={20}
                        postfix="km"
                        onValuesChange={(values) => console.log(values)}
                    />
                </View>
            </Section>
        )
    }

    function renderDeliveryTime() {
        return (
            <Section
                title="Delivery Time"
                containerStyle={{
                    marginTop: 40
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: SIZES.radius
                    }}
                >
                    {constants.delivery_time.map((item, index) => {
                        return (
                            <TextButton
                                key={`delivery_time-${index}`}
                                label={item.label}
                                labelStyle={{
                                    color: item.id == deliveryTime ? COLORS.white : COLORS.gray,
                                    ...FONTS.body3
                                }}
                                buttonContainerStyle={{
                                    width: "30%",
                                    height: 50,
                                    margin: 5,
                                    alignItems: 'center',
                                    borderRadius: SIZES.base,
                                    backgroundColor: item.id == deliveryTime ? COLORS.primary : COLORS.lightGray2
                                }}
                                onPress={() => setDeliveryTime(item.id)}
                            />
                        )
                    })}
                </View>
            </Section>
        )
    }

    function renderPricingRange() {
        return (
            <Section
                title="Pricing Range"
            >
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <TwoPointSlider
                        values={[10, 50]}
                        min={1}
                        max={100}
                        prefix="$"
                        postfix=""
                        onValuesChange={(values) => console.log(values)}
                    />
                </View>
            </Section>
        )
    }

    function renderRatings() {
        return (
            <Section
                title="Ratings"
                containerStyle={{
                    marginTop: 40
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    {constants.ratings.map((item, index) => {
                        return (
                            <TextIconButton
                                key={`Ratings-${index}`}
                                containerStyle={{
                                    flex: 1,
                                    height: 50,
                                    margin: 5,
                                    alignItems: 'center',
                                    borderRadius: SIZES.base,
                                    backgroundColor: item.id == ratings ? COLORS.primary : COLORS.lightGray2
                                }}
                                label={item.label}
                                labelStyle={{
                                    color: item.id == ratings ? COLORS.white : COLORS.gray
                                }}
                                icon={icons.star}
                                iconStyle={{
                                    tintColor: item.id == ratings ? COLORS.white : COLORS.gray
                                }}
                                onPress={() => setRatings(item.id)}
                            />
                        )
                    })}
                </View>
            </Section>
        )
    }

    function renderTags() {
        return (
            <Section
                title="Tags"
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}
                >
                    {constants.tags.map((item, index) => {
                        return (
                            <TextButton
                                key={`Tags-${index}`}
                                label={item.label}
                                labelStyle={{
                                    color: item.id == tags ? COLORS.white : COLORS.gray,
                                    ...FONTS.body3
                                }}
                                buttonContainerStyle={{
                                    height: 50,
                                    margin: 5,
                                    paddingHorizontal: SIZES.padding,
                                    alignItems: 'center',
                                    borderRadius: SIZES.base,
                                    backgroundColor: item.id == tags ? COLORS.primary : COLORS.lightGray2
                                }}
                                onPress={() => setTags(item.id)}
                            />
                        )
                    })}
                </View>
            </Section>
        )
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.transparentBlack7
                }}
            >
                {/* Transparent Background */}
                <TouchableWithoutFeedback
                    onPress={() => setShowAddToCartModal(false)}
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                    />
                </TouchableWithoutFeedback>

                <Animated.View
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: modalY,
                        width: "100%",
                        height: "100%",
                        padding: SIZES.padding,
                        borderTopRightRadius: SIZES.padding,
                        borderTopLeftRadius: SIZES.padding,
                        backgroundColor: COLORS.white
                    }}
                >
                    {/* Header */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >

                        <Image
                            source={product?.image || product?.photo}
                            style={{
                                flex: 1,
                                margin: 10,
                                height: 150,
                                width: 150
                            }}
                        />
                            <View style={{flex: 2, marginTop:10}}>
                            <Text style={{  ...FONTS.h3, fontSize: 20 }}>{product?.name}</Text>
                            <Text style={{  ...FONTS.h6, fontSize: 11 }}>{product?.description}</Text>
                            </View>
                    </View>

                   

                    {/* Apply Button */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: Platform.OS === 'ios' ? (SIZES.height > 700 ? 360 : 200) : 340,
                            left: 0,
                            right: 0,
                            height: 110,
                            paddingHorizontal: SIZES.padding,
                            paddingVertical: SIZES.radius,
                            backgroundColor: COLORS.white
                        }}
                    >
                        <TextButton
                            label="Add To Cart"
                            buttonContainerStyle={{
                                height: 50,
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.primary
                            }}
                            onPress={() => console.log("Add To Cart")}
                        />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

export default AddToCartModal;