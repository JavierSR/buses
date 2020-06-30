const   mysql      = require('mysql')
        connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'buses'
        }),
        md5 = require('md5')

connection.connect((error) => {
    if(error) {
        console.log('Error en la conexión a la base de datos: ' + error)
    }
    else {
        console.log('Conectado a la base de datos MYSQL')
    }
})

const queryError = (response, error) => {
    console.log('Error en query: ' + error)
    response.send({
        success : false,
        body    : 'Error en el servidor'
    })
}

module.exports = {
    register: (userData = {}, response) => {

        const insertData  = [userData.firstName, userData.lastName, userData.mail, md5(userData.password || '')]

        for(let value of insertData) {
            if(!value || !value.length) {
                response.send({
                    success : false,
                    body    : 'Campos vacios'
                })
                return
            }
        }

        connection.query('SELECT * FROM usuarios WHERE correo = ?', [userData.correo], (error, result) => {
            if(error) {
                queryError(response, error)
                return
            }

            if(result.length) {
                response.send({
                    success : false,
                    body    : 'El correo proporcionado ya se encuentra registrado'
                })
                return
            }

            connection.query('INSERT INTO usuarios (nombres, apellidos, correo, contrasena) values (?, ?, ?, ?)', insertData, (error) => {
                if(error) {
                    queryError(response, error)
                    return
                }
                response.send({success : true})
            })
        })
    },
    login: (userData = {}, response) => {
        if (!userData.mail.length || !userData.password) {
            response.send({
                success : false,
                body    : 'Datos vacios'
            })
            return
        }

        connection.query('SELECT * FROM usuarios WHERE correo = ?', [userData.mail], (error, result) => {
            if(error) {
                queryError(response, error)
                return
            }

            if(!result.length) {
                response.send({
                    success : false,
                    body    : 'El correo proporcionado no se encuentra registrado'
                })
                return
            }

            const userInfo = result[0]
            if(userInfo.contrasena !== md5(userData.password)) {
                response.send({
                    success : false,
                    body    : 'Contraseña incorrecta'
                })
                return
            }

            delete userInfo.contrasena
            
            const queryHistory = `SELECT * 
                                FROM rutas AS r
                                INNER JOIN historial as h 
                                    ON (h.id_ruta = r.id) 
                                WHERE h.id_usuario = ?`

            connection.query(queryHistory, [userInfo.id], (error, result) => {
                if(error) {
                    queryError(response, error)
                    return
                }

                response.send({
                    success : true,
                    body    : {...userInfo, routes: result}
                })
            })
        })
    },
    getUserInfo: (userData, response) => {

    },
    getRoutes: (response) => {
        connection.query('SELECT * FROM rutas', (error, result) => {
            if(error) {
                queryError(response, error)
                return
            }

            response.send({
                success : true,
                body    : result
            })
        })
    },
    addFav: (userData, response) => {
        console.log('userData', userData)
    },
    addHistory: (userData, response) => {
        console.log('userData', userData)
    }
}