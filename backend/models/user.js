const mongoose = require('mongoose')
const url = 'mongodb+srv://siddharth-s:3012@cluster0.cbsfq.mongodb.net/p2p-app?retryWrites=true&w=majority'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    passwordHash: String,
    type: String
})
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})
const User = mongoose.model('User', userSchema)
module.exports = User