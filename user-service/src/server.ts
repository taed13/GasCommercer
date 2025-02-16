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
app.use(express.urlencoded({ extended: true }))

// Route handling: All routes inside `userRouter` will be prefixed with `/api`
app.use('/api/auth', userRouter)

// Error handling middleware
app.use(errorConverter)
app.use(errorHandler)

// Check database connection
sequelize
    .authenticate()
    .then(() => console.log('✅ Database connected successfully!'))
    .catch((err) => console.error('❌ Database connection failed:', err))

// Start the Auth Service server
const server: Server = app.listen(config.PORT, () => {
    console.log(`🚀 Auth Service is running on port ${config.PORT}`)
})

// Initialize RabbitMQ connection
const initializeRabbitMQClient = async () => {
    try {
        await rabbitMQService.init()
        console.log('🐇 RabbitMQ client initialized and listening for messages.')
    } catch (err) {
        console.error('❌ Failed to initialize RabbitMQ client:', err)
    }
}

initializeRabbitMQClient()

// Graceful shutdown
const exitHandler = () => {
    console.log('🔴 Shutting down Auth Service...')
    server.close(() => {
        console.info('✅ Auth Service closed')
        process.exit(1)
    })
}

process.on('uncaughtException', exitHandler)

process.on('unhandledRejection', exitHandler)
