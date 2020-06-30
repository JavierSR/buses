import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text} from 'react-native'
import { Formik } from 'formik'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import globalFn from './../global'

const BLUE   = '#1563ea',
    styles  = StyleSheet.create({
    input: {
        height: 40,
        padding: 10,
        borderColor: BLUE,
        borderWidth: 0.5,
        borderRadius: 3,
        marginBottom: 10,
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
        justifyContent: 'center'
    },
    formContainer: {
        flex: 4,
        backgroundColor: 'white',
        padding: 15,
    }
})
export default class Register extends Component {
    submit = (values) => {
        let emptyFields = []
        if(!values.firstName.length) {
            emptyFields = [...emptyFields, 'Nombres']
        }

        if(!values.lastName.length) {
            emptyFields = [...emptyFields, 'Apellidos']
        }

        if(!values.password.length) {
            emptyFields = [...emptyFields, 'Contraseña']
        }

        if(!values.mail.length) {
            emptyFields = [...emptyFields, 'Correo']
        }

        if(emptyFields.length) {
            globalFn.showAlert({
                title : 'Rellene todos los campos',
                text  : emptyFields.join(', ')  
            })
            return
        }

        if(!globalFn.isValidEmail(values.mail)) {
            globalFn.showAlert({
                text  : 'Ingrese un correo válido'  
            })
            return
        }

        globalFn.request({
            url      : globalFn.localhost + 'register',
            method   : 'POST',
            body     : values,
            callback : (response) => {
                if(!response.success) {
                    globalFn.showAlert({
                        title : 'Registro incompleto',
                        text  : response.body
                    })
                    return
                }

                globalFn.showAlert({
                    title : 'Registro exitoso',
                    fn    : () => {
                        this.props.navigation.navigate('Home')
                    }
                })
            }
        })
    }
    render() {
        return(
            <View style={{
                flex: 1,
              }}>
                <View style={styles.busContainer}>
                    <Icon name='description' size={250}/>
                </View>
                <View style={styles.formContainer}>
                <Formik
                    initialValues={{firstName: '', lastName: '', mail: '', password: '', }}
                    onSubmit={(values) => this.submit(values)}
                >
                    {(props) => (
                        <View style={{paddingTop: 50}}>
                            <TextInput
                                style        = {styles.input}
                                placeholder  = 'Nombres'
                                onChangeText = {props.handleChange('firstName')}
                                value        = {props.values.firstName}   
                            />
                            <TextInput
                                style        = {styles.input}
                                placeholder  = 'Apellidos'
                                onChangeText = {props.handleChange('lastName')}
                                value        = {props.values.lastName}   
                            />
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
                                <Text style={{color: 'white'}}>Registrarse</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                </View>
            </View>
        )
    }
}