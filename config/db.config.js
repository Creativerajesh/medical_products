const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/medical_db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then()
{
    console.log('Connected sucess')
}