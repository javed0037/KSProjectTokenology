  require('dotenv').load();
  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var cors = require('cors');
  var jwt = require('jsonwebtoken');
  var cfg = require('./config/passport_config.js');
  var mongodb = require("mongodb");
  var mongoose = require('mongoose');
  var app = express();
  var router = express.Router();
  var debug = require('debug')('bugtracker-backend:server');
  var http = require('http');
  const request = require('request');
  //Routes Here:
  var index = require('./routes/index');
  var users = require('./routes/users');
  var api = require('./routes/publicApi');
  var eth = require('./routes/eth');
  
  console.log('**********************************Node Server with Express*********************************');

  var Accounts = require('web3-eth-accounts');
  var accounts = new Accounts('ws://192.168.0.113:8546');

  var Personal = require('web3-eth-personal');
  var personal = new Personal('ws://192.168.0.113:8546'); 

  var Web3 = require('web3');
  // var web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.113:8545"));
  var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://192.168.0.113:8546"));
  

  app.get('/createETHaddress',function(req,res) {
    console.log('*****createETHaddress***');
    web3.eth.personal.newAccount('kunvar@123').then((data) => {
       res.send({status : 200, message : 'Address create successfully ', data : data});
    });

    // var userAddress  = web3.eth.accounts.create();
    // res.send({status : 200, message : 'Address create successfully ', data : userAddress});

  });

  // app.get('/getETHaddress',function(req,res) {
  //   console.log('*****getETHaddress***');
  //   var addresses = web3.eth.getAccounts().then((data)=>{
  //     if(data){
  //        res.send({status : 200, data : data , message : 'Address on Ethrium Node.'});
  //     }
  //     else{
  //        res.send({status : 200, data : data , message : 'No Data Found!.'}); 
  //     }
  //   });
    
  // });

  // app.post('/getBalanceByAddress',function(req,res) {
  //   var addresses = web3.eth.getBalance('0xc5258ff205875a10d89edd6d1bd96a8c237c8d13').then((data)=>{
  //     if(data){
  //        res.send({status : 200, data : data , message : 'Address Balance on Ethrium Node.'});
  //     }
  //     else{
  //        res.send({status : 200, data : data , message : 'No balance Data Found!.'}); 
  //     }
  //   });

  // });

  //  app.post('/getTransactionByAddress',function(req,res) {
  //   // let add = req.body.address;

  //   var addresses = web3.eth.getTransaction('0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b').then((data)=>{
  //     if(data){
  //        res.send({status : 200, data : data , message : 'Address Balance on Ethrium Node.'});
  //     }
  //     else{
  //        res.send({status : 200, data : data , message : 'No balance Data Found!.'}); 
  //     }
  //   });

  // });

  app.post('/getTokenByAddress',function(req,res) {
    
    var opt = {
      method: 'GET',
      headers: {'content-type': 'application/json', 'charset':'utf-8'},
      json: true
    };
    var data = {};
    opt.url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xdd974d5c2e2928dea5f71b9825b8b646686bd200&address=0xC5258FF205875A10D89EDD6d1Bd96A8c237C8D13&tag=latest&apikey=I5AV4RC7F5EM9RNR3EFW1H6MQTDU6XUWUQ`;
    // opt.url = 'https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xdd974d5c2e2928dea5f71b9825b8b646686bd200&apikey=I5AV4RC7F5EM9RNR3EFW1H6MQTDU6XUWUQ';
    request(opt, function (err, response, body) {
      if(err)
        return res.json({
          message: "Failed to get data from etherscan.io",
          statusCode: 400
        })

      res.send({status : 200, data : body , message : 'Tx Data'}); 
    });  

  });
 

  app.get('/createContract',function(req,res) {
    var jsonInterface = [{
          "type":"function",
          "name":"foo",
          "inputs": [{"name":"a","type":"uint256"}],
          "outputs": [{"name":"b","type":"address"}]
      },{
          "type":"event",
          "name":"Event",
          "inputs": [{"name":"a","type":"uint256","indexed":true},
                     {"name":"b","type":"bytes32","indexed":false}]
      }];

    var myContract = new web3.eth.Contract(jsonInterface, 
        '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
        from: '0xF6F030397ed92a4093481b1aEfFe4875976280e4', // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });
    

    myContract.deploy({
    data: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    arguments: [123, 'My String']
    })
    .send({
        from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
        gas: 1500000,
        gasPrice: '30000000000000'
    }, function(error, transactionHash){ console.log(transactionHash) })
    .on('error', function(error){console.log(error) })
    .on('transactionHash', function(transactionHash){ console.log(transactionHash) })
    .on('receipt', function(receipt){
       console.log(receipt.contractAddress) // contains the new contract address
    })
    .on('confirmation', function(confirmationNumber, receipt){ console.log(receipt) })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });



    res.send({status : 200, data : myContract , message : 'Contract created!.'}); 

  });






  var CoinPayments = require('coinpayments');
  let events = CoinPayments.events;


  var db;
  var device = require('express-device');
  app.use(device.capture());

  app.get('/hello',function(req,res) {
    res.send("Hi to "+req.device.type.toUpperCase()+" User");
  });

  // Get port from environment and store in Express.
  var port = normalizePort(process.env.PORT || '4000');
  app.set('port', port);


  var io = require('socket.io')(server);

  app.use(bodyParser({limit: '50mb'}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(function(req, res, next) {
    req.io = io;
    next();
  });
  
  mongoose.connect("mongodb://localhost:27017/tokonology",function (err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    // Save database object from the callback for reuse.=
    db = database;
    console.log("Database connection ready");
  });

  //Listen on provided port, on all network interfaces.
  router.use(function(req, res, next) {
    var token =  req.headers["authorization"];
    if (token) {
      try {
        // console.log('tokentokentokentoken:::'+token);
        token = token.split(' ')[1];
        
        var decoded = jwt.verify(token,cfg.secret,function (err,decoded){
          if(err){
            res.status(401).send({
              msg: 'Authorization token is not valid'
            });
          }else {
            console.log(decoded,"decoded token")
            req.user = decoded;
            next();
          }
        });
      } catch (e) {
        return res.status(401).send({
          msg: 'Authorization token is not valid'
        });
      }
    } else {
      console.log("No token");
      return res.status(401).send({
        msg: 'Authorization token missing in request.'
      });
    }
  });

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  // uncomment after placing your favicon in /public

  app.use(logger('dev'));
  app.use(bodyParser({limit: '50mb'}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(cors());

  // app.use('/users', router);

  app.use('/', index);
  app.use('/api', api);
  app.use('/users', users);
  app.use('/ETH', eth);

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  // Normalize a port into a number, string, or false.
  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  // Event listener for HTTP server "error" event.

  function onError(error) {
    console.log('Server',error);
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  // Event listener for HTTP server "listening" event.

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

/* Server createion */

var server = http.createServer(app);
 server.listen(port);
 server.on('error', onError);
 server.on('listening', onListening);

  module.exports = app;
