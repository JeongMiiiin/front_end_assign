import userType from "@/type/UserType";
import { HttpJson } from "./Http";

const api = HttpJson;

const RequestLogin = async (param: object, success: ({data} : {data: userType}) => void, fail: (error: unknown) => void) => {
    await api.post(`/user`, JSON.stringify(param)).then(success).catch(fail);
}

export { RequestLogin };