import axios from "axios";
import http from "./http";
type urlType = string;
type paramsType = Record<string, unknown>;
type urlAndParams = {
    url: urlType,
    params?: paramsType
}
const api = {
    callGet({ url, params }: urlAndParams){
        return http.get(url, { params });
    },
    callPost({ url, params ,data}: urlAndParams){
         return http.post(url,data ,{ params });
    },
    callMockApi({url}:{url:urlType}){
        return axios.get(url);
    }
}
export default api;