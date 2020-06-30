import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native'
import { Formik } from 'formik'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import globalFn from './../global.js'

const BLUE   = '#1563ea',
    styles  = StyleSheet.create({
    input: {
        height: 40,
        borderColor: BLUE,
        borderWidth: 0.5,
        borderRadius: 3,
        marginBottom: 5,
        padding: 10
    },
    button: {
        backgroundColor: BLUE,
        padding: 11,
        borderRadius: 3,
        alignItems: 'center',
    },
    busContainer: {
        backgroundColor: BLUE,
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    formContainer: {
        flex: 2,
        backgroundColor: 'white',
        padding: 15,
    }
})
export default class Login extends Component {
    submit = (values) => {
        if(!values.mail) {
            globalFn.showAlert({
                text  : 'Escriba su correo'
            })
            return
        }
        if(!values.password) {
            globalFn.showAlert({
                text  : 'Escriba su contraseña'
            })
            return
        }

        if(!globalFn.isValidEmail(values.mail)) {
            globalFn.showAlert({
                text  : 'Escriba un correo válido'
            })
            return
        }

        globalFn.request({
            url      : globalFn.localhost + 'login',
            method   : 'POST',
            body     : values,
            callback : (response) => {
                if(!response.success) {
                    globalFn.showAlert({
                        title : 'No se pudo iniciar sesión',
                        text  : response.body
                    })
                    return
                }
                this.props.navigation.navigate('postLogin', response.body)
            }
        })
    }
    render() {
        return(
            <View style={{
                flex: 1,
              }}>
                <View style={styles.busContainer}>
                    <Icon name='directions-bus' size={280}/>
                </View>
                <View style={styles.formContainer}>
                    <Formik
                        initialValues = {{mail: '', password: ''}}
                        onSubmit      = {(values) => this.submit(values)}
                    >
                        {(props) => (
                            <View style={{paddingTop: 20}}>
                                <TextInput
                                    style        = {styles.input}
                                    placeholder  = 'Correo'
                                    onChangeText = {props.handleChange('mail')}
                                    value        = {props.values.mail}   
                                />
                                <TextInput
                                    style           = {styles.input}
                                    placeholder     = 'Contraseña'
                                    onChangeText    = {props.handleChange('password')}
                                    value           = {props.values.password}
                                    secureTextEntry = {true}   
                                />
                                <TouchableOpacity
                                    style   = {styles.button}
                                    onPress = {props.handleSubmit}
                                >
                                    <Text style={{color: 'white'}}>Ingresar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        )
    }
}