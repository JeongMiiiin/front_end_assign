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
            <form className={`col-12 ${PageStyle.login_con}`} onSubmit={(e) => void formSubmit(e)}>
                <div className="col-12 mb20 mb-md-30 form_style_0_con">
                    <div className="col-12 form_style_0">
                        <div className="col-12 col-md-0 label_box">
                            <label htmlFor="id">아이디</label>
                        </div>
                        <div className="col-12 col-md-0 input_box">
                            <input type="text" id="id" ref={idInput} className="input_style_0" />
                        </div>
                    </div>
                    <div className="col-12 form_style_0">
                        <div className="col-12 col-md-0 label_box">
                            <label htmlFor="password">비밀번호</label>
                        </div>
                        <div className="col-12 col-md-0 input_box">
                            <input type="password" id="password" ref={passwordInput} className="input_style_0"/>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="col-12 btn_style_0 bg_point0">로그인</button>
                </div>
            </form>
        </div>
    )
}

export default AppLogin;