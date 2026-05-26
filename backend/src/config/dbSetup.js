import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const setupDatabase = async () => {
  try {
    console.log("🚀 Starting database setup...");

    // =========================
    // CREATE TABLE
    // =========================
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Users table created");

    // =========================
    // INSERT 50K DUMMY USERS
    // =========================
    console.log("⏳ Inserting 50K dummy users...");

    await pool.query(`
      INSERT INTO users (name, email, age)
      SELECT
        'User ' || gs,
        'user' || gs || '@gmail.com',
        floor(random() * 60 + 18)::int
      FROM generate_series(1, 50000) AS gs
      ON CONFLICT (email) DO NOTHING;
    `);

    console.log("✅ 50K users inserted");

    // =========================
    // CREATE INDEXES
    // =========================

    // email UNIQUE already creates index automatically
    // but adding custom indexes below

    console.log("⏳ Creating indexes...");

    // Fast filtering/searching by age
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_age
      ON users(age);
    `);

    // Fast filtering by active status
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_active
      ON users(is_active);
    `);

    // Optimized sorting + pagination
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_age_id
      ON users(age, id);
    `);

    console.log("✅ Indexes created");

    // =========================
    // VERIFY TOTAL USERS
    // =========================
    const result = await pool.query(`
      SELECT COUNT(*) FROM users;
    `);

    console.log(`✅ Total Users: ${result.rows[0].count}`);

    console.log("🎉 Database setup completed successfully");
  } catch (error) {
    console.error("❌ Database setup failed");
    console.error(error);
  } finally {
    await pool.end();
  }
};

setupDatabase();
