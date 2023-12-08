var Bank = require('../model/banks');

exports.postTransfer = function (req, res, next){
	var bankdata = new Bank({
		bankName: req.body.bankName,
		address: req.body.address,
		totalCustomers: req.body.totalCustomers
	});

	bankdata.save(function(err){
		if(err){
			console.log(err);
			res.json({error: "Can't Save"});
		} else {
			console.log("Success");
			res.json({msg:"Saved!"});
		}
	})
}