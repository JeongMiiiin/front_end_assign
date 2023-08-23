import InfiniteScroll from 'react-infinite-scroll-component';
import postType from '@/type/PostType';
import { getPostList } from '@/api/Post';
import { useState, useEffect } from 'react';
import PostFilter from './item/Filter';
import PostListItem from './item/ListItem';
import ComponentStyle from '@/resources/css/module/PostList.module.css';
import { GetIsAdmin, GetUserIdx } from '@/atom/UserAtom';
import PostInsert from '../insert/Insert';
import { ContentsPopup } from '@/utils/Popup';

const PostList = () => {
    const userIdx = GetUserIdx();
    const isAdmin = GetIsAdmin();
    const [listContents, setListContents] = useState<postType[]>([]);
    const [params, setParams] = useState({userIdx : userIdx, page : 0, size : 3, category : 0, upload : true, comment : true});
    const [filterStatus, setFilterStatus] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [insertPossible, setInsertPossible] = useState(true);
    const getList = async () => {
        await getPostList(params, ({data}) => {
            setListContents([...data.dataList]);
            setHasMore(data.hasMore);
            setParams((params) => ({...params, page : params.page + 1}));
            if(!isAdmin && data.insertMax && insertPossible) setInsertPossible(() => false);
        }, (error) => console.log(error));
    };

    //스크롤 시 컨텐츠 추가해주는 함수
    const moreList = async () => {
        await getPostList(params, ({data}) => {
            setListContents(listContents => [...listContents, ...data.dataList]);
            setHasMore(data.hasMore);
            setParams((params) => ({...params, page : params.page + 1}));
        }, (error) => console.log(error));
    };

    //필터 변경 함수
    const changeFilter = (categoryStatus: number, uploadStatus: boolean, commentStatus: boolean) => {
        setParams(() => ({userIdx : userIdx, page : 0, size : 3, category : categoryStatus, upload : uploadStatus, comment : commentStatus}));
        setFilterStatus(filterStatus => !filterStatus);
    }

    //필터에 따른 검색
    useEffect(() => {
        void getList();
    }, [filterStatus]);

    //등록 팝업을 위한 값
    const [insertPopupStatus, setInsertPopupStatus] = useState(false);
    const changeInsertPopupFlag = (flag: boolean) => {
        setInsertPopupStatus(() => flag);
    };
    const insertPopupInfo = {
        PopupStatus : insertPopupStatus,
        zIndex : 9999,
        maxWidth : 500,
        ClosePopupProp : () => setInsertPopupStatus(() => false),
        PopupTitle : "운동기록 업로드",
        PopupContents : <PostInsert closePopup={changeInsertPopupFlag} />,
    }

    return (
        <div className="col-12">
            <PostFilter changeFilter={changeFilter} />
            <div className="col-12">
                <InfiniteScroll dataLength={listContents.length} next={moreList} hasMore={hasMore} loader={<p></p>} scrollableTarget="postList">
                    <ul id="postList" className={`${ComponentStyle.post_list_wrap}`}>
                        {listContents.length > 0 ? listContents.map((item, index) => <PostListItem key={index} item={item} /> ) : <li>데이터가 없습니다</li>}
                    </ul>
                </InfiniteScroll>
            </div>
            {insertPossible ?
                <div className="col-12 mt20 mt-md-30">
                    <button type="button" onClick={() => setInsertPopupStatus(() => true)} className='btn_style_0 fr'>추가하기</button>
                </div>
            : null}
            <ContentsPopup PopupInfo={insertPopupInfo}/>
        </div>
    )
}

export default PostList;