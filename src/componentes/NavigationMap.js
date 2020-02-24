import React, { Component } from 'react';
import {TouchableOpacity, Button, Text, View, StyleSheet, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Map extends Component {
  static navigationOptions = {
    header: null,
  };
  render () {
    return (
      <View>
        <Button
          title="Volver"
          color="#841584"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <MapView
          initialRegion={{
            latitude: this.userLatitude,
            longitude: this.userLongitude,
          }}
      />
      </View>
    )
  };
}