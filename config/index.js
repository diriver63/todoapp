var configvalues = require('./db-connection');

module.exports = {
    getDBconnnectionString : function(){
        return 'mongodb://' + configvalues.username +':'+ configvalues.password +'@diriver63-mongo-shard-00-00-bbjj3.mongodb.net:27017,diriver63-mongo-shard-00-01-bbjj3.mongodb.net:27017,diriver63-mongo-shard-00-02-bbjj3.mongodb.net:27017/'+ configvalues.collection + '?ssl=true&replicaSet=diriver63-mongo-shard-0&authSource=admin'
    }
}
