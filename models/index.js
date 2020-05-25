const mongoose = require('mongoose')

require('./Teste');
require('./User');
require('./Event');
require('./Location');
require('./ShoppingList');

const options = {
    useNewUrlParser: true
  };

urlDataBase = "mongodb+srv://admin:admin123@myfirstapp-7yztt.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(urlDataBase, options)


const db = mongoose.connection
db.on('error', () => {
    throw new Error('unable to connect to database at' + db)
})