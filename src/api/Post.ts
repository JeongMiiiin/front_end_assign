import { HttpJson, HttpForm } from "./Http";
import { postListType, postViewType } from "@/type/PostType";

const getPostList = async (param: object, success: ({data} : {data: postListType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`post/list`, {params : param}).then(success).catch(fail); 
}

const getPostView = async (param: object, success: ({data} : {data: postViewType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`post/view`, {params : param}).then(success).catch(fail); 
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

export { getPostList, getPostView, insertPostData, updatePostData, deletePostData };