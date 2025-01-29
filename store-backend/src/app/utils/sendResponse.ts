/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express"

const sendResponse =<T> (res: Response, data:{
    statusCode : number,
    success: boolean,
    message?: string,
    data?: T
    meta?:any

}) =>{
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        meta: data.meta
    })
}
export default sendResponse