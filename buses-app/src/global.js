import { Alert } from 'react-native'
export default {
    request : (args = {}) => {
        if(!args.url || !args.method || !args.callback) {
            console.error('Parametros incompletos en petición')
            return       
        }
    
        const fetchOptions = {
            method: args.method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        fetch(args.url, args.body ? {...fetchOptions, body: JSON.stringify(args.body)} : fetchOptions)
        .then((promiseResponse) => promiseResponse.json())
        .then(args.callback)
        .catch((error) => {
            console.log('Error', error)
            this.showAlert({text: 'No se recibió información del servidor'})
        })
    },
    showAlert : (args = {}) => {
        const fn = args.fn ? {onPress: args.fn} : {}
        Alert.alert(
            args.title || '',
            args.text  || '',
            [{...fn, text: 'OK'}]
        )
    },
    isValidEmail : (mail = '') => {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regExp.test(mail.toLowerCase())
    },
    localhost : 'http://192.168.1.5:3100/'
}
