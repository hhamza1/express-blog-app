var express   = require('express'),
    mongoose  = require('mongoose'),
    bodyParser = require('body-parser'),
    app       = express();

// APP CONFIG

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 3000;


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


//ROOT ROUTE

app.get("/", function(req, res){
    res.redirect("/posts");
});

//INDEX ROUTE

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

// FORM ROUTE

app.get("/posts/new", function(req, res){
    res.render("new");
});

// NEW POST ROUTE

app.post("/posts", function(req, res){
    Post.create(req.body.post, function(err, newPost ){
        if(err){
            res.send("new");
        }
        else{
            res.redirect("posts");
        }
    });
});

// SHOW ROUTE

app.get("/posts/:id", function(req, res){
    var postId = req.params.id;
    Post.findById(postId, function(err, fullPost){
        if(err){
            console.log("Error finding the specific post");
        }
        else{
            res.render("show", { post : fullPost});
        }
    });
});

app.listen(port , function(){
    console.log("Server started at port: " + port);
});