import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Colors, Styles } from '../themes/colors'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../Actions'

export class QuantityButton extends React.Component {
  constructor(props){
    super(props)

    this.state={
      doRender: true,
      isCart: true
    }
  }

  doInit(){
    this.setState({
      objectID: this.props.item.objectID,
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.doInit()
    }
  }

  componentWillMount(){
    this.doInit()
  }

  increment(){
    this.props.incrementCartItem(this.props.cart, this.props.item)
  }

  decrement(){
    this.props.decrementCartItem(this.props.cart, this.props.item)
  }

  RenderCartButtons = () => {
    //console.log('HitsSearchingClass - QuantityButtons - CartButtons Rendered')
    if(this.props.cart.items[this.props.item.objectID] === undefined){
      return(
        <TouchableOpacity onPress={() => this.increment()}>
          <View style={styles.addButton}>
            <Text style={{color: Colors.secondaryColor}}> + </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={styles.QuantityButton}>
          <TouchableOpacity style={{paddingRight: 8, paddingLeft: 8}} onPress={() => this.decrement()}>
             <Text style={{color: Colors.primaryGrayColor}}> {this.props.cart.items[this.state.objectID].quantity > 1 ? '-' : 'X'}</Text>
          </TouchableOpacity>
          <Text style={[styles.itemHeader1, {color: Colors.primaryGrayColor}]}>
            {this.props.cart.items[this.state.objectID].quantity}
          </Text>
          <TouchableOpacity style={{paddingRight: 8, paddingLeft: 8}} onPress={() => this.increment()}>
            <Text style={{color: Colors.primaryGrayColor}}> + </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render(){

    // when adding items to the shopping cart
    //console.log('HitsSearchingClass - QuantityButtons - Render - this.props', this.props)
    //console.log('HitsSearchingClass - QuantityButtons - Render - this.state', this.state)
    console.log('HitsSearchingClass - QuantityButtons - Render')
    if(this.state.doRender){
        return this.RenderCartButtons()
    } else {
      return null
    }
  }
}

//redux

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    addedItems: state.addedItems
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuantityButton);


const styles = StyleSheet.create({
  QuantityButton: {
    backgroundColor: Colors.secondaryColor,
    width: 90,
    height: 35,
    //paddingRight: 8,
    //paddingLeft: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cartNAButton: {
    backgroundColor: Colors.secondaryColor,
    width: 35,
    height: 35,
    //paddingRight: 8,
    //paddingLeft: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  addButton: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.secondaryColor,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  }
})