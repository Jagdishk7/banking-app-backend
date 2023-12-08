var express = require('express');
var router = express.Router();
var userController = require('../controllers/users');
var transferController =  require('../controllers/transferHistory');
/* GET home page. */


router.post('/users',userController.postUsers);
router.post('/userstrans', userController.getTransactionData);
router.get('/users', userController.getUsers);
router.get('/users/:id',userController.getSingleAuthor);
router.get('/usersacc/:account_num',userController.getByAccNum);
router.delete('/users/:id', userController.deleteUsers);
router.put('/users/:account_num', userController.updateUsers);

router.post('/transfer', transferController.postTransfer);
router.get('/transfer', transferController.getTransfer);
router.delete('/transfer/:id', transferController.deleteTransfer);


module.exports = router;
