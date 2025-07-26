import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || "",
  db: process.env.REDIS_DB || 0,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redisClient.on("connect", () => console.log("Redis client connected"));
redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.on("reconnecting", () => console.log("Redis reconnecting"));
redisClient.on("ready", () => console.log("Redis ready"));

export default redisClient;
