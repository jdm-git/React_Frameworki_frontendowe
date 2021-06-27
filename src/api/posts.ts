import axios, { AxiosResponse } from "axios"
import Post from "../models/post";


const apiUrl: string = "https://jsonplaceholder.typicode.com/";


export const getPostsWithLimit = (limit: number = 20): Promise<AxiosResponse<Post[]>> => {
   limit = limit < 1 ? 10 : limit;
   return axios.get(`${apiUrl}posts?_limit=${limit}`);
}

