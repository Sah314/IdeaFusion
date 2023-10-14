import {neon, neonConfig } from "@neondatabase/serverless";
import {drizzle} from 'drizzle-orm/neon-http';

neonConfig.fetchConnectionCache = true

if(!process.env.NEON_DB_KEY){
    throw new Error("Database not connected")
}


const sql = neon(process.env.NEON_DB_KEY);

export const db = drizzle(sql);
