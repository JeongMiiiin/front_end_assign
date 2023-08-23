import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useEffect, useState } from "react";
import { deletePostData, getPostView } from "@/api/Post";
import postType from "@/type/PostType";
import { GetIsAdmin, GetUserIdx } from "@/atom/UserAtom";
import ComponentStyle from "@/resources/css/module/PostView.module.css";
import { insertCommentData } from "@/api/Comment";
import { ContentsPopup } from "@/utils/Popup";
import PostUpdate from "../update/Update";

interface PostViewProps {
    closePopup : (flag: boolean) => void,
    targetDate : string,
    postIdx : number,
}

const PostView = (props : PostViewProps) => {
    const userIdx = GetUserIdx();
    const isAdmin = GetIsAdmin();
    const sliderRef = useRef<Slider>(null);
    const [targetDate, setTargetDate] = useState(props.targetDate);
    const [prevDate, setPrevDate] = useState("");
    const [nextDate, setNextDate] = useState("");
    const [listContents, setListContents] = useState<postType[]>([]);

    const getView = async () => {
        const param = {
            userIdx : userIdx,
            targetDate : targetDate
        }
        await getPostView(param, ({data}) => {
            setListContents([...data.dataList]);
            setPrevDate(data.prevDate);
            setNextDate(data.nextDate);
        }, (error) => console.log(error));
    }

    useEffect(() => {
        void getView();
    }, [targetDate]);

    useEffect(() => {
        let currentIdx = 0;
        for(let i=0; i < listContents.length; i++){
            if(listContents[i].postIdx == props.postIdx){
                currentIdx = i;
                break;
            }
        }
        sliderRef.current?.slickGoTo(currentIdx);
    }, [listContents]);

    const imgSettings = {
        arrows: true,
        dots: true,
        infinite : true,
        speed : 500
    }

    const goPrev = () => {
        setTargetDate(prevDate);
    }

    const goNext = () => {
        setTargetDate(nextDate);
    }

    const insertComment = (e : React.KeyboardEvent<HTMLInputElement>, postIdx : number) => {
        const {value} = e.target as HTMLInputElement;
        if(e.key == 'Enter' && value != ""){
            const param = {
                userIdx : userIdx,
                postIdx : postIdx,
                description: value,
            }
            void insertCommentData(param, ({data}) => console.log(data), (error) => console.log(error));
        }
    }

    const [updateContent, setUpdateContent] = useState<postType>({});
    const [updatePopupFlag, setUpdatePopupFlag] = useState(false);
    const changeUpdatePopupFlag = (flag: boolean) => {
        setUpdatePopupFlag(() => flag);
    };

    const updatePost = (item: postType) => {
        setUpdateContent(() => item);
        changeUpdatePopupFlag(true);
    }

    const updatePopupInfo = {
        PopupStatus : updatePopupFlag,
        zIndex : 10000,
        maxWidth : 500,
        ClosePopupProp : () => setUpdatePopupFlag(() => false),
        PopupTitle : "운동기록 변경",
        PopupContents : <PostUpdate closePopup={changeUpdatePopupFlag} item={updateContent} />,
    }

    const deletePost = (postIdx: number) => {
        void deletePostData(postIdx, ({data}) => console.log(data), (error) => console.log(error));
        props.closePopup(false);
    }

    return (
        <div className="col-12">
            <div className={`col-12 mb10 mb-md-20 ${ComponentStyle.post_view_header_con}`}>
                {targetDate}
                <div className={`col-0 ${ComponentStyle.post_view_arrow_btn_con}`}>
                    {prevDate != "" ? <button type="button" onClick={goPrev}>과거</button> : null}
                    {nextDate != "" ? <button type="button" onClick={goNext} className={ComponentStyle.next}>미래</button> : null}
                </div>
            </div>
            <Slider ref={sliderRef} { ...imgSettings } className="col-12">
                {listContents.map((item, index) => (
                    <div className="col-12" key={index}>
                        <img src={item.imagePath} alt={item.imageName} className="mb5"/>
                        <ul className={`col-12 ${ComponentStyle.comment_list_wrap}`}>
                            {item.commentList.length < 5 ?
                                <div className="col-12 mb10">
                                    <div className={`col-12 mb5 ${ComponentStyle.comment_input_text}`}>댓글을 입력해주세요</div>
                                    <input type="text" className="input_style_0" onKeyDown={(e) => insertComment(e, item.postIdx)}/>
                                </div> : null}
                            {item.commentList.map((comment, index) => <li key={index}>{comment.commentIdx} {comment.description}</li>)}
                        </ul>
                        <div className="col-12">
                            <button type="button" className="col-6 btn_style_0 bg_point0" onClick={() => updatePost(item)}>변경</button>
                            {isAdmin ? <button type="button" className="col-6 btn_style_0" onClick={() => deletePost(item.postIdx)}>삭제</button> : null}
                        </div>
                    </div>
                ))}
            </Slider>
            <ContentsPopup PopupInfo={updatePopupInfo} />
        </div>
    )
}

export default PostView;