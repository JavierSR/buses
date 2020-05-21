import React, { Component } from 'react'
import {TouchableOpacity, Text, View, StyleSheet, Alert} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialIcons'
import globalFn from './../global'
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        padding: 7,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5
    },
    menuIcon: {
        position: 'absolute',
        left: 10,
        top: 10
    },
    usernameContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        fontSize: 22
    },
    choose: {
        flex: 1,
        padding: 5,
        backgroundColor: '#1563ea',
        borderRadius: 5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        justifyContent: 'center',
        position: 'relative',
        alignItems: 'center'
    },
    chooseIcon: {
        position: 'absolute',
        color: 'white',
        left: 3,
        top: 4
    },
    chooseText: {
        color: 'white',
        fontSize: 15,
        paddingLeft: 20
    },
    generate: {
        flex: 1,
        padding: 5,
        backgroundColor: '#122018',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        justifyContent: 'center',
        position: 'relative',
        alignItems: 'center'
    },
    generateIcon: {
        position: 'absolute',
        color: 'white',
        right: 3,
        top: 4
    },
    generateText: {
        color: 'white',
        fontSize: 15,
        paddingRight: 20
    }
})

export default class extends Component {
    selectLocation = () => {
        this.setState({pressReady: true})
        globalFn.showAlert({text: 'Toque una parte del mapa para elegir destino'})
    }
    renderRoute = () => {
        if(!this.state.destination) return
        return (
            <Polyline>

            </Polyline>
        )
    }
    renderDestination = () => {
        if(!this.state.destination) return
        console.log(this.state.destination)
        return (
            <MapView.Marker
                coordinate={{ latitude: this.state.destination.latitude, longitude: this.state.destination.longitude }}
            />
        )
    }
    state = {
        destination : false,
        pressReady  : false,
        routes      : []
    }
    componentDidMount() {
        globalFn.request({
            url      : 'http://192.168.1.4:3100/routes',
            method   : 'GET',
            callback : (response) => {
                if(!response.success) {
                    globalFn.showAlert({
                        title : 'No se pudieron cargar las rutas',
                        text  : response.body
                    })
                    return
                }
                this.setState({routes: response.body})
            }
        })
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({userLocation: position})
            },
            (error) => {
                console.log(error)
                globalFn.showAlert({text: error.message })
            },
            {enableHighAccuracy: true},
        )
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <View 
                        style={styles.menuIcon}
                    >
                        <Icon 
                            onPress = {this.props.navigation.openDrawer}
                            name='menu' 
                            size={40}
                        />
                    </View>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.username}>{this.props.route.params ? this.props.route.params.nombres : 'Invitado' }</Text>
                    </View>
                </View>
                <View style={styles.title}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style={styles.choose} onPress={this.selectLocation}>
                            <Icon style={styles.chooseIcon} name='location-on' size={32}/>
                            <Text style={styles.chooseText}>Elegir destino</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity 
                            style={styles.generate} 
                            onPress={() => {
                                if (!this.state.destination) {
                                    globalFn.showAlert({text: 'Seleccione primero un destino'})
                                    return
                                }
                                setTimeout(() => {
                                    Alert.alert('No se puede conectar con el servidor', `Destino ${this.state.destination.longitude}, ${this.state.destination.latitude}`)
                                }, 2500)
                            }}
                        >
                            <Text style={styles.generateText}>Generar ruta</Text>
                            <Icon style={styles.generateIcon} name='directions-bus' size={32}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 14}}>
                    <MapView
                        onPress = {(args) => {
                            if (this.state.pressReady) {
                                this.setState({destination: args.nativeEvent.coordinate})
                                this.setState({pressReady: false})
                            }
                        }}
                        provider = {PROVIDER_GOOGLE}
                        style    = {styles.map}
                        region   = {{
                            latitude: 4.15,
                            longitude: -73.633,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                    {this.renderRoute()}
                    {this.renderDestination()}
                    </MapView>
                </View>
            </View>
        )
    }
}