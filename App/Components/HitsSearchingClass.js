import React, {PureComponent, Component} from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors, Styles } from '../themes/colors';
import Separator from './Separator';
import { Highlight } from './Highlight'
import QuantityButton from './QuantityButton'
import Swipeable from 'react-native-swipeable';
import { InstantSearch, Index } from 'react-instantsearch/native';
import { 
  connectInfiniteHits,
  connectStateResults
  } from 'react-instantsearch/connectors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../Actions'

class ListItem extends React.Component {
  constructor(props){
    super(props)
    this.swipeable = null;
  }

  render(){
    console.log('HitsSearchingClass - ListItem - this.props', this.props)
    //console.log('HitsSearchingClass - ListItem - this.state', this.state)
    console.log('HitsSearchingClass - ListItem - Render')
    const {item} = this.props

    const RenderNormalRow = () => {
      const Price = () => {
        if(item.showPrices){
            return item.price
        } else {
          return `RFQ`
        }
      }

      console.log('HitsSearchingClass - ListItem - RenderNormalRow - Render')
      return (
          <View style={{flex:1, flexDirection: 'column'}}>
            <View style={styles.imageAndTextContainer}>
              <View style={{flexDirection: 'row',flex: 1, flexWrap: 'wrap'}}>
                  <Image 
                    source={{ uri: item.image}} 
                    style={styles.image}
                    resizeMode={'cover'}/>
                <View style={{flex: 1, flexWrap: 'wrap', justifyContent: 'flex-start', paddingLeft: 8, flexDirection: 'column'}}>
                  <Text style={styles.itemName}>
                    {item.name}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 8, justifyContent: 'space-between'}}>
              <View style={{paddingRight: 10}}>
                <Text style={styles.itemDescription}>
                  {item.description}
                </Text>
              </View>
              <QuantityButton
                {...this.props}
                {...this.state}/>
            </View>
          </View>
      ); 
    }

    console.log('HitsSearchingClass - ListItem - Render')
    return(
      <View>
        <Swipeable onRef={ref => this.swipeable = ref}
            rightButtons={[
                <TouchableOpacity onPress={() => this.props.messageAboutItem(item)} style={styles.rightSwipeItem}>
                    <Text> Message </Text>
                </TouchableOpacity>
            ]}
            onRightButtonsOpenRelease={this.props.onOpen}
            onRightButtonsCloseRelease={this.props.onClose}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <RenderNormalRow/>
                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{color: Colors.secondaryColor}}> Drag </Text>
                </View>
              </View>
        </Swipeable>
      </View>
    )
  }
}

class HitsSearching extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      currentlyOpenSwipeable: null,
      isSwiping: false,
      loading: false,
      onEndReached: false,
    }
    this.onEndReachedEnabled = false
  }

  setSwipingState = (value) => {
      this.setState({
          isSwiping: value
      })
  }

  onSelect(variantsIndex, data){
    return null
  }

  messageAboutItem = (item) => {
    return null
  }


  componentWillReceiveProps(nextProps){
    if(this.props.searching === true && nextProps.searching === false){
      if(this.onEndReachedEnabled){
        this.onEndReachedEnabled = false
      }
    }
  }

  render(){
    //console.log('HitsSearchingClass - this.props', this.props)
    //console.log('HitsSearchingClass - this.props.hits', this.props.hits)
    console.log('HitsSearchingClass Render')
    const {currentlyOpenSwipeable} = this.state;
    const itemProps = {
        onOpen: (event, gestureState, swipeable) => {
            if (this.state.currentlyOpenSwipeable && this.state.currentlyOpenSwipeable !== swipeable) {
                this.state.currentlyOpenSwipeable.recenter();
            }

            this.setState({currentlyOpenSwipeable: swipeable});
        },
        onClose: () => this.setState({currentlyOpenSwipeable: null})
    };
    const onEndReached = () => {
      console.log('HitsSearchingClass - onEndReached triggered')
      if (this.props.hasMore) {
        this.onEndReachedEnabled = true;
        this.props.refine();
      }
    };

    //console.log('HitsSearchingClass Render')
    return(
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.hits}
          onEndReached={() => {onEndReached()}}
          onEndReachedThreshold={0.7}
          keyExtractor={(item) => item.objectID}
          ItemSeparatorComponent={Separator}
          extraData={this.props.cart}
          scrollEnabled={!this.state.isSwiping}
          renderItem={({ item }) => (
            <ListItem
              {...itemProps}
              onPressHit={this.props.onPressHit}
              onPressCompanyName={this.props.onPressCompanyName}
              fieldOne={this.props.fieldOne}
              fieldTwo={this.props.fieldTwo}
              fieldThree={this.props.fieldThree}
              item={item}
              messageAboutItem={this.messageAboutItem}/>
          )}
        />
      </View>
    );
  }
}


const HitsConnected =  connectInfiniteHits(connectStateResults(HitsSearching));

//redux

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    user: state.user,
    contacts: state.contacts
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HitsConnected);

const styles = StyleSheet.create({
  itemHeader1: {
      //marginLeft: 12,
      fontSize: 14,
      color: Colors.primaryTextColor
  },
  itemHeader2: {
      //marginLeft: 12,
      fontSize: 11,
      color: Colors.primaryTextColor,
      flexWrap: 'wrap'
  },
  itemName: {
      //marginLeft: 12,
      fontSize: 14,
      color: Colors.primaryTextColor
  },
  itemSize: {
      //marginLeft: 12,
      marginTop: 8,
      fontSize: 14,
      color: Colors.primaryTextColor
  },
  companyName: {
      //marginLeft: 12,
      fontSize: 11,
      color: Colors.secondaryColor,
      flexWrap: 'wrap'
  },     
  itemDescription: {
      //marginLeft: 12,
      fontSize: 11,
      color: Colors.primaryTextColor
  },
  itemRowsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginTop: 8,
    //marginLeft: 0,
    //marginBottom: 8,
    padding: 8,
  },
  itemRowsContainerUnavailable: {
    backgroundColor: Colors.lightGray,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginTop: 8,
    //marginLeft: 0,
    //marginBottom: 8,
    padding: 8,
  },
  imageAndTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textColumnContainer: {
    flexDirection: 'column',
    marginLeft: 2
  },
  cartQuantityButton: {
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
    backgroundColor: Colors.secondaryColor,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    width: 100,
    height: 100,
    justifyContent: 'flex-start',
    paddingLeft: 8
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: Colors.secondaryColor
  }
});