import { Pool } from "pg";

const pool = new Pool(); // Uses values from .env.local

export default pool;