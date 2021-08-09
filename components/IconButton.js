import React from 'react';
import {
    TouchableOpacity,
    Image
} from 'react-native';
import { COLORS } from '../constants';

const IconButton = ({ containerStyle, icon, iconStyle, onPress }) => {

    return (
        <TouchableOpacity
            style={{
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.white,
                    ...iconStyle
                }}
            />
        </TouchableOpacity>
    )
}

export default IconButton;