import { useRef } from "react";
import { RequestLogin } from "@/api/User";
import { userAtom } from "@/atom/UserAtom";
import { useSetRecoilState } from "recoil";
import PageStyle from "@/resources/css/page/AppLogin.module.css";
import { useNavigate } from 'react-router-dom';

const AppLogin = () => {
    const navigate = useNavigate();
    const idInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const setUser = useSetRecoilState(userAtom);

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        if(idInput.current!.value == ""){
            alert("아이디를 입력해주세요");
            return;
        }

        if(passwordInput.current!.value == ""){
            alert("비밀번호를 입력해주세요");
            return;
        }

        const param = {
            id : idInput.current!.value,
            password : passwordInput.current!.value
        }

        await RequestLogin(param, ({data}) => {
            if(data.userIdx != null){
                setUser(data);
                navigate("/");
            } else {
                alert('로그인 실패');
            }
        }, (error) => {console.log(error)});
    }

    return (
        <div className={`col-12 ${PageStyle.login_wrap}`}>
            <form className="col-12" onSubmit={(e) => void formSubmit(e)}>
                <div className="col-12">
                    <div className="col-12">
                        <div className="col-12 col-md-0 labe_box">
                            <label htmlFor="id">아이디</label>
                        </div>
                        <div className="col-12 col-md-0 input_box">
                            <input type="text" id="id" ref={idInput} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="col-12 col-md-0 labe_box">
                            <label htmlFor="">비밀번호</label>
                        </div>
                        <div className="col-12 col-md-0 input_box">
                            <input type="password" id="password" ref={passwordInput} />
                        </div>
                    </div>
                </div>
                <div className="col-12 btn_style_0_con">
                    <button type="submit">로그인</button>
                </div>
            </form>
        </div>
    )
}

export default AppLogin;