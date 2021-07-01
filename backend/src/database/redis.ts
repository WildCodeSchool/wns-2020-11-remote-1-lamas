import redis from 'redis';
import { promisify } from 'util';

// create a new client (by default will use 6379)
export const client = redis.createClient({
  host: 'redis',
});

// listen for connect
client.on('connect', () => {
  console.log('Redis client connected');
});
// client.HGETALL('moodcounter', (err: any, reply: any) => console.log(reply));
export const asyncHincrby = promisify(client.hincrby).bind(client);
export const asyncHgetall = promisify(client.hgetall).bind(client);
export const asyncHget = promisify(client.hget).bind(client);
export const asyncHdel = client.hdel.bind(client);
export const asyncHmset = client.hmset.bind(client);
export const asyncFlushDB = promisify(client.flushdb).bind(client);
export const asyncgetLength = promisify(client.scard).bind(client);
export const asyncSadd = client.sadd.bind(client);
export const asyncSrem = client.srem.bind(client);
export const asyncSisMember = promisify(client.sismember).bind(client);
export const asyncSMembers = promisify(client.smembers).bind(client);
export const asyncSDel = client.del.bind(client);

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
  idRoom : {
    happy: [user_1, user_2, user_3 ...], => possibilité de calculer la length && afficher la liste des users concernés
    dead: [user_1, user_2, user_3 ...],
    ....
  },
  ROOM_2 : {
    happy: [user_1, user_2, user_3 ...], => possibilité de calculer la length
    dead: [user_1, user_2, user_3 ...],
    ....
  }
  userList-roomId {
    userList : [id, id]
  }
}
*/

/**  Sets
 * user-list-roomid {
 * id
 * id2
 * ...
 * }
 *
 */

/* string[] => hmGet

/** hash
 * user-roomId-userId {
 * name
 *  
 * }
 * 
 * 
 * 
 */

// MEMBER

// roomId-messageKeys
// "41525454524" => uuid()
// id

// SET

// roomId-message-id {
// idUser : "51515125125"
// firstname
// lastname
// date
// text
//}
