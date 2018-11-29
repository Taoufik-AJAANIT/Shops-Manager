const express = require('express');
const authRouter = require('./routes/authRouter.js');
const indexRouter = require('./routes/indexRouter.js');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cors = require('cors');



const app = express();


// allowing acces to API
app.use(cors());


// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express validator
app.use(expressValidator());

// setUp routers
app.use('/auth', authRouter);
app.use('/', indexRouter);


// connection to db : --Mongo Atlas--
mongoose.connect('mongodb+srv://shopsApi:' + process.env.db_PASS + '@cluster0-xudzu.mongodb.net/test?retryWrites=true', {
    useCreateIndex: true,
    useNewUrlParser: true
})
    .then(() => { console.log('[MongoAtlas] connection to MongoAtlas established succefuly !') })
    .catch(err => console.error(err));


// set up Port
const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`Server listening on port ${port} ...`));