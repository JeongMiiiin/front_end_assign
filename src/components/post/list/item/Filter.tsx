import { useRef, useState } from 'react';

const PostFilter = ({changeFilter} : {changeFilter : (categoryStatus: number, uploadStatus: boolean, commentStatus: boolean) => void}) => {
    const [category, setCategory] = useState("0");
    const [upload, setUpload] = useState("true");
    const [comment, setComment] = useState("true");
    const categorySelect = useRef<HTMLSelectElement>(null);
    const uploadSelect = useRef<HTMLSelectElement>(null);
    const commentSelect = useRef<HTMLSelectElement>(null);

    const changeEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setCategory(() => categorySelect.current!.value);
        const categoryStatus = Number(categorySelect.current?.value);
        setUpload(() => uploadSelect.current!.value);
        const uploadStatus = JSON.parse(uploadSelect.current!.value);
        setComment(() => commentSelect.current!.value);
        const commentStatus = JSON.parse(commentSelect.current!.value);

        changeFilter(categoryStatus, uploadStatus, commentStatus);
    }

    return (
        <div>
            <select ref={categorySelect} onChange={(e) => changeEvent(e)} value={category}>
                <option value="0">전체</option>
                <option value="1">스쿼트</option>
                <option value="2">런지</option>
                <option value="3">벤치프레스</option>
                <option value="4">런닝</option>
                <option value="5">기타</option>
            </select>
            <select ref={uploadSelect} onChange={(e) => changeEvent(e)} value={upload}>
                <option value="true">업로드 최신순</option>
                <option value="false">업로드 과거순</option>
            </select>
            <select ref={commentSelect} onChange={(e) => changeEvent(e)} value={comment}>
                <option value="true">댓글달림 최신순</option>
                <option value="false">댓글달림 과거순</option>
            </select>
        </div>
    )
}

export default PostFilter;