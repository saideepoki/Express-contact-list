const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
// jsdoc to recognize mongoose model as before intellisense wasn't working for mongoose model
/**
 * @type {import('mongoose').Model}
 */
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');

// middlewares
app.use(express.urlencoded()); // bodyParser
app.use(express.static('assets'));

// controllers
app.get('/',function(req,res) {
    Contact.find({})
    .then((contacts) => {
      return res.render('home',{
        title: 'Contacts List',
        contact_list: contacts
       });
    });
});

// creating new contact
app.post('/create-contact',function(req, res) {
   Contact.create({
    name: req.body.name,
    phone: req.body.phone
  })
  .then((contact) => {
    console.log(contact);
  })
  .catch((error)=> {
    console.log(error);       
  })
    return res.redirect('back');
});

// deleting a contact
app.get('/delete-contact',function(req,res) {
    const id = req.query.id;
    Contact.findByIdAndDelete(id)
    .catch((error)=> {
      console.log(error);
    })
    return res.redirect('back');
});

// listening at the port or basically starting the server at the defined port
app.listen(port,function(err){
  if(err) {
    console.log('Error in running the server:',err);
    return;
  }
  console.log('My express.js server is running on Port:',port);
});
