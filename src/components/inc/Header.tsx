import { userAtom } from "@/atom/UserAtom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';

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
        <div>
            {userName}님 안녕하세요
            <button type="button" onClick={logout}>로그아웃</button>
        </div>
    )
}

export default Header;