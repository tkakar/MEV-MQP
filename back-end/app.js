var express = require('express')
  , app = express()
  , port = 3001
const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/faers',
});

client.connect()
  

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.get('/getdata', (req, res) => {
  console.log('got a request')
  client.query('SELECT * FROM demo limit 50', (err, data) => {
    console.log(data.rows)
    res.status(200).send(data);
  })

  // res.status(200).send({hi: 'hi'})
})

app.post('/getdata', (req, res) => {
  console.log('got a request')
  // client.query('SELECT * FROM demo limit 5', (err, data) => {
  //   res.send(data);
  // })

  res.status(200).send({hi: 'hi'})
});

app.listen(port);
console.log('listening on ' + port)

