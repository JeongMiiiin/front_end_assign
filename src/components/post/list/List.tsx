import InfiniteScroll from 'react-infinite-scroll-component';
import postType from '@/type/PostType';
import { getPostList } from '@/api/Post';
import { useState, useEffect } from 'react';
import PostFilter from './item/Filter';
import PostListItem from './item/ListItem';
import componentStyle from '@/resources/css/module/PostList.module.css';
import { GetUserIdx } from '@/atom/UserAtom';
import PostInsert from '../insert/Insert';
import { ContentsPopup } from '@/utils/Popup';

const PostList = () => {
    const userIdx = GetUserIdx();
    const [listContents, setListContents] = useState<postType[]>([]);
    const [dateList, setDateList] = useState<string[]>([]);
    const [params, setParams] = useState({userIdx : userIdx, page : 0, size : 3, category : 0, upload : true, comment : true});
    const [filterStatus, setFilterStatus] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const getList = async () => {
        await getPostList(params, ({data}) => {
            setListContents([...data.dataList]);
            setHasMore(data.hasMore);
            setParams((params) => ({...params, page : params.page + 1}));
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

    useEffect(() => {
        void getList();
    }, [filterStatus]);

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
        <div>
            <PostFilter changeFilter={changeFilter} />
            <InfiniteScroll dataLength={listContents.length} next={moreList} hasMore={hasMore} loader={<p>Loading...</p>} scrollableTarget="postList">
                <ul id="postList" className={`col-12 col-center mw-500 ${componentStyle.post_list_wrap}`}>
                    {listContents.length > 0 ? listContents.map((item, index) => <PostListItem key={index} item={item} /> ) : <li>데이터가 없습니다</li>}
                </ul>
            </InfiniteScroll>
            <div>
                <button type="button" onClick={() => setInsertPopupStatus(() => true)}>추가하기</button>
            </div>
            <ContentsPopup PopupInfo={insertPopupInfo}/>
        </div>
    )
}

export default PostList;