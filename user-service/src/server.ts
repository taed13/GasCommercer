import express, { Express } from 'express'
import { Server } from 'http'
import userRouter from './routes/authRoutes'
import { errorConverter, errorHandler } from './middleware'
import { sequelize } from './database'
import config from './config/config'
import { rabbitMQService } from './services/RabbitMQService'

const app: Express = express()

// Middleware to parse JSON requests
app.use(express.json())

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }))

// Route handling: All routes inside `userRouter` will be prefixed with `/api`
app.use('/api', userRouter)

// Middleware for handling errors
app.use(errorConverter) // Converts errors into APIError format
app.use(errorHandler) // Handles all errors and sends a response

// Check database connection before starting the server
sequelize
    .authenticate()
    .then(() => console.log('✅ Database connected successfully!'))
    .catch((err) => console.error('❌ Database connection failed:', err))

// Start the Express server and listen on the specified port
const server: Server = app.listen(config.PORT, () => {
    console.log(`🚀 Server is running on port ${config.PORT}`)
})

// Initialize RabbitMQ message broker
const initializeRabbitMQClient = async () => {
    try {
        await rabbitMQService.init() // Establishes connection and listens for messages
        console.log('🐇 RabbitMQ client initialized and listening for messages.')
    } catch (err) {
        console.error('❌ Failed to initialize RabbitMQ client:', err)
    }
}

// Run the RabbitMQ client initialization
initializeRabbitMQClient()

// Graceful shutdown: Handles server termination to free up resources
const exitHandler = () => {
    console.log('🔴 Shutting down server...')
    server.close(() => {
        console.info('✅ Server closed')
        process.exit(1)
    })
}

// Handle unexpected errors and unhandled promise rejections
const unexpectedErrorHandler = (error: unknown) => {
    console.error('⚠️ Unexpected Error:', error)
    exitHandler()
}

// Catch and handle uncaught exceptions (e.g., runtime errors)
process.on('uncaughtException', unexpectedErrorHandler)

// Catch and handle unhandled promise rejections (e.g., async errors)
process.on('unhandledRejection', unexpectedErrorHandler)
