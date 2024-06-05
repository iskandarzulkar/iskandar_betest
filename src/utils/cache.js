// const redis = require('redis');

require('dotenv').config();

// const URL_REDIS   = process.env.URL_REDIS;
// const PORT_REDIS  = process.env.PORT_REDIS;

// const client = redis.createClient({
//     host: "127.0.0.1",
//     port: "6379",
//     password : "",
//     use : ""
// });

// client.on('error', (err) => {
//     console.error('Redis error:', err);
// });

const redis = require('ioredis');
const client = redis.createClient({host:'127.0.0.1',port:"6379",username:'',password:''});

client.on('connect',() => {
    console.log('connected to redis successfully!');
})

client.on('error',(error) => {
    console.log('Redis connection error :', error);
})


const cache = {
    get: (key) => new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    }),

    set: (key, value, exp) => {
        client.set(key, value, 'EX', exp);
    },
    
    del: (key) => new Promise((resolve, reject) => {
        client.del(key, (err, reply) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(reply);
            }
        });
    })
};

module.exports = cache;
