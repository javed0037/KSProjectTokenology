var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var Constant = require('../../config/constants');


var icoSchema = new Schema({
    email : { type : String, require : true},
	tokenName           : { type : String , require : true},
	tokenTicker         : { type : String},
	toeknAddress        : [{ contractAddress : 'String'}],
	toeknValue          : { type : Number, default: 0},
    investorMinCap      : { type: Number, default: 0.0},
    startTime           : { type:Date, default: Date.now},
    endTime             : { type:Date, default: Date.now},
    tokenRate           : { type : Number  , default : 0},
    tokenSupply         : { type : Number , default : 0},
    isDeleted           : { type: Boolean, default: false},
    createdAt           : { type:Date, default: Date.now,select: false},
    updatedAt           : { type:Date, default: Date.now,select: false}
    
});

var icos = mongoose.model('ICO', icoSchema);

module.exports = icos;
