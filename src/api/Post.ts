import { HttpJson } from "./Http";
import { postListType } from "@/type/PostType";

const api = HttpJson;

const getPostList = async (param: object, success: ({data} : {data: postListType}) => void, fail: (error: unknown) => void) => {
    await api.get(`/post`, {params : param}).then(success).catch(fail); 
}

export { getPostList };