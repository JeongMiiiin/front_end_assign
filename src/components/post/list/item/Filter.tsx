import { useRef } from 'react';

const PostFilter = () => {
    const categorySelect = useRef<HTMLSelectElement>(null);
    const uploadSelect = useRef<HTMLSelectElement>(null);
    const commentSelect = useRef<HTMLSelectElement>(null);

    const changeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const param = {
            category : categorySelect.current?.value,
            upload : uploadSelect.current?.value,
            comment : commentSelect.current?.value,
        }

        console.dir(param);
    }

    return (
        <div>
            <select ref={categorySelect} onChange={(e) => changeFilter(e)}>
                <option value="" selected>전체</option>
                <option value="1">스쿼트</option>
                <option value="2">런지</option>
                <option value="3">벤치프레스</option>
                <option value="4">런닝</option>
                <option value="5">기타</option>
            </select>
            <select ref={uploadSelect} onChange={(e) => changeFilter(e)}>
                <option value="true">업로드 최신순</option>
                <option value="false">업로드 과거순</option>
            </select>
            <select ref={commentSelect} onChange={(e) => changeFilter(e)}>
                <option value="true">댓글달림 최신순</option>
                <option value="false">댓글달림 과거순</option>
            </select>
        </div>
    )
}

export default PostFilter;