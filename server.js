var express = require ('express');
var path = require('path'); // core node.js module
var bodyParser = require('body-parser');
 var index = require ('./routes/index');
 var todos = require('./routes/todos');

 var app =  express();

// Setting the view engine
app.set('views' , path.join(__dirname , 'views')); // Setting the default views folder
app.set('view engine' , 'ejs');                    // Setting the default html view engine
app.engine('html' , require('ejs').renderFile);  // parsing the html files to ejs

app.use(express.static(path.join(__dirname , 'client'))); // Setting the default style folder to the project

// Setting up the middlewares for the body parser library
// formally we made it like this => app.use(bodyParser)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


app.use('/' , index);
app.use('/api/v1/' , todos);

app.listen(3000 , function(){
    console.log("I'm listening to 3000 ... ")
});