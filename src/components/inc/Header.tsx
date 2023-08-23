import { userAtom } from "@/atom/UserAtom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
import ComponentStyle from '@/resources/css/module/Header.module.css';

const Header = () => {
    const navigate = useNavigate();
    const resetUser = useResetRecoilState(userAtom);
    const userName = useRecoilValue(userAtom).userName;

    const logout = () => {
        alert("로그아웃");
        resetUser();
        navigate("/login");
    }


    return (
        <header className={`col-12 mb20 mb-md-30 ${ComponentStyle.header_wrap}`}>
            {userName}님 안녕하세요
            <button type="button" onClick={logout} className="btn_style_0">로그아웃</button>
        </header>
    )
}

export default Header;