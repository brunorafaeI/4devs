import { Router } from "express"
import multer from 'multer'

import upload from '../app/config/upload.js'
import UserRepository from '../models/user/UserRepository.js'
import authConfig from '../app/config/auth.js'

const AuthRouter = Router()
const picture = multer({ storage: upload.storage })

AuthRouter.post(
  "/register",
  picture.single("picture"),
  async (req, res) => {
    const { body } = req

    try {
      const saveUser = await UserRepository.create(body)
      res.status(201).json(saveUser)

    } catch (err) {
      throw err
    }
  }
)

AuthRouter.post(
  "/login",
  async (req, res) => {
    const { body } = req
    const { email, password } = body

    try {
      const findUser = await UserRepository.checkLogin(email, password)
      const token = authConfig.createToken(findUser._id)

      res.status(200).json({ user: findUser, token })

    } catch (err) {
      throw err
    }
  }
)

export default AuthRouter
