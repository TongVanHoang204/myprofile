const { Redis } = require("@upstash/redis");
const dotenv = require('dotenv');
const path = require('path');
const { createHash } = require("node:crypto");

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

async function clearOldCooldowns() {
  console.log('--- System Cooldown Cleanup ---');
  if (!redis) {
    console.log('Redis not configured, nothing to clear in cloud database.');
    return;
  }

  try {
    // We don't know the IP hashes, so we scan for the prefix
    const keys = await redis.keys('portfolio:contact:cooldown:ip:*');
    console.log(`Found ${keys.length} IP-based cooldown locks.`);
    
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log('SUCCESS: All old IP locks have been removed from Redis.');
    } else {
      console.log('No old IP locks found to clear.');
    }
  } catch (error) {
    console.error('Cleanup failed:', error.message);
  }
}

clearOldCooldowns();
