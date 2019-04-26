var express = require ('express');
var router = express.Router();
var mongojs = require('mongojs'); // A node.js module for mongodb, that emulates the official mongodb API as much as possible. It wraps mongodb-native and is available through npm
var db = mongojs("mongodb://mood:mood@ds161400.mlab.com:61400/mean_todo" , ["todos"]);

// Getting todos
router.get('/todos' , function(req , res)
{
    db.todos.find(function(err , todos)
    {
       if(err)
           res.send(err);
       else
           res.json(todos);
    });
});

 // Getting a single todos
router.get('/todo/:id' , function(req , res)
{
    db.todos.findOne({_id : mongojs.ObjectId(req.params.id)} , function(err , todo)
    {
        if (err)
           res.send(err);
        else
           res.json(todo);
    })
});

//save the todos
router.post('/todo' , function(req , res)
{
   var todo = req.body;
    if (!todo.text || !(todo.isCompleted+''))
    {
        res.status(400);
        res.json({"Error" : "Invalid data"})
    }
    else
    {
        db.todos.save(todo , function(err , result)
        {
            if (err)
                res.send(err);
            else
                res.json(result);
        })
}
});

//Update todos
router.put('/todo/:id' , function(req , res)
{
   var todo = req.body;
   var updObj = {};

   if (todo.isCompleted)
       updObj.isCompleted = todo.isCompleted;

   if (todo.text)
       updObj.text = todo.text;
   
    if(!updObj)
    {
        res.status(400);
        res.json({"Error" : "Invalid data"})
    }
    else
    {
       db.todos.update({_id: mongojs.ObjectId(req.params.id) },updObj , {} , function(err , result)
       {
           if (err)
               res.send(err);
           else
               res.json(result);
       })
    }
});

//Delete
 router.delete('/todo/:id' , function(req , res)
 {
     db.todos.remove({_id: mongojs.ObjectId(req.params.id) },'', function(err , result) {
         if (err)
             res.send(err);
         else
             res.json(result);
     })
 });
module.exports = router;