
const twilioCredentials = {
    "TwilioNumber" : "+19149337525",
    "Authy" : "BT3ybwzIHaDiNghYsUCbnajVUk93AxUf",
    "ACCOUNTSID"   : "ACb76e2a9503584eee8836854bc8bb40eb",
    "AUTHTOKEN"    : "1e41430304caa28891a9577f0954eaff"

};
const ETHnodeURL = {
    connectETHnodeWS : "ws://192.168.0.123:8546",
    connectETHnodeHTTP : "http://192.168.0.123:8546",
};

const gmailSMTPCredentials = {
    "type": "SMTP",
    "service": "Gmail",
    "host": "smtp.gmail.com",
    "port": 587,
    "secure": true,
    "username": "visioncoin017@gmail.com",
    "password": "vision@123"
};

const smsCredentials = {
    number:'4755292423'
};

const rpiCredentials = {
    baseUrl:'http://proxy7.remote-iot.com:11804'
};

const pagination = {
    itemPerPage:10
};

const imagePaths = {
    "user": "/../../public/images/user/avatar",
    "url": "/images/user/avatar",
    "defaultUserImage" : './images/user/avtar.png'
};

const coinPayment = {
    key : "b175d3557680c61449dc851d23adb062b79ebcfc3e0f93f1472d8e0878649b3f",
    secret : "62BA78ED5ad8dE6eEC0635aec2e80d64d70A156bc31c103335539d830f1cB0f0",
    autoIpn : true,
    ipnTime : true
};

const userRole = {
    "roles" : [
    {roleId : 1, roleName : "Admin"},
    {roleId : 2, roleName : "Developer"},
    {roleId : 3, roleName : "Tester"},
    {roleId : 4, roleName : "Business Developer"},
    {roleId : 5, roleName : "Project Manager"},
    {roleId : 6, roleName : "Team Manager"},
    {roleId : 7, roleName : "Team Lead"},
    {roleId : 8, roleName : "Super Admin"},
    {roleId : 9, roleName : "Desinger"}]
}

const hostingServer ={
    serverName : 'http://localhost:4000/',
    serverUiName : 'http://localhost:3001/',
    // serverName : 'https://bug-tracker-web.herokuapp.com'
}

var obj = { gmailSMTPCredentials:gmailSMTPCredentials, 
    twilioCredentials: twilioCredentials,
    smsCredentials:smsCredentials,
    imagePaths: imagePaths,
    rpiCredentials:rpiCredentials,
    pagination: pagination,
    coinPayment : coinPayment,
    ETHnodeURL : ETHnodeURL,
    // pagination: pagination,
    hostingServer: hostingServer,
    userRole : userRole};

module.exports = obj;
