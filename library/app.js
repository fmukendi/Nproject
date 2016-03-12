// intro
var express = require('express');

var app = express();

var sql = require('mssql');

var config = {
     
    user: 'nukeapps',
    password : 'Sh@mbuyi123',
    server : 'cylbwu8hce.database.windows.net',
    database : 'MukeAppsNodeSample_db',
    
    options:{
        encrypt: true  // Use this  if you re on Windows Azure
    }
    
};

sql.connect(config, function(err){
    
    console.log(err);
    
});

var port = process.env.PORT || 5000;

var nav =  [ 
                   {
                      link : '/Books' , 
                      Text  : 'Books'
                   },
                   { 
                      link: '/Authors' , 
                      Text:  'Authors'
                   }
            ];

//router

var bookRouter = require('./src/routes/bookRoutes') (nav);

var adminRouter = require('./src/routes/adminRoutes') (nav);

// static directory
app.use(express.static('public')); 

app.set('views','./src/views');

app.set('view engine', 'ejs');

//configuring Router 

// tell app to use that router

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

// routing 
app.get('/', function (req, res){ // request and response
    
    res.render('index', { 
                           title: "Hello from Render" ,
        
                            nav :[ 
                                   {
                                      link : '/Books' , 
                                      Text  : 'Books'
                                   },
                                   { 
                                      link: '/Authors' , 
                                      Text:  'Authors'
                                   }
                                 ]
                        });
});

// run server
app.listen(port, function (err) {
    console.log('running server on port ' + port);
});