const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');
const app = express();
const port = 3000;

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
//GET REQUEST
app.get('/', (req, res) => {

  let today = new Date();
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }
 let day = today.toLocaleDateString('en-US', options);


  res.render('list', {listTitle: day, newListItems: items});

});



//POST request

app.post('/', (req, res)=>{

let item = req.body.newItem;

if (req.body.list === "Work"){
  workItems.push(item);
  res.redirect('/work');
}else{
  items.push(item);
 res.redirect('/');
}

});


app.get('/work', (req, res)=>{
  res.render('list', {listTitle: "Work List", newListItems: workItems});
});

app.get('/about', (req, res)=>{
  res.render('about');
})


app.listen(port, () => {
  console.log("The server is running on port 3000");
});
