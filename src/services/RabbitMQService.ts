import amqp, { Channel, Connection } from 'amqplib'
import config from '../config/config'
import { User } from '../database'
import { ApiError } from '../utils'

class RabbitMQService {
    private readonly requestQueue = 'USER_DETAILS_REQUEST'
    private readonly responseQueue = 'USER_DETAILS_RESPONSE'
    private connection!: Connection
    private channel!: Channel

    async init() {
        try {
            // Establish connection to RabbitMQ server
            this.connection = await amqp.connect(config.msgBrokerURL!)
            this.channel = await this.connection.createChannel()

            // Asserting queues ensures they exist
            await this.channel.assertQueue(this.requestQueue)
            await this.channel.assertQueue(this.responseQueue)

            // Start listening for messages on the request queue
            this.listenForRequests()
        } catch (error) {
            console.error('❌ RabbitMQ initialization error:', error)
        }
    }

    private async listenForRequests() {
        this.channel.consume(this.requestQueue, async (msg) => {
            if (!msg?.content) return

            try {
                const { userId } = JSON.parse(msg.content.toString())
                const userDetails = await getUserDetails(userId)

                this.channel.sendToQueue(this.responseQueue, Buffer.from(JSON.stringify(userDetails)), {
                    correlationId: msg.properties.correlationId
                })

                this.channel.ack(msg)
            } catch (error) {
                console.error('❌ Error processing message:', error)
            }
        })
    }
}

const getUserDetails = async (userId: string) => {
    const userDetails = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
    })

    if (!userDetails) {
        throw new ApiError(404, 'User not found')
    }

    return userDetails
}

export const rabbitMQService = new RabbitMQService()
rabbitMQService.init()
