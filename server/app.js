const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const config = require('./config/database');
var session = require('express-session');
app.use(session({ secret: 'SECRET' }));

//connection to database
mongoose.connect(config.database);

// On Connection message
mongoose.connection.on('connected' , () =>{
    console.log('Connected to database ' +config.database);
});
// On Connection error message
mongoose.connection.on('error' , (err) =>{
    console.log('database error ' +err);
});

const users = require('./routes/users.route');


//post Number
const port = 3000;

//CORS Middleware
app.use(cors());

// body parser middleware
app.use(bodyParser.json());

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Index Route
app.get('/', (req, res) => {
    res.send('invalid endpoint');
})

//start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});


//set static folder
app.use(express.static(path.join(__dirname, 'public')));




app.use('/users', users);