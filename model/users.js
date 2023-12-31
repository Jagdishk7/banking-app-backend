var mongoose = require('mongoose')

var UsersSchema = new mongoose.Schema({
	full_name: {type:String, required:true, max: 100},
	account_num: {type:Number, required: true, max:999999,unique:true},
	balance: {type:Number, min:1},
	totalTransactionAmount: {type:Number},
	noOfTransactions: {type:Number},
},{
	timestamps:true
})

// UsersSchema.path('account_num').validate(async(acc)=>{
// 	const accCount = await mongoose.models.User.countDocuments({acc})
// 	return !accCount;
// }, "Account Already Exists");

module.exports = mongoose.model('User',UsersSchema);