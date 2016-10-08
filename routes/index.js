// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Concured Client side
// Version : 2.0.1
// =====================================================


var mongoose = require('mongoose');


exports.index = function (req, res) {
	var username = "Not logged in";
	var isAlreadyLoggedin = false;
	// if the user is logged in 
    if(req.user) {
    	username = req.user.username;
    	isAlreadyLoggedin = true;
    }
    var data = {
        title: "Concured ",
        username: username,
        isAlreadyLoggedin:isAlreadyLoggedin
    };
    res.render('index/index', data);

};
