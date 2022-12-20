import { Router } from "express"
import AuthRouter from "../controllers/auth.routes.js"
import PostRouter from "../controllers/post.routes.js"
import UserRouter from "../controllers/user.routes.js"

const routes = Router()

routes.use("/auth", AuthRouter)
routes.use("/users", UserRouter)
routes.use("/posts", PostRouter)

export default routes
