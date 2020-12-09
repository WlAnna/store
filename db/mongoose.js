const mongoose = require('mongoose')

var MONGODB_URL="mongodb+srv://netninja:test1234@cluster0.gnqgc.mongodb.net/shop-app?retryWrites=true"

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((result) => console.log('connected to db'))
.catch((err) => console.log(err))

