import express from 'express'
import proxy from 'express-http-proxy'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authProxy = proxy('http://127.0.0.1:8081', {
    proxyReqPathResolver: (req) => `/api/auth${req.url}`
})

const messagesProxy = proxy('http://127.0.0.1:8082', {
    proxyReqPathResolver: (req) => `/api/messages${req.url}`
})

const notificationsProxy = proxy('http://127.0.0.1:8083', {
    proxyReqPathResolver: (req) => `/api/notifications${req.url}`
})

// Apply Proxies
app.use('/api/auth', authProxy)
app.use('/api/messages', messagesProxy)
app.use('/api/notifications', notificationsProxy)

const server = app.listen(8080, () => {
    console.log('🌐 Gateway is Listening on Port 8080')
})

// Graceful shutdown for the gateway
const exitHandler = () => {
    console.log('🔴 Shutting down Gateway...')
    server.close(() => {
        console.info('✅ Gateway closed')
        process.exit(1)
    })
}

process.on('uncaughtException', exitHandler)
process.on('unhandledRejection', exitHandler)
