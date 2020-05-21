const   express    = require('express'),
        bodyParser = require('body-parser'),
        router     = require('./router'),
        cors       = require('cors'),
        app        = express()
        
app.use(bodyParser.json())
app.use(cors())
app.use(router)
app.listen(3100)
console.log('Servidor corriendo')
