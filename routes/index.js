// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Concured Client side
// Version : 2.0.1
// =====================================================


var mongoose = require('mongoose');
exports.home = function (req, res) {
	
    var data = {
        title: "Concured - Home"
    };
    res.render('index/home', data);

};

exports.dashboard = function (req, res) {
	// if the user is not logged in 
    if(!req.user) {
    	res.redirect('/')
    }
    var data = {
        title: "Concured - Dashboard",
        username: req.user.username
    };
    res.render('index/dashboard', data);

};


exports.audit = function (req, res) {
	// if the user is not logged in 
    if(!req.user) {
    	res.redirect('/')
    }
    var target = req.query.target || "nothing"
    var data = {
        title: "Concured - Audit",
        audit: true,
        target: target,
        username: req.user.username
    };
    res.render('index/audit', data);

};
