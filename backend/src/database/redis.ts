import redis from 'redis';
import { promisify } from 'util';

// create a new client (by default will use 6379)
export const client = redis.createClient();

// listen for connect
client.on('connect', () => {
  console.log('Redis client connected');
});
client.HGETALL('moodcounter', (err: any, reply: any) => console.log(reply));
export const asyncHincrby = promisify(client.hincrby).bind(client);
export const asyncHgetall = promisify(client.hgetall).bind(client);
export const asyncHget = promisify(client.hget).bind(client);
export const asyncFlushDB = promisify(client.flushdb).bind(client);



client.on('error', (error: any) => {
  console.error(error);
});

// liste room SADD room:id_room user_id
// HSET key field value créer un champ dans une clé

// emoticones
// HSET user:user_id emotion 'happy'
// liste actions:user_id "coffee, slow_down"

/* 
un moodcounter par room

{
  ROOM_1 : {
    happy: [user_1, user_2, user_3 ...], => possibilité de calculer la length && afficher la liste des users concernés
    dead: [user_1, user_2, user_3 ...],
    ....
  },
  ROOM_2 : {
    happy: [user_1, user_2, user_3 ...], => possibilité de calculer la length
    dead: [user_1, user_2, user_3 ...],
    ....
  }
}




*/
