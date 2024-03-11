import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    console.log(error);
    if (typeof error === "string") {
      res.status(400).json({
        status: "Failed",
        message: error,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Something went wrong!",
      });
    }
  } else {
    next();
  }
};

export default errorHandler;
