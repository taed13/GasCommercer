import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

class Database {
    private static instance: Sequelize

    private constructor() {} // Private constructor to prevent direct instantiation

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            Database.instance = new Sequelize(
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

            Database.instance
                .sync({ alter: true }) // Use { force: true } to drop and recreate tables
                .then(() => console.log('✅ Database & tables synced successfully'))
                .catch((err) => console.error('❌ Database sync error:', err))
        }
        return Database.instance
    }
}

export default Database
