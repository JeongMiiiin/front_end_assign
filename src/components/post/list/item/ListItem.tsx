import { useState } from "react";
import postType from "@/type/PostType";
import PostView from '../../view/View';
import { ContentsPopup } from '@/utils/Popup';


const PostListItem = ({item} : {item: postType}) => {    

    const [viewPopupStatus, setViewPopupStatus] = useState(false);
    const changeViewPopupFlag = (flag: boolean) => {
        setViewPopupStatus(() => flag);
    };

    const viewPopupInfo = {
        PopupStatus : viewPopupStatus,
        zIndex : 9999,
        maxWidth : 500,
        ClosePopupProp : () => setViewPopupStatus(() => false),
        PopupTitle : "운동기록 보기",
        PopupContents : <PostView closePopup={changeViewPopupFlag} postIdx={item.postIdx} targetDate={item.createTime.split(" ")[0]} />,
    }


    return (
        <li>
            <img src={item.imagePath} alt={item.imageName}  onClick={() => changeViewPopupFlag(true)} />
            <ContentsPopup PopupInfo={viewPopupInfo}/>
        </li>
    )
}

export default PostListItem;