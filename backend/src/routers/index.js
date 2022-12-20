import { Router } from "express"
import AuthRouter from "../controllers/auth.routes.js"
import UserRouter from "../controllers/user.routes.js"

const routes = Router()

routes.use("/auth", AuthRouter)
routes.use("/users", UserRouter)

export default routes
