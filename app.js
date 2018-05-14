var express = require('express'),
    app     = express(),
    bodyParser  = require("body-parser"),
    nodemailer  = require("nodemailer"),
    flash       = require('connect-flash');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(require("express-session")({
    secret : "A KDM original design",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


var transporter = nodemailer.createTransport({
 service: 'Yahoo',
 auth: {
        user: 'akil_great@rogers.com',
        pass: 'jacob8'
    }
});

var mailOptions = {
  from: 'akil_great@rogers.com', // sender address
  to: 'akil_great@rogers.com', // list of receivers
  subject: 'Message from Portfolio web-page', // Subject line
  html: '<p>Your html here</p>'// plain text body
};


function sendit() {
    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}


app.get("/", function(req, res){
    res.render("index", { message: req.flash('success') });
});

//CREATE - add new campground to DB
app.post("/", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var email = req.body.email;
    if (req.body.phone) {
        var phone = req.body.phone;
    }
    var message = req.body.message;
    
    var sendThis = "<p> Email sent from " + name + '.</p><br>';
    if(phone){
        sendThis += '<p> Their phone number is ' + phone + '.</p><br>';
    }
    sendThis += '<p> Their email is ' +email + ' .</p> <br>';
    sendThis += '<p> Their message is "' + message + '".</p><br> <p><center>End of message</center></p>';
    
    //mailOptions.to = email;
    mailOptions.html = sendThis;
    
    sendit();
    //req.flash('success', 'Message sent successfully!');
    res.redirect('/');
    console.log(sendThis)
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Akil's portfolio site is being served!");
});