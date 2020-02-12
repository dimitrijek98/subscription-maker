import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class InfoCard extends Component {
  render() {
    return (
      <View style={style.cardContainer}>
        <View style={style.headerContainer}>
          <Text style={style.headerText}>{this.props.headerText}</Text>
        </View>
        <View style={style.bodyContainer}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  cardContainer: {
    width: '100%',
    marginBottom: 30,
    backgroundColor: '#F5F6FF',
    borderRadius: 10,
    elevation: 10,
  },
  headerContainer: {
    backgroundColor: '#2D4174',
    borderRadius: 10,
    borderColor: '#F5F6FF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#F5F6FF',
  },
  bodyContainer: {
    padding: 30,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default InfoCard;
