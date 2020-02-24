import React, { Component } from 'react';
import {TouchableOpacity, Text, View, StyleSheet, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    mainButtons: {
        alignItems: 'center',
        width: 300,
        backgroundColor: '#1563ea',
        flex: 1,
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 15
    },
    buttonsText: {
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    busContainer: {
        flex: 2,
        alignItems: 'center'
    },
    bus: {
        paddingTop: 20
    }
  });
  
export default class HomeScreen extends Component {
    static navigationOptions = {
      header: null,
    };
    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={require('./../imagenes/loginbackground.jpeg')} style={{flex: 2, width: '100%', height: '100%'}}></ImageBackground>
                <View style={{flex: 3}}>
                    <View style={{flex: 3}}>
                        <TouchableOpacity style={styles.mainButtons}
                            onPress={() => null}>
                            <Text style={styles.buttonsText}>Iniciar sesion</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainButtons}
                            onPress={() => null}>
                            <Text style={styles.buttonsText}>Registrarse</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainButtons}
                            onPress={() => this.props.navigation.navigate('NavigationMap')}>
                            <Text style={styles.buttonsText}>Entrar como invitado</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.busContainer}>
                        <Icon name="bus" style={styles.bus} size={100}/>
                    </View>
                </View>
            </View>
        );
    }
}