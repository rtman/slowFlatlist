import createReducer from '../lib/createReducer'
import * as types from '../Actions/types'
import update from 'immutability-helper'
import React from 'react';

const initialState = {
    items:{
        count: 0
    }
}

//function names = state name
export function cart(state = initialState, action) {
	//console.log('cartContents action', action)
    switch (action.type) {
        case 'UPDATE_CART':
            return update(state, {
                $set: {
                    items: action.cart.items
                }
            })

    	case 'SET_CART_FROM_STORAGE':
            return update(state, {
                $set : action.storedCart
            })
        default:
            return state;
    }
}