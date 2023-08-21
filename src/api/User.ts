import { HttpJson } from "./http";

const api = HttpJson;

const getList = async (success: ({data} : {data: object}) => void, fail: (error: unknown) => void) => {
    await api.get(`/user`).then(success).catch(fail);
}

export {getList};