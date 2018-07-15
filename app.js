const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')
const helmet        = require('helmet')


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(helmet());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, GET, PATCH, DELETE, POST')
        return res.status(200).json({})
    }
    next();
})

//routes
const landingPage = require('./api/routes/landingPage')
const userData = require('./api/routes/userData')

app.use(express.static(__dirname + '/public'))
app.use('/', landingPage)
app.use('/userData', userData)

app.use((req, res, next) => {
    const error = new Error("not found")
    error.status = 404;
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;