import axios, { AxiosResponse, AxiosError} from "axios";
const url = 'http://localhost:3000/'

const axiosInstance = axios.create({
    baseURL: url, 
});

export default  axiosInstance