import React, { Component } from 'react'
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native'
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
        this.setState({pressReady: true, showRoute: false})
        globalFn.showAlert({text: 'Toque una parte del mapa para elegir destino'})
    }
    renderRoute = () => {
        if(!(this.state.destination) || !(this.state.showRoute)) return
        console.log('rutas', this.state.routes)
        const selectedRoute = this.state.routes[0],
                routeText   = `${selectedRoute.recorrido}\nTiempo estimado: 5 minutos\nSiga las instrucciones del mapa para llegar`
                globalFn.showAlert({title: 'RUTA SUGERIDA', text: routeText})

        const points = {
            lat  : selectedRoute.lat.split(';'),
            long : selectedRoute.long.split(';')
        } 

        if(points.lat.length !== points.long.length) {
            console.log('La ruta no posee la misma cantidad de coordenadas para latitud y longitud.')
            return 
        }
        
        let coordinates = []
        for(let i = 0; i < points.lat.length; i++) {
            coordinates = [...coordinates, {
                latitude  : parseFloat(points.lat[i]),
                longitude : parseFloat(points.long[i])
            }]
        }
        
        const getDistance = (point) => {
            return (Math.pow(point.latitude, 2) + Math.pow(point.longitude, 2))
        }

        const destinationDistance = getDistance(this.state.destination)
        const walkPoint = coordinates.reduce((a, b) => {
            return Math.abs(getDistance(b) - destinationDistance) < Math.abs(getDistance(a) - destinationDistance) ? b : a;
        })

        try {
            if(this.props.route) {
                if(this.props.route.params) {
                    globalFn.request({
                        url      : globalFn.localhost + 'history',
                        method   : 'POST',
                        body     : {...this.state.destination, ...selectedRoute, idUser: this.route.params.id},
                        callback : (response) => {
                            console.log('response', response)
                        }
                    })
                }
            }
        }
        catch(err) {
            console.log('err', err)
        }

        return (
            <View>
                <Polyline 
                    coordinates={coordinates} 
                    strokeColor={'blue'} 
                    strokeWidth={1.5} 
                    lineCap={'round'} 
                    lineJoin='round'>
                </Polyline>
                <Polyline 
                    coordinates={[
                        {latitude: this.state.destination.latitude, longitude: this.state.destination.longitude},
                        {latitude: walkPoint.latitude, longitude: walkPoint.longitude}
                    ]}
                    strokeColor={'red'}>
                </Polyline>
                <Polyline 
                    coordinates={[
                        {latitude: 4.158006, longitude: -73.636731},
                        {latitude: coordinates[4].latitude, longitude: coordinates[4].longitude}
                    ]}
                    strokeColor={'black'}>
                </Polyline>
            </View>
        )
    }
    renderDestination = () => {
        if(!this.state.destination) return
        console.log('destino', this.state.destination)
        return (
            <MapView.Marker
                coordinate={{ latitude: this.state.destination.latitude, longitude: this.state.destination.longitude }}
                title     ={'Destino'}
            />
        )
    }
    state = {
        destination : false,
        pressReady  : false,
        showRoute   : false,
        routes      : [],
        userLat     : 0,
        userLong    : 0
    }
    componentDidMount() {
        globalFn.request({
            url      : globalFn.localhost + 'routes',
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
                this.setState({userLat: position.coords.latitude})
                this.setState({userLong: position.coords.longitude})
            },
            (error) => {
                console.log(error)
                globalFn.showAlert({text: error.message })
            },
            {enableHighAccuracy: true},
        )
    }
    render() {
        const currentLocation = {
            latitude : this.state.userLat,
            longitude: this.state.userLong
        }
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
                                this.setState({showRoute: true})
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
                            latitudeDelta: 0.055,
                            longitudeDelta: 0.0521,
                        }}
                    >
                        <MapView.Marker
                            coordinate = {currentLocation}
                            pinColor   = {'blue'}
                            title      = 'Ubicación actual'
                        />
                        {this.renderDestination()}
                        {this.renderRoute()}
                        </MapView>
                </View>
            </View>
        )
    }
}