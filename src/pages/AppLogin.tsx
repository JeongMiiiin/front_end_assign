import { useEffect } from "react";
import { getList } from "@/api/User";
import PageStyle from "@/resources/css/page/AppLogin.module.css";

const AppLogin = () => {
    async function fetchData(){
        await getList(({data}) => {
            console.log(data);
        }, (error) => {console.log(error)});
    }

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <div className={`col-12 ${PageStyle.login_con}`}>
            로그인
        </div>
    )
}

export default AppLogin;