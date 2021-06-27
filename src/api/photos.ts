import axios, { AxiosResponse } from "axios";
import Photo from "../models/photo";

const apiURL: string = "https://jsonplaceholder.typicode.com/";



export const getPhotoById = (id: number): Promise<AxiosResponse<Photo>> => {
    return axios.get(`${apiURL}photos/${id}`);
}