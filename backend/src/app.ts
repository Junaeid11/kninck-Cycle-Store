import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "https://krinck.vercel.app" }));

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response, next: NextFunction) => {

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Welcome to krinck Store",
    developerContact: {
      email: "junaeidahmed979@gmail.com",
    },
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
