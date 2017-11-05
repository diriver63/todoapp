var express = require('express');
var app = express();
var todo = require('./diriver63-schema');
var port = process.env.PORT || 3000;

app.get('/api/first-time', function(req, res){
    var now = new Date();
    var firstload = [
        {
            username : 'Diego',
            to_do : 'Study Node',
            isDone : false,
            lastUpdate : now
        },
        {
            username : 'Sharon',
            to_do : 'Have a baby',
            isDone : false,
            lastUpdate : now
        },
        {
            username : 'Lily',
            to_do : 'Have a Sibling',
            isDone : false,
            lastUpdate : now
        }
    ];

    todo.create(firstload,function(err, results){
        res.send(results);
        if (err) throw err;
        else console.log('data imported');
    });
});


app.get('/api/todos/:uname',function(req,res){
    todo.find({username:req.params.uname}, function(err, todos){
        if (err) throw err;
        res.send(todos);
    });
});

app.get('/api/todos',function(req, res){
    todo.find({}, function(err, results){
        if (err) throw err;
        res.send(results);
    })
});

app.listen(port);
