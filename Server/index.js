const keys = require('./keys');

//express app setup
const express = require('express');
const bodyPraser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const redis = require('redis');
 
const app = express();
app.use(cors());
app.use(bodyPraser.json());

//postgres client setup
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})

pgClient.on('error', () => {
    console.log('Lost connection with PG server')
})

pgClient.on('connect', () => {
    pgClient
      .query('CREATE TABLE IF NOT EXISTS customValue (number INT)')
      .catch((err) => console.log(err));
  });
   
// redis client setup
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});


const redisPublisher = redisClient.duplicate();


// express route handler
app.get('/',(req,res) => {
    res.send('Hi');
});

// postgres alll data
app.get('/values/all',async (req,res) => {
    const values = await pgClient.query('SELECT  * from customvalue');
    res.send(values.rows);
})


app.get('/values/current', async (req,res) => {
    redisClient.hgetall('values',(err,values) => {
        res.send(values);
    });
});

app.post('/values',async (req,res) => {
    const index = req.body.index;
    if(parseInt(index)> 40) {
        return res.status(422).send('Index hi');
    }

    redisClient.hset('values',index,'Nothing yet!');
    redisPublisher.publish('insert',index);

    await pgClient.query('insert into customvalue (Number) values($1)',[index]);
    res.send({working: true});
})

app.listen(5000,err => {
    console.log('Listening at 5000');
})