const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name:{
    type:String,
    required:[true,'name must be provided'],
  },
  price:{
    type:Number,
    required:[true,'price must be provided'],
  },
  featured:{
    type:Boolean,
    default:false,
  },
  rating:{
    type:Number,
    default:4.5
  },
  createAt:{
    type:Date,
    default:Date.now(),
  },
  company:{
    type:String,
    enum:{
      values:['ikea','liddy','caressa','marcos'],
      massage:"{value} does't supported"
    }
    // enum:['ikea','liddy','caressa','marcos']
  }
})


module.exports = mongoose.model('product',ProductSchema)