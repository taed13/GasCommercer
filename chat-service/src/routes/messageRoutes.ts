import { Router } from 'express'
import MessageController from '../controllers/MessageController'
import { authMiddleware } from '../middleware'

const messageRoutes = Router()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
messageRoutes.post('/send', authMiddleware, MessageController.send)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
messageRoutes.get('/get/:receiverId', authMiddleware, MessageController.getConversation)

export default messageRoutes
