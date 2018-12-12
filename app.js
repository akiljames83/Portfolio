var express     = require('express'),
    app         = express(),
    bodyParser  = require("body-parser"),
    //cmd         = require('node-cmd'),
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
 service: 'gmail',
 host: 'smtp.gmail.com',
 port: 465,
 secure: true,
 //socketTimeout: 5000,
 //logger: true,
 auth: {
        user: 'akilportfolio@gmail.com',
        pass: 'akilportfolio1'
    }
});
// Personalized Emails:
var d = new Date();
var Month= d.getMonth() + 1;
var Day = d.getDate();
var Year = d.getFullYear();
var hour = d.getHours();
var minute = d.getMinutes();
var date = 'at: '+ String(Month)+ '/'+ String(Day)+'/' + String(Year) +' '+ String(hour)+':' + String(pad(minute,2));
var mailOptions = {
  from: 'akilportfolio@gmail.com', // sender address
  to: 'akilportfolio@gmail.com, akil.james83@gmail.com', // list of receivers
  subject: 'Message from Portfolio Page ' + date, // Subject line
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
    var phone = req.body.phone;
    var message = req.body.message;
    
    var print = name + '\n' + phone + '\n' + email + '\n' + message + '\n' + '\t--- END OF FORM ---\n\n';
    //var command = 'echo "'+print+'" >> form.txt' ;
    //cmd.run(command);
    
    console.log(print);
    
    //mailOptions.from = email;
    //mailOptions.to = 'akil.james83@gmail.com';//email;
    //mailOptions.html = print;
    
    //sendit();
    //req.flash('success', 'Message sent successfully!');
    res.redirect('/');
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Akil's portfolio site is being served!");
});

// Function
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}