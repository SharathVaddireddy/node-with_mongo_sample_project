
//======================================================================
//                                                                      
//  ##     ##   #####   ####    #####          ###    #####   #####   
//  ####   ##  ##   ##  ##  ##  ##            ## ##   ##  ##  ##  ##  
//  ##  ## ##  ##   ##  ##  ##  #####        ##   ##  #####   #####   
//  ##    ###  ##   ##  ##  ##  ##           #######  ##      ##      
//  ##     ##   #####   ####    #####        ##   ##  ##      ##      
//                                                                      
//======================================================================

/** * imports */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/AppConfig');


//=================================================================
/**
 * Data base connectivity
 */
mongoose.connect(config.database.url);
mongoose.connection.on('connected', () => {
    console.log(`connected to db ${config.database.url}`);
});

mongoose.connection.on('error', (err) => {
    console.log('error: ' + err);
});
//=================================================================

const app = express();

/** CORS middleware */ 
app.use(cors());

/** Set static folder */
app.use(express.static(path.join(__dirname, 'public')));

/** Body Parser Middleware */
app.use(bodyParser.json());

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

//===================================================================
/**
 * All the defined controller js files should present here,
 * if not routing to that controller won't happen
 */
const users = require('./controller/UserController');
app.use('/user', users);

//===================================================================

//===================================================================
/**
 * Default redirecting page for the application,
 * Once the app starts, u can see this html file 
 * with http://localhost:4000/
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
//===================================================================

//===================================================================
/**
 * Application will be accessible on this port,
 * here it is 4000
 */
app.listen(config.application.port, () => {
    console.log('server started on port ' + config.application.port);
})
//====================================================================
