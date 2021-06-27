import axios, { AxiosResponse } from "axios";
import Post from "../models/post";
import User from "../models/user";
import { getPhotoById } from "./photos";
const apiURL: string = "https://jsonplaceholder.typicode.com/";

export const getUser = (userId: number): Promise<AxiosResponse<User>> => {
    return axios.get(`${apiURL}users/${userId}`);
};


export const getUserPostsById = (userId: number, limit:number  = 20): Promise<AxiosResponse<Post[]>> => {
    limit = limit < 1 ? 10 : limit;
    return axios.get(`${apiURL}users/${userId}/posts?_limit=${limit}`)
 }

 export const getUsersWithPhoto = async (): Promise<User[]> => {
    let users = await axios.get<User[]>(`${apiURL}users`).then(response => response.data);
    users = [...users, ...users, users[0]];

    let usersWithPhoto: Promise<User[]> = Promise.all(users.map(async (u: User) => {
        u.userPhoto = await getPhotoById(u.id).then(resp => resp.data.thumbnailUrl);
        return u;
    }))

    return usersWithPhoto;
}






