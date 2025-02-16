import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME ?? 'gc_db',
    process.env.DB_USER ?? 'root',
    process.env.DB_PASSWORD ?? 'root',
    {
        host: process.env.DB_HOST ?? '127.0.0.1',
        port: Number(process.env.DB_PORT) || 3306,
        dialect: (process.env.DB_DIALECT as 'mysql') ?? 'mysql',
        logging: false
    }
)

sequelize
    .sync({ alter: true }) // Use { force: true } to drop and recreate table
    .then(() => console.log('✅ Database & tables synced successfully'))
    .catch((err) => console.error('❌ Database sync error:', err))

export default sequelize
