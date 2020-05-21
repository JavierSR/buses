import React, { Component } from 'react'
import {TouchableOpacity, Text, View, StyleSheet, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
    buttonsContainer: {
        flex: 3,
        paddingTop: 20
    },
    mainButtons: {
        width: 300,
        backgroundColor: '#1563ea',
        flex: 1,
        padding: 15,
        alignItems: 'center',
        borderRadius: 6,
        marginHorizontal: 30,
        marginVertical: 15
    },
    buttonsText: {
        alignItems: 'center',
        color: 'white',
        fontSize: 16
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
    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={require('./../imagenes/loginbackground.jpeg')} style={{flex: 2, width: '100%', height: '100%'}}></ImageBackground>
                <View style={styles.buttonsContainer}>
                    <View style={{flex: 3}}>
                        <TouchableOpacity style={styles.mainButtons}
                            onPress={() =>this.props.navigation.navigate('Login')}>
                            <Text style={styles.buttonsText}>Iniciar sesion</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainButtons}
                            onPress={() =>this.props.navigation.navigate('Register')}>
                            <Text style={styles.buttonsText}>Registrarse</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainButtons}
                            onPress={() => this.props.navigation.navigate('postLogin')}>
                            <Text style={styles.buttonsText}>Entrar como invitado</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.busContainer}>
                        <Icon name='directions-bus' style={styles.bus} size={80}/>
                    </View>
                </View>
            </View>
        );
    }
}