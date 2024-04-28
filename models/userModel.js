const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0/iotparking')
const plm = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:true,
  },
  password:String,
  email:{
    type:String,
    unique:true
  },
  acctype:{
    type:String,
    enum:['admin','customer'],
    default:'customer'
  },
  createdOn:{
    type:Date,
    default:Date.now
  },
})
userSchema.plugin(plm)

module.exports = mongoose.model('user',userSchema)
