import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING, DESTROY_CART } from './actionTypes/actionTypes';

const initState = {
    cartItems: [],
    addedItems:[],
    total: 0,
    restaurant_id: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = action.payload

          //check if the action id exists in the addedItems
         let existed_item= state.cartItems.find(item=> addedItem.id === item.id)
         if(existed_item)
         {
            
            let new_cartItems = state.cartItems.filter(item=> addedItem.id !== item.id)
            
            
            existed_item.quantity += addedItem.quantity;


             return{
                ...state,
                cartItems: [...new_cartItems, existed_item],
                 total: state.total + (addedItem.price * addedItem.quantity),
                 restaurant_id: addedItem.restaurant_id
                  }
        }
         else{
            
            //calculating the total
            let newTotal = state.total + (addedItem.price * addedItem.quantity)
            
            return{
                ...state,
                cartItems: [...state.cartItems, addedItem],
                total : newTotal,
                restaurant_id: addedItem.restaurant_id
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.cartItems.find(item=> action.payload.id === item.id)
        let new_cartItems = state.cartItems.filter(item=> action.payload.id !== item.id)
        
        //calculating the total

        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        
        if (new_cartItems.length == 0) {
            newTotal = 0
        }
       
        return{
            ...state,
            cartItems: new_cartItems,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.cartItems.find(item=> item.id === action.payload)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.cartItems.find(item=> item.id === action.payload) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_cartItems = state.addedItems.filter(item=>item.id !== action.payload)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_cartItems,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }
    if(action.type=== DESTROY_CART){  
       
        return {
            cartItems: [],
            addedItems:[],
            total: 0,
            restaurant_id: 0
        }
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer