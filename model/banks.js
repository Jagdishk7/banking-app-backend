const mongoose = require('mongoose')
const {Schema} = mongoose;

const bankSchema = Schema({
	bankName: {type:String, required: true},
	Address: {type:String, required:true},
	totalCustomers: {type:Number, required:true}
})

module.exports = mongoose.model('banks',bankSchema );