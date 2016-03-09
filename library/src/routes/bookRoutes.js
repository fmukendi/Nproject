
var express = require('express');

var bookRouter = express.Router();

var sql = require('mssql');

var router = function(nav){
    
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

bookRouter.route('/')
          .get(function(req, res){
    
                 var request = new sql.Request;
                
                 request.query ('SELECT DISTINCT TOP 10 [EmployeeKey] [id], [title] ,[EmergencyContactName] [author]  FROM [dbo].[DimEmployee]', 
                                 function(err, recordset){
                                 
                                       console.log(recordset);
                                
                                       res.render('bookListView', { 
                                                        title: "Books" ,
                                                        nav : nav,
                                                        books : recordset
                                                    });
                 });
                
           });

/*bookRouter.route('/single')*/
bookRouter.route('/:id')
          .all(function(req, res, next){
               var id = req.params.id;
    
                var ps = new sql.PreparedStatement();
                ps.input('id', sql.Int)
                ps.prepare
                ('SELECT DISTINCT TOP 10 [EmployeeKey] [id], [title] ,[EmergencyContactName] [author]  FROM [dbo].[DimEmployee] WHERE [EmployeeKey] = @id',
                            function(err){
                              ps.execute({id: req.params.id },
                                function(err, recordset){
                                    if(recordset.length == 0){
                                       res.status(404).send('Not Found');
                                       console.log('recored was not found');
                                    }else{
                                        req.book = recordset[0];
                                        next();
                                    }
                                    
                           })
                })
          })
          .get(function(req, res){
               
                res.render('bookView', { 
                            title: "Books" ,
                            nav : nav,
                            books : req.book
                        });
                
           });
    
    return bookRouter;
}



module.exports = router;