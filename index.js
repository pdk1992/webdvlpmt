var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//body parser -- for form processing
app.use(require('body-parser').urlencoded({extended:true}));

// --- ROUTES --- //

app.get('/',function(req,res){	
	res.render('fedwith');	
});

// handle the post to the form
app.post('/total',function(req,res){

	var yrsalary = (req.body.salary);

	// Make sure the inputs are valid numbers
	if (yrsalary <= 9275){
		var taxRate = 10;
		var newTotal = yrsalary * .9;

		var data = {
			yrsalary: yrsalary,
			taxRate: taxRate,
			newTotal: newTotal
		}
	}

	if (yrsalary > 9275 && yrsalary <= 37650){
		var taxRate = 15;
		var newTotal = yrsalary * .85;

		var data = {
			yrsalary: yrsalary,
			taxRate: taxRate,
			newTotal: newTotal
		}

	}

	if (yrsalary > 37650 && yrsalary <= 91150){
		var taxRate = 25;
		var newTotal = yrsalary * .75;

		var data = {
			yrsalary: yrsalary,
			taxRate: taxRate,
			newTotal: newTotal
		}

	}

	if (yrsalary > 91150 && yrsalary <= 190150){
		var taxRate = 28;
		var newTotal = yrsalary * .72;

		var data = {
			yrsalary: yrsalary,
			taxRate: taxRate,
			newTotal: newTotal
		}

	}

	if (yrsalary > 190150 && yrsalary <= 413350){
		var taxRate = 33;
		var newTotal = yrsalary * .67;

		var data = {
			yrsalary: yrsalary,
			taxRate: taxRate,
			newTotal: newTotal
		}

	}

	if (yrsalary > 413350 && yrsalary <= 415050){
		var taxRate = 35;
		var newTotal = yrsalary * .65;

		var data = {
			yrsalary: yrsalary,
			taxRate: taxRate,
			newTotal: newTotal
		}
	}
	

	if (yrsalary > 415050){
		var taxRate = 39.6;
		var newTotal = yrsalary * .604;
	

		var data = {
			yrsalary: yrsalary,
			taxRate: taxRate,
			newTotal: newTotal
		}

	} else {
		var data = {
			error: 1,
			message: "Your input was not valid. You may only enter numbers."
		}
	}

	res.render('total',data);
	
});

// 404 Not found catch-all handler 
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 server error handler 
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// start server
app.listen(3000, function(){
	console.log( 'Express started on http://localhost:3000; press Ctrl-C to terminate.' );
});