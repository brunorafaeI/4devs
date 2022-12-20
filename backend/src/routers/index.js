import { Router } from "express"
import AuthRouter from "../controllers/auth.routes.js"

const routes = Router()

routes.use("/auth", AuthRouter)

export default routes
