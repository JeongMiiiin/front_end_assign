import { insertPostData } from '@/api/Post';
import { useState, useRef } from 'react';

interface PostInsertProps {
    closePopup : (flag: boolean) => void,
}

const PostInsert = (props: PostInsertProps) => {
    const [selectVal, setSelectVal] = useState("1");
    const imageInput = useRef<HTMLInputElement>(null);
    const descInput = useRef<HTMLTextAreaElement>(null);
    //폼 submit 이벤트
    const formSubmit  = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        if(imageInput.current?.files == null || imageInput.current?.files?.length == 0){
            alert("업로드할 이미지를 등록해주세요");
            return;
        }

        const param = new FormData();
        param.append("category", selectVal);
        param.append("uploadFile", imageInput.current?.files[0]);
        if(descInput.current!.value != "") param.append("description", descInput.current!.value);
        await insertPostData(param, ({data}) => {
            if(data) props.closePopup(false);
        }, (error) => console.log(error));
    }

    return (
        <form className="col-12" encType="multipart/form-data" onSubmit={(e) => void formSubmit(e)}>
            <div className="col-12 form_style_0">
                <div className="col-12 col-md-0 label_box">
                    <span>카테고리</span>
                </div>
                <div className="col-12 col-md-0 input_box">
                    <select className="select_style_0" onChange={(e) => setSelectVal(e.target.value)} value={selectVal}>
                        <option value="1">스쿼트</option>
                        <option value="2">런지</option>
                        <option value="3">벤치프레스</option>
                        <option value="4">런닝</option>
                        <option value="5">기타</option>
                    </select>
                </div>
            </div>
            <div className="col-12 form_style_0">
                <div className="col-12 col-md-0 label_box">
                    <label htmlFor="uploadFile">업로드 이미지</label>
                </div>
                <div className="col-12 col-md-0 input_box">
                    <input ref={imageInput} type="file" id="uploadFile" accept="image/*" />
                </div>
            </div>
            <div className="col-12 form_style_0">
                <div className="col-12 col-md-0 label_box">
                    <span>상태메세지</span>
                </div>
                <div className="col-12 col-md-0 input_box">
                    <textarea ref={descInput}></textarea>
                </div>
            </div>
            <div className="col-12">
                <button type="submit">등록</button>
                <button type="button" onClick={() => props.closePopup(false)}>닫기</button>
            </div>
        </form>
    )
}

export default PostInsert;