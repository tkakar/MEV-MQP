var express = require('express')
  , app = express()
  , port = 3001
const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/faers',
});

client.connect()

client.query('SELECT * FROM demo', (err, data) => {
  console.log(err, data)
})
  
app.get('/', (req, res) => {
  
})

app.post('/', (req, res) => {

})

app.listen(port);
console.log('listening on ' + port)

