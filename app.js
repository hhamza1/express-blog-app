var express   = require('express'),
    mongoose  = require('mongoose'),
    bodyParser = require('body-parser'),
    app       = express();

// APP CONFIG

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE CONFIG
mongoose.connect("mongodb://localhost/posts");

var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    create: {type:Date, default:Date.now}
});

var Post = mongoose.model("Post", postSchema); 


//ROUTES

app.get("/", function(req, res){
    res.redirect("/posts");
});



app.get("/posts", function(req, res){
    Post.find({}, function(err, posts){
        if(err){
            console.log("Error!!");
        }
        else{
            res.render("index", { posts : posts});
        }
    });
});

app.get("/posts/new", function(req, res){
    console.log()
    res.render("create");
})

app.listen(3000, function(){
    console.log("Server started at port 3000");
})