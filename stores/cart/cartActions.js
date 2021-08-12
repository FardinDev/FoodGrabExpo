import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from './actionTypes/actionTypes';
//add cart action
// export const addToCart= (id)=>{

//     console.log(id);
//     return{
//         type: ADD_TO_CART,
//         id
//     }
// 
export const addToCartSuccess = (item) => ({
    type: ADD_TO_CART,
    payload:  item 
})

export function addToCart(item) {
    
    return dispatch => {
        dispatch(addToCartSuccess(item))
    }
}
//remove item action
// export const removeItem=(id)=>{
//     return{
//         type: REMOVE_ITEM,
//         id
//     }
// }
// //subtract qt action
// export const subtractQuantity=(id)=>{
//     return{
//         type: SUB_QUANTITY,
//         id
//     }
// }
// //add qt action
// export const addQuantity=(id)=>{
//     return{
//         type: ADD_QUANTITY,
//         id
//     }
// }



export const addQuantitySuccess = (id) => ({
    type: ADD_QUANTITY,
    payload:  id 
})

export function addQuantity(id) {
    
    return dispatch => {
        dispatch(addQuantitySuccess(id))
    }
}

export const subQuantitySuccess = (id) => ({
    type: SUB_QUANTITY,
    payload:  id 
})

export function subQuantity(id) {
    
    return dispatch => {
        dispatch(subQuantitySuccess(id))
    }
}

export const removeItemSuccess = (item) => ({
    type: REMOVE_ITEM,
    payload:  item 
})

export function removeItem(item) {
    
    return dispatch => {
        dispatch(removeItemSuccess(item))
    }
}