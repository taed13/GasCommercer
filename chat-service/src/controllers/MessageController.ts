import { Response } from 'express'
import { AuthRequest } from '../middleware'
import { Message } from '../database'
import { ApiError, handleMessageReceived } from '../utils'

const send = async (req: AuthRequest, res: Response) => {
    try {
        const { receiverId, message } = req.body
        const { _id, email, name } = req.user

        validateReceiver(_id, receiverId)

        const newMessage = await Message.create({
            senderId: _id,
            receiverId,
            message
        })

        await handleMessageReceived(name, email, receiverId, message)

        return res.json({
            status: 200,
            message: 'Message sent successfully!',
            data: newMessage
        })
    } catch (error: unknown) {
        const err = error as Error
        return res.status(500).json({
            status: 500,
            message: err.message || 'Something went wrong'
        })
    }
}

const validateReceiver = (senderId: string, receiverId: string) => {
    if (!receiverId) {
        throw new ApiError(404, 'Receiver ID is required.')
    }

    if (senderId == receiverId) {
        throw new ApiError(400, 'Sender and receiver cannot be the same.')
    }
}

const getConversation = async (req: AuthRequest, res: Response) => {
    try {
        const { receiverId } = req.params
        const senderId = req.user._id

        const messages = await Message.findAll({
            where: {
                senderId: [senderId, receiverId],
                receiverId: [senderId, receiverId]
            },
            order: [['createdAt', 'ASC']]
        })

        return res.json({
            status: 200,
            message: 'Messages retrieved successfully!',
            data: messages
        })
    } catch (error: unknown) {
        const err = error as Error
        return res.status(500).json({
            status: 500,
            message: err.message || 'Something went wrong'
        })
    }
}

export default {
    send,
    getConversation
}
