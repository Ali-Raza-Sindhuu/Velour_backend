import { createClient } from "redis";

const redisClient = createClient({
    url : `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
})

redisClient.on("connect", () => {
    console.log("Redis Connected")
})

redisClient.on("error", (err) => {
    console.log(`Error in Redis Connection`, err)
})

await  redisClient.connect()

export default redisClient;