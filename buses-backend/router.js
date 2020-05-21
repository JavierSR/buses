const   express     = require('express'),
        router      = express.Router()
        controller  = require('./controller')

router.post('/register', (req, res) => {
    controller.register(req.body, res)
})

router.post('/login', (req, res) => {
    controller.login(req.body, res)
})

router.get('/userInfo', (req, res) => {
    controller.getUserInfo(req.body, res)
})

router.get('/routes', (req, res) => {
    controller.getRoutes(res)
})

router.post('/fav', (req, res) => {
    controller.addFav(req.body, res)
})

router.post('/history', (req, res) => {
    controller.addHistory(req.body, res)
})

module.exports = router