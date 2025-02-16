import { Server } from 'http'
import { Socket, Server as SocketIOServer } from 'socket.io'
import app from './app'
import { Message, sequelize } from './database'
import config from './config/config'

sequelize
    .sync()
    .then(() => console.log('✅ Database synchronized successfully'))
    .catch((err) => console.error('❌ Database synchronization failed:', err))

const server: Server = app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
})

const io = new SocketIOServer(server)
io.on('connection', (socket: Socket) => {
    console.log(`🔗 Client connected: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`❌ Client disconnected: ${socket.id}`)
    })

    socket.on('sendMessage', async (data) => {
        try {
            const { senderId, receiverId, message } = data

            const msg = await Message.create({ senderId, receiverId, message })

            io.to(receiverId).emit('receiveMessage', msg)
        } catch (error) {
            console.error('❌ Error sending message:', error)
        }
    })
})

const exitHandler = () => {
    console.log('🔴 Shutting down server...')
    server.close(() => {
        console.info('✅ Server closed')
        process.exit(1)
    })
}

const unexpectedErrorHandler = (error: unknown) => {
    console.error('⚠️ Unexpected Error:', error)
    exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)
