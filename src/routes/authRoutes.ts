import { Router } from 'express'
import AuthController from '../controllers/AuthController'

const userRouter = Router()

userRouter.post('/user/register', AuthController.register)
userRouter.post('/user/login', AuthController.login)

export default userRouter
