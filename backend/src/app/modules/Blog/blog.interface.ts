import { Date, Types } from "mongoose";

export interface TBlog {
    title: string;
    content: string;
    author: string;
    publishedDate?:string
    image:string    
    isPublished?: boolean;
    
}