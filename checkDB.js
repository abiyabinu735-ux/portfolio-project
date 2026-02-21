require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Render
});

async function checkMessages() {
  const res = await pool.query("SELECT * FROM messages");
  console.log(res.rows);
  pool.end();
}

checkMessages();