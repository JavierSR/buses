import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NavigationMap from './navigationMap'
import About from './about'

const Drawer = createDrawerNavigator();

const logOut = (props) => {
    props.navigation.navigate('Home')
    return null
}
export default (params) => {
    return (
        <Drawer.Navigator initialRouteName="Mapa">
            <Drawer.Screen name="Mapa" component={NavigationMap} initialParams={params.route.params}/>
            {params.route.params ? <Drawer.Screen name="Favoritos" component={NavigationMap} /> : null}
            {params.route.params ? <Drawer.Screen name="Historial" component={NavigationMap} /> : null}
            <Drawer.Screen name="Acerca de" component={About} />
            <Drawer.Screen name="Cerrar sesión" component={logOut} />
        </Drawer.Navigator>
    )
}