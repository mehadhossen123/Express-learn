import express, {
  type Application,
  type Request,
  type Response,
} from "express";


import { userRouter } from "../modules/users/user.route";
import { profileRouter } from "../modules/profiles/profile.route";
import { authRouter } from "../modules/auth/auth.router";
const app: Application = express();

// middleware
app.use(express.json());
app.use("/api/users",userRouter)
app.use("/api/profiles",profileRouter)
app.use("/api/auth",authRouter)

// connect postgresql with this server ;


//  here we write the all api for whole project
app.get("/", (req: Request, res: Response) => {
  res.send("hello this is express server");
});





export default app