

const TransferHistory = require('../model/transferHistory');
var User = require('../model/users');
const {validationResult} = require('express-validator');

exports.postUsers = [
	async function(req, res, next){

		const {full_name,account_num,balance,totalTransactionAmount,noOfTransactions} = req.body;

		const errors = validationResult(req);
		if(!errors.isEmpty()){
			res.json({status:0, data:"validation", debug_data:errors.array()});
		} else {
	await User.findOne({
				account_num: account_num
			}).then(()=>{
				return res.status(400).json({msg:"User already exists"});
			})

			
			// if(user){
			// 	return res.status(400).json({msg:"User already exists"});
			// }

			var userOb = new User({
				full_name: full_name,
				account_num: account_num,
				balance: balance,
				totalTransactionAmount:totalTransactionAmount,
				noOfTransactions:noOfTransactions
			});

			userOb.save(function(err){
				if(err){
					res.json({status: 0, debug_data:err})
				} else {
					res.json({status:1, data:"User Saved"})
				}
			})
		}
	}
]

exports.getUsers = function(req, res, next){
	User.find(function(err, user_list){
		res.json(user_list);
	})
}

exports.getSingleAuthor = function(req, res, next){
	User.findById(req.params.id, function(err, singleAuthor){
		res.json(singleAuthor);
	})
}

exports.getByAccNum = function(req, res, next){
	User.findOne({"account_num":req.params.account_num}, function(err, accNumUser){
		res.json(accNumUser);
	})
}

exports.deleteUsers = function(req, res, next){
	User.findByIdAndDelete(req.params.id, function(err){
		if(err)
			res.json(err.toString());
		res.json({status:1, msg:"succesfully deleted author with id " + req.params.id})
	})
}

exports.updateUsers = function(req, res, next){
	User.findOneAndUpdate({"account_num":req.params.account_num}, req.body, function(err){
			if(err)
			res.json(err.toString());
			res.json({status:1, msg:"succesfully edited author with account " + req.params.account_num})
		})	
}


exports.getTransactionData = async (req, resp,next) => {
console.log("Function Called")
	let { account_num } = req.body;
  

	  console.log(account_num);
  
	  // To get districtData
	  
	
		  User
			.aggregate([{ $match: { account_num: account_num } }])
			.then((tresult) => {
			  let uAcc;
			  tresult.map((data) => {
				uAcc = data.account_num;
			  });
			  console.log("tcode is : "+uAcc);
			  	  // 1st Child
			//   User
			//   .aggregate([{ $match: { account_num: tAcc } }])
			//   .then((uresult) => { // uresult means user result after aggregation
			// 	// console.log(uresult)
			// 	let uAcc;
			// 	uresult.map((data) => {
			// 	  uAcc =  data.account_num
			// 	});
			// 	console.log("uAcc is : "+uAcc);
			  // 2nd Child
			  TransferHistory
				.aggregate([
				  { $match: { transferFrom: uAcc } },
				  { $group: { _id: "$transferFrom", 	Transactions: { $push: "$$ROOT" } } },
				])
				.then((result) => {
				  console.log(result)
				  resp.send(result)
				});
			});
		// });
  };
  