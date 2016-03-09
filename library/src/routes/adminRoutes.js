
var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var mongdbUrl = 'mongodb://localhost:27017/libraryApp';

var books = [
    {
        title : 'War and Peace',
        genre : 'Historical Fiction',
        author : 'Lev Nikolayevich Tolstou',
        read : false
    },
    {title : 'Be a Milllionaire',
        genre : 'Historical Fiction',
        author : 'Franck Mukendi',
        read : false
    },
    {title : 'Best Software Engineer',
        genre : 'Historical Fiction',
        author : 'Frank K. Mukendi',
        read : false
    }
    
];

var router = function(nav){
    
    adminRouter.route('/addbooks')
                .get(function (req, res){
                    var url = mongdbUrl;
                    
                    mongodb.connect(url, function(err, db){
                        
                        var collection = db.collection('books');
                        collection.insertMany(books, 
                            function(err, results){
                            res.send(results);
                            db.close();
                        });
                        
                    });
                    res.send('inserting books');
                });
    
    return adminRouter;
};



module.exports = router;