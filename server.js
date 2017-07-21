const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/js', (req, res) => {
  res.sendFile(path.join(__dirname, 'bundle.js'));
});

app.get('/style', (req, res) => {
  res.sendFile(path.join(__dirname, 'style.css'));
});
//app.set('view engine', 'html');
//app.use(express.static('views'));
//htmlController(app);
const title = [];

app.post('/api/content', (req, res) => {
  const value = req.body.value;
  const time = JSON.parse(JSON.stringify(new Date()));
  title.push({content:value, time:time, content2:[]});
});

app.post('/api/content2', (req, res) => {
  const time = JSON.parse(JSON.stringify(new Date()));
  for (var i=0;i<title.length;i++) {
    if(title[i].content===req.body.cont) {
      title[i].content2.push({item:req.body.cont2, time:time});
    }
  }
});

app.get('/api', (req, res) => {
  res.send({ title });
});

app.listen(port, () => {
  console.log('server on');
});
