import { Request, Response } from 'express'
import express, { Application} from 'express'
import router from './router'

import cookieParser from "cookie-parser";
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import cors from 'cors'

const app: Application = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({origin: 'https://cycle-mama.vercel.app', credentials: true} ))


app.use('/api/', router)
app.use(globalErrorHandler)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Bi-Cycle Store')
  })
export default app

