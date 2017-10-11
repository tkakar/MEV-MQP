var express = require('express')
  , app = express()
  , port = 3001
const { Client } = require('pg')
const bodyParser = require('body-parser');

const client = new Client({
  user: 'MEVUser',
  host: 'mevdb.ccrdelq8psso.us-east-1.rds.amazonaws.com',
  database: 'faers',
  password: '2UdS1KQo',
  port: '5432'
});

client.connect()


const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('got a request')
  res.status(200).send({});
})

app.post('/getdata', (req, res) => {
  console.log('got a request with body:\n ', req.body)
  client.query('SELECT sex, age, age_cod, occr_country, REPT_DT, occp_cod FROM demo limit 500', (err, data) => {
    // console.log(data.rows)
    res.status(200).send(data);
  })
});

app.post('/gettimelinedata', (req, res) => {
  console.log('got a request for timeline data')
  let query = 
  "select a.init_fda_dt, count(case when a.outc_cod is not null then 1 end)::INTEGER as serious, count(case when a.outc_cod is null then 1 end)::INTEGER as not_serious "
+ "from (select d.init_fda_dt, o.outc_cod " 
+       "from (select primaryid, init_fda_dt "
+             "from demo) d "
+       "full outer join (select primaryid, outc_cod "
+             "from outc) o "
+       "on d.primaryid = o.primaryid) a "
+ "group by a.init_fda_dt "
+ "order by a.init_fda_dt"
  client.query(query, (err, data) => {
    // console.log(data.rows)
    res.status(200).send(data.rows);
  })
});

app.listen(port);
console.log('listening on ' + port)

