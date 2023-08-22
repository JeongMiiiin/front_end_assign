import { HttpJson, HttpForm } from "./Http";
import { postListType } from "@/type/PostType";

const getPostList = async (param: object, success: ({data} : {data: postListType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`post`, {params : param}).then(success).catch(fail); 
}

const insertPostData = async (param: FormData, success: ({data} : {data: boolean}) => void, fail: (error: unknown) => void) => {
    await HttpForm.post("post", param).then(success).catch(fail);
}

const updatePostData = async (postIdx: number, param: FormData, success: ({data} : {data: boolean}) => void, fail: (error: unknown) => void) => {
    await HttpForm.put(`post/${postIdx}`, param).then(success).catch(fail);
}

const deletePostData = async (postIdx: number, success: ({data} : {data: boolean}) => void, fail: (error: unknown) => void) => {
    await HttpJson.delete(`post/${postIdx}`).then(success).catch(fail);
}

export { getPostList, insertPostData, updatePostData, deletePostData };