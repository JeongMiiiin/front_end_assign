import { HttpJson } from "./Http";

const insertCommentData = async (param: object, success: ({data} : {data: boolean}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post("comment", {params : param}).then(success).catch(fail);
}

export { insertCommentData };