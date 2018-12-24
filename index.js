
var express=require('express');
var app=express();
var bodyparser=require('body-parser');var tasks=[{name:"bath"},{name:"eat"}];

var mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://neha:neha1188@ds243254.mlab.com:43254/todoapp');

//create schema for mongodb..this is like a blueprint
var todoschema=new mongoose.Schema(
  {
    name:String
  });

  //craeting a model
  var todo=mongoose.model('todo',todoschema);
  //creating an item and saving it in database
/*var item1=todo({name:'bath'}).save(function(err)
{
  if(err)
  throw err;
  console.log("saved");
});*/

var urlencodedParser = bodyparser.urlencoded({ extended: false });

//setting upa viw engine
app.set('view engine','ejs');

//for css files and other static files requests
app.use(express.static('tosoapp'));


app.get("/",function(req,res)
{
  //todo.find searches for a specific data or all the data in the database
  //iftodo.find({}) is returnsa all the data
  todo.find({},function(err,datafromdb)
  {
      res.render("index",{tasks:datafromdb});

  })

});

app.post("/todo",urlencodedParser,function(req,res)
{
  var newtodo=todo(req.body).save(function(err,datafromdb)
  {
    if(err)
    throw err;

    todo.find({},function(err,datafromdb1)
    {
        res.render("index",{tasks:datafromdb1});

    })

  });

});

app.listen('3000');
console.log("you are listening toi port 3000");
