require('dotenv').config();
const { Pool } = require('pg');

// Connect to Render database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      message TEXT
    )
  `;
  
  try {
    await pool.query(query);
    console.log("✅ Table 'messages' created successfully!");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  } finally {
    pool.end();
  }
}

createTable();