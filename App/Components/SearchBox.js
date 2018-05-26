import React from 'react';
import {
  connectSearchBox,
} from 'react-instantsearch/connectors';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { Colors, Styles } from '../themes/colors'

export class SearchBoxClass extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
      const styles = {
        searchBarContainer: {
          //flex: 1,
          flexDirection: 'row',
          minHeight: 40,
          borderWidth: Styles.borderWidth,
          borderColor: Colors.border,
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        },
        searchBar: {
          flex: 1,
          fontSize: 14,
          paddingLeft: 10,
          color: Colors.secondaryColor
        }
      };
    return(
        <View style={styles.searchBarContainer}>
          <TextInput
            ref={'itemSearch'}
            style={styles.searchBar}
            onChangeText={text => this.props.refine(text)}
            value={this.props.currentRefinement}
            placeholder={'Search ...'}
            placeholderTextColor={Colors.secondaryColor}
            clearButtonMode={'always'}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize={'words'}
            keyboardShouldPersistTaps='always'
          />
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={(text) => {this.refs.itemSearch.clear(), this.props.refine('')}}>
                  <Text> X </Text>
              </TouchableOpacity> 
          </View>
        </View>
    )
  }
}


export const SearchBox = connectSearchBox((props) => {
    console.log('SearchBox - props', props)
    return(
        <SearchBoxClass refine={props.refine} currentRefinement={props.currentRefinement} setSearchBoxFocus={props.setSearchBoxFocus}/>
    )
})

const styles = StyleSheet.create({
  searchBarContainer: {
    //flex: 1,
    flexDirection: 'row',
    minHeight: 40,
    borderWidth: Styles.borderWidth,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 10,
    color: Colors.secondaryColor
  }
})