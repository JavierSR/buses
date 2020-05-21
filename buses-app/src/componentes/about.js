import React, { Component } from 'react'
import {Text, View, StyleSheet, ImageBackground, Linking, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
    infoContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        color: '#fff',
        paddingLeft: 10
    },
    icon: {
        color: '#fff'
    }
})

export default class extends Component {
    render() {
        return(
            <View style={{flex: 1}}>
                <ImageBackground source={require('./../imagenes/loginbackground.jpeg')} style={{flex: 2, width: '100%', height: '100%'}}></ImageBackground>
                <View style={{
                    paddingLeft: 25,
                    paddingRight: 25,
                    paddingBottom: 25,
                    flex: 3,
                }}>
                    <View style={{
                        flex: 2,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                            Aplicación para consulta de rutas de buses en la ciudad de Villavicencio.
                            Creado por Oscar Sandoval con la asesoria de Ing. Alexander Peñuela. 
                            Corporación universitaria Minuto de Dios. 2020.
                        </Text>
                    </View>
                    <View style={{
                        padding: 10,
                        backgroundColor: '#1563ea',
                        borderRadius: 15,
                        flex: 3
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end'
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                color: '#fff',
                                fontWeight: 'bold',
                            }}>CONTACTO</Text>
                        </View>
                        <View style={{
                            flex: 3,
                            justifyContent: 'center'
                        }}>
                            <TouchableOpacity 
                                style={styles.infoContainer}
                                onPress={() => Linking.openURL('tel:+573213068377')}
                            >
                                <Icon style={styles.icon} name='local-phone' size={30}/>
                                <Text style={styles.infoText}>3213068377</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.infoContainer}
                                onPress={() => Linking.openURL('mailto:oscar.javier.sandoval.royero@gmail.com')}
                            >
                                <Icon style={styles.icon} name='email' size={30}/>
                                <Text style={styles.infoText}>Correo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.infoContainer}
                                onPress={() => Linking.openURL('https://github.com/JavierSR')}
                            >
                                <Icon style={styles.icon} name='code' size={30}/>
                                <Text style={styles.infoText}>Github</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}