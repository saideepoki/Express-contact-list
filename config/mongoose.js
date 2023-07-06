const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');

// acquire the connection
const db = mongoose.connection;

// check for any error
db.on('error',console.error.bind(console,"Error connecting to the database"));

// once the connection is open print he message
db.once('open',()=>console.log("Successfully connected to the database"));