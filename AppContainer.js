import React, {PureComponent, Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Colors, Styles } from './App/themes/colors'
import Separator from './App/Components/Separator';
import { InstantSearch } from 'react-instantsearch/native';
import HitsConnected from './App/Components/HitsSearchingClass'
import {SearchBox} from './App/Components/SearchBox'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from './App/Actions'

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);        
    this.state = {
      data: [],
      searchBoxFocused: false
    };
  }

  render() {
    return(
      <View style={styles.container}>
        <InstantSearch
          appId="latency"
          apiKey="6be0576ff61c053d5f9a3225e2a90f76"
          indexName="ikea"
            root={{
              Root: View,
              props: {
                style: {
                  flex: 1
                }
              }
            }}>
              <SearchBox/>
              <HitsConnected
                  uid={'1234567890'}
                  searchBoxFocused={this.state.searchBoxFocused}/>
        </InstantSearch>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: Colors.background
    }
})


//redux

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null,mapDispatchToProps)(AppContainer);
