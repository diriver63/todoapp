var bodyparser = require('body-parser');
var todo = require('../diriver63-schema')
var now = new Date;


module.exports = function(app){

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended:true}));

    app.get('/api/mongodb/first-time', function(req, res){
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
    
    
    app.get('/api/mongodb/mytodos/:uname',function(req,res){
        todo.find({username:req.params.uname}, function(err, results){
            if (err) throw err;
            res.send(results);
        });
    });
    
    app.get('/api/mongodb/listodos',function(req, res){
        todo.find({}, function(err, results){
            if (err) throw err;
            res.send(results);
        })
    });     

    app.get('/api/mongodb/todo/:id', function(req, res){
        todo.findById({ _id: req.params.id }, function(err, results){
            if (err) throw err;
            res.send(results);
        })
    });

    app.post('/api/mongodb/newtodo',function(req, res){
        var newtodo = todo({
            username : req.body.uname,
            to_do : req.body.todo,
            isDone : false,
            lastUpdate : now
        });
        newtodo.save(function(err, results){
            if (err) throw err;
            res.send('Success!');
        });
    });

    app.post('/api/mongodb/updatetodo/:id',function(req,res){
        todo.findByIdAndUpdate(req.body.id, {
            username : req.body.uname,
            to_do : req.body.todo,
            isDone : req.body.isDone,
            lastUpdate : now
        }, function(err, results){
            if (err) throw err;
            res.send('task '+req.body.id+' updated');
        });
    });

    app.delete('/api/mongodb/todo/:id',function(req,res){
        todo.findByIdAndRemove(req.params.id,function(err,results){
            if (err) throw err;
            res.send('task '+req.params.id+' deleted');
        });
    });
};

