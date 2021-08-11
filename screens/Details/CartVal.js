import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux'
const CartVal = ({cartItems, style}) => {

    
    React.useEffect(() => {

        }, [cartItems]);
      
    
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text style={style}>{cartItems?.length}</Text>
        </View>
    )
}

const mapStateToProps = (state)=>{
    return {
      cartItems: state.cartReducer.cartItems
    }
  }
  const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (item) =>{return dispatch(addToCart(item))}
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(CartVal)