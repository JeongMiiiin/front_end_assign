import postType from '@/type/PostType';
import { getPostList } from '@/api/Post';
import { useState, useEffect, useRef, useCallback } from 'react';
import PostFilter from './item/Filter';
import PostListItem from './item/ListItem';
import componentStyle from '@/resources/css/module/PostList.module.css';

const PostList = () => {
    const [TotalCnt, setTotalCnt] = useState(0);

    const ListRef = useRef<HTMLUListElement>(null);
    const [ListContents, setListContents] = useState<postType[]>([]);

    const param = {
        page : 0,
        size : 3,
    }

    const getList = async () => {
        await getPostList(param, ({data}) => {
            setListContents(data.dataList);
            setTotalCnt(() => data.totalCnt);
            console.log(TotalCnt);
        }, (error) => console.log(error));
    };

    const updateList = async () => {   
        await getPostList(param, ({data}) => {
            console.log(data.dataList);
            const dataList = [...ListContents];
            data.dataList.map((item) => dataList.push(item));
            setListContents(dataList);
            console.log(ListContents);
        }, (error) => console.log(error));
    }

    const infiniteScroll = useCallback(() => {
        const { scrollTop, clientHeight, scrollHeight } = ListRef.current!;
        const lastContentHeight = ListRef.current!.lastElementChild!.clientHeight;
        if(scrollHeight - clientHeight - lastContentHeight <= scrollTop){ //스크롤 마지막 전에 도달할 때
            console.log(TotalCnt);
            if(TotalCnt > param.page * param.size){
                param.page += 1;
                updateList();
            }
        }
    }, []);

    useEffect(() => {
        void getList();
        //스크롤 이벤트 등록
        ListRef.current?.addEventListener('scroll', infiniteScroll, true);
    }, []);

    return (
        <div>
            사진리스트
            <PostFilter />
            <ul className={`col-12 col-center mw-500 ${componentStyle.post_list_wrap}`} ref={ListRef}>
                {ListContents.length > 0 ? ListContents.map((item, index) => <PostListItem key={index} item={item} /> ) : <li>데이터가 없습니다</li>}
            </ul>
        </div>
    )
}

export default PostList;