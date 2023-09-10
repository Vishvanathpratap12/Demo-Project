var express = require('express');
var bodyParser = require('body-parser');

const indexRouter = require('./routes/index')
const session = require('express-session')


var app = express();

app.set('views', 'views');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use(
  session({
    secret: 'beniDhaku',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: Date.now() + 30 * 60 * 1000 } //maxAge set to half hr
  })
)


app.use('/', indexRouter)


app.listen(7200, () => {
    console.log('Server is listening on port 7200');
})
