const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.Promise = global.Promise;
require('dotenv').config();

console.log(process.env.MONGOURI);
mongoose.connect(process.env.MONGOURI);
