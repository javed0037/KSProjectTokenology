var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var Constant = require('../../config/constants');


var tokenSchema = new Schema({
	crowdSaleAddress    : { type : String , require : true},
	tokenAddress        : { type : String , require : true},
	websiteUrl          : { type : String, default: ''},
	logoUrl             : { type : String, default: ''},
    isDeleted           : { type: Boolean, default: false},
    createdAt           : { type:Date, default: Date.now,select: false},
    updatedAt           : { type:Date, default: Date.now,select: false}
    
});

var tokens = mongoose.model('Token', tokenSchema);

module.exports = tokens;
