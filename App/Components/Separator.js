import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Colors, Styles } from '../themes/colors'

export default class MyTextField extends Component {
    render() {
        return (
            <View style={styles.container} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1,
        backgroundColor: Colors.secondaryGrayColor,
        alignSelf: 'stretch'
    },
})