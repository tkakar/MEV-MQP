var express = require('express')
  , app = express()
  , port = 3001
const { Client } = require('pg')
const bodyParser = require('body-parser');

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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/getdata', (req, res) => {
  console.log('got a request')
  client.query('SELECT sex, age, age_cod, occr_country FROM demo limit 500', (err, data) => {
    // console.log(data.rows)
    res.status(200).send(data);
  })
})

app.post('/getdata', (req, res) => {
  console.log('got a request with body:\n ', req.body)
  client.query('SELECT sex, age, age_cod, occr_country, REPT_DT FROM demo limit 500', (err, data) => {
    // console.log(data.rows)
    res.status(200).send(data);
  })
});

app.listen(port);
console.log('listening on ' + port)

