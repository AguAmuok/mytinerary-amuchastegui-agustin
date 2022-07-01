const mongoose = require ('mongoose')

const usersShema = new mongoose.Schema({
    nameUser:{type:String, require:true},
    lastNameUser:{type:String, require:true},
    photoUser:{type:String, require:true},
    email: {type:String, required:true},
    country: {type:Array, required:true},
    from : {type:Array},
    password: {type:Array, required:true}, 
    uniqueString: {type:String, required: true},
    verification: {type:Boolean, required: true}
})

const Users = mongoose.model('users', usersShema)
module.exports = Users

// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     nameUser: {type: String, required: true},
//     lastNameUser: {type: String, required: true},
//     photoUser: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: Array, required: true},
//     role: {type: String, required: true},
//     from: {type: Array , required: true},
    
// })

// const User = mongoose.model('users', userSchema)
// module.exports = User