var express = require('express');
var eth = require('../app/controllers/EthCtrl.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource ETH controller');
});

/* To register a user. */
// router.post('/coinPayment', eth.coinPayment);
// router.post('/paymentWithraw', eth.paymentWithrawIntoWallet);
// router.post('/createTransaction', eth.createTransaction);

router.post('/createETHaddress', eth.createETHaddress);
router.get('/getAllETHaddress', eth.getAllETHaddress);
router.post('/getBalanceByAddress', eth.getBalanceByAddress);
router.post('/getTokenByAddress', eth.getTokenByAddress);
router.post('/getTransactionByAddress', eth.getTransactionByAddress);
router.post('/storeTokenInformation', eth.storeTokenInformation);

router.post('/submitICO', eth.submitICO);
router.post('/getTokenByAddress', eth.getTokenByAddress);
router.get('/getAllTokens', eth.getAllTokens);

router.post('/sendTransaction', eth.sendTransaction);
router.get('/getTransaction', eth.getTransaction);
router.post('/signAndSendTransaction', eth.signAndSendTransaction);


module.exports = router;

