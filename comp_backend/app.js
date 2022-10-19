const express = require("express");
const app = express();
const controllers = require('./src/controllers');
const loginRoute = require('./src/controllers/login')
const tokenService = require('./src/services/token')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


app.set('port', (process.env.PORT || (process.env.NODE_ENV === 'production' ? 5000 : 3000)));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(loginRoute)
app.use('/api', tokenService.addToken, tokenService.verifyToken, controllers);
app.use((req, res, next) => {
    res.status(400).json({ error: true, message: "BAD REQUEST: {/api} is not found in this api" });
})

app.use(morgan('dev'));
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/computeronics", { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("connected to mongodb");
    app.listen(app.get('port'), () => {
        console.log("api server listen on port ", app.get('port'))
    })
})
