var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(require('body-parser').urlencoded({extended:true}));

var fs = require('fs');

app.get("/",function(req,res){
	res.render("home");
});

app.get("/menu",function(req,res){
	res.render("menu");
});

app.get("/directions",function(req,res){
	res.redirect("https://www.google.com/maps/dir//1021+Dulaney+Valley+Rd,+Towson,+MD+21204/@39.4089399,-76.5945767,17z/data=!4m13!1m4!3m3!1s0x89c80efefd6a09c5:0xeb81aef44e0acb8f!2s1021+Dulaney+Valley+Rd,+Towson,+MD+21204!3b1!4m7!1m0!1m5!1m1!1s0x89c80efefd6a09c5:0xeb81aef44e0acb8f!2m2!1d-76.5923827!2d39.4089358");
});

app.get("/address",function(req,res){
	var address = {
		address: '1021 Dulaney Valley Road',
		city: 'Baltimore',
		state: 'Maryland'
	};

	res.render("address", address);
});

app.get("/hours",function(req,res){
	var hrs = {
		open: '11am',
		close: '10pm'
	};

	res.render("hours", hrs);	
});

app.post("/rateus",function(req,res){
	var feedback = {};

	var opinion = req.body.opinion;
	var rate = req.body.rate;

	fs.writeFileSync('feedback/opinion.txt', opinion);

	fs.writeFileSync('feedback/rate.txt', rate);

		var data = {
			opinion: opinion,
			rate: rate
		}

	res.render("feedback",data);
});
app.get("/rateus",function(req,res){
	res.render("contact");
});


app.listen(3000,function() {
	console.log('Listening to port 3000');
});