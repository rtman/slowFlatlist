import * as types from './types'
import { AsyncStorage } from 'react-native'

function updateCart(cart){
  return {
    type: types.UPDATE_CART,
    cart
  }  
}

export function deleteCartItem(cart, item){
  return dispatch => {
    delete cart.items[item.objectID]
    cart.items.count -= 1 
    console.log('POST DELETE cart', cart)
    try {
      AsyncStorage.setItem('@GetItStore:cart', JSON.stringify(cart))
        .then(() => {
          console.log('AsyncStorage Cart DELETE_ITEM');
          dispatch(updateCart(cart))
        })
    } catch (error) {
        console.log('No AsyncStorage for cart found', error);
    }
  }  
}

export function incrementCartItem(cart, item){
  return dispatch => {
    if(cart.items.hasOwnProperty([item.objectID])) {
      cart.items[item.objectID].quantity += 1
    } else {
      cart.items[item.objectID] = {
        quantity: 1,
        price: item.price,
        objectID: item.objectID,
        name: item.name,
        size: item.size,
        description: item.description,
        image: item.image,
        notes: ''
      }
      cart.items.count= cart.items.count + 1
    }
    try {
      AsyncStorage.setItem('@GetItStore:cart', JSON.stringify(cart))
        .then(() => {
          console.log('AsyncStorage Cart INCREMENT_ITEM', cart);
          dispatch(updateCart(cart))
        })
    } catch (error) {
        console.log('No AsyncStorage for cart found', error);
    }
  }
}


export function decrementCartItem(cart,item){
  return dispatch => {
    if(cart.items[item.objectID].quantity > 1) {
      cart.items[item.objectID].quantity -= 1
    } else if(cart.items[item.objectID].quantity === 1){
        delete cart.items[item.objectID]
        cart.items.count -= 1
    }
    try {
      AsyncStorage.setItem('@GetItStore:cart', JSON.stringify(cart))
        .then(() => {
          console.log('AsyncStorage Cart DECREMENT_ITEM');
          dispatch(updateCart(cart))
        })
    } catch (error) {
        console.log('No AsyncStorage for cart found', error);
    }
  }  
}

export function emptyCart() {
  return dispatch => {
    cart = {
      items: {
        count: 0
      }
    }
    try {
      AsyncStorage.setItem('@GetItStore:cart', JSON.stringify(cart))
        .then(() => {
          console.log('AsyncStorage Cart reset');
          dispatch(updateCart(cart)) 
        })
    } catch (error) {
        console.log('No AsyncStorage for cart found', error);
    }
  }
}
