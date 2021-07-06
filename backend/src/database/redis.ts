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
