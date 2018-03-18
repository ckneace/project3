const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//to accept incoming POST requests -- put them in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//sets up a directory called "public" that we'll serve, just like an ordinary web server
app.use(express.static('public'))

let items = [];
let id = 0;

app.get('/api/items', (req, res) => {
  res.send(items);
});

app.post('/api/items', (req, res) => {
  id = id + 1;
  let item = {id:id, text:req.body.text, text2:req.body.text2, completed: req.body.completed};
  items.push(item);
  res.send(item);
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = items.map(item => { return item.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  items.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => { return item.id; });
  let index = itemsMap.indexOf(id);
  let item = items[index];
  item.completed = req.body.completed;
  item.text = req.body.text;
  item.text2 = req.body.text2;
  // handle drag and drop re-ordering
  if (req.body.orderChange) {
    let indexTarget = itemsMap.indexOf(req.body.orderTarget);
    items.splice(index,1);
    items.splice(indexTarget,0,item);
  }
    res.sendStatus(200);
});

// app.put('/api/increase/:id', (req, res) => {
//   let id = parseInt(req.params.id);
//   let itemsMap = items.map(item => { return item.id; });
//   let index = itemsMap.indexOf(id);
//   let item = items[index];
//   if(item.priors == "Prior2"){
//     item.priors = "Prior1";
//   }
//   if(item.priors == "Prior3"){
//     item.priors ="Prior2";
//   }
//   res.send(item);
// });

// app.put('/api/decrease/:id', (req, res) => {
//   let id = parseInt(req.params.id);
//   let itemsMap = items.map(item => { return item.id; });
//   let index = itemsMap.indexOf(id);
//   let item = items[index];
//   if(item.priors == "Prior2"){
//     item.priors = "Prior3";
//   }
//   if(item.priors == "Prior1"){
//     item.priors = "Prior2";
//   }
//   res.send(item);
// });
//
// app.put('/api/sort/', (req, res) => {
//   let newItems = [];
//   items.forEach(function(oneitem){
//     if(oneitem.priors == "Prior1"){
//       newItems.push(oneitem);
//     }
//   });
//   items.forEach(function(oneitem){
//     if(oneitem.priors == "Prior2"){
//       newItems.push(oneitem);
//     }
//   });
//     items.forEach(function(oneitem){
//       if(oneitem.priors == "Prior3"){
//         newItems.push(oneitem);
//       }
//     });
//   items = newItems;
//   res.send();
// });

app.listen(3000, () => console.log('Server listening on port 3000!'))
