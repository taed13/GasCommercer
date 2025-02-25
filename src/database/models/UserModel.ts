import { DataTypes, Model } from 'sequelize'
import Database from '../connection'

const sequelize = Database.getInstance()

export interface IUser extends Model {
    id: number
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

const User = sequelize.define<IUser>(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Name must be provided' },
                len: { args: [3, 50], msg: 'Name must be at least 3 characters' }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: 'Please provide a valid email' }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Password must be provided' },
                len: { args: [8, 100], msg: 'Password must be at least 8 characters' }
            }
        }
    },
    {
        timestamps: true,
        tableName: 'users'
    }
)

export default User
