import express from 'express'
import db from './database/connection'

const app = express()
const PORT = process.env.PORT ?? 3000

// Middleware
app.use(express.json())

// Test Route to Check DB Connection
app.get('/test-db', (req, res) => {
  db.query('SELECT NOW()', (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database connection failed', error: err.message })
    }
    res.json({ message: 'Database connected successfully', time: result[0] })
  })
})

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
