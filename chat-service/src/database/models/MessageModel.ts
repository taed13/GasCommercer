import { DataTypes, Model } from 'sequelize'
import sequelize from '../connection'

export enum Status {
    NotDelivered = 'NotDelivered',
    Delivered = 'Delivered',
    Seen = 'Seen'
}

export interface IMessage extends Model {
    id: number
    senderId: string
    receiverId: string
    message: string
    status: Status
    createdAt: Date
    updatedAt: Date
}

const Message = sequelize.define<IMessage>(
    'Message',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        senderId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receiverId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(...Object.values(Status)),
            defaultValue: Status.NotDelivered
        }
    },
    {
        timestamps: true,
        tableName: 'messages'
    }
)

export default Message
