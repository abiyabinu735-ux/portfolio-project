require("dotenv").config();
const { Pool } = require("pg");

// Debug: check if env is loading
console.log("DB URL Loaded:", process.env.DATABASE_URL ? "✅ Yes" : "❌ No");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function createTable() {
  try {
    // Test connection first
    await pool.query("SELECT NOW()");
    console.log("✅ Connected to database successfully!");

    const query = `
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(query);
    console.log("✅ Table 'messages' created successfully!");
    
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await pool.end();
    console.log("🔌 Connection closed");
  }
}

createTable();