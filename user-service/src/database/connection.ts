import mysql from 'mysql2'

// Create MySQL Connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'gc_db',
  port: 3307
})

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message)
    return
  }
  console.log('✅ Connected to MySQL as ID', db.threadId)
})

// Export the database connection
export default db
