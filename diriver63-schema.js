var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.getDBconnnectionString());
var db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'));
db.once('open', function(){
    console.log('We are connected');
});

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    username : String,
    to_do : String,
    isDone : Boolean,
    lastUpdate : {type: Date, default: Date.now}
});

var Todo = mongoose.model('todo',todoSchema);

module.exports = Todo;