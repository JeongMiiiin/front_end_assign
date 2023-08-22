import { HttpJson } from "./Http";

const insertCommentData = async (param: object, success: ({data} : {data: boolean}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post("comment", {params : param}).then(success).catch(fail);
}

const updateCommentData = async (commentIdx: number, param: FormData, success: ({data} : {data: boolean}) => void, fail: (error: unknown) => void) => {
    await HttpJson.put(`comment/${commentIdx}`, param).then(success).catch(fail);
}

const deleteCommentData = async (commentIdx: number, success: ({data} : {data: boolean}) => void, fail: (error: unknown) => void) => {
    await HttpJson.delete(`comment/${commentIdx}`).then(success).catch(fail);
}

export { insertCommentData, updateCommentData, deleteCommentData };