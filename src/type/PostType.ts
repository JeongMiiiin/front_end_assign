import commentType from "./CommentType"

type postType = {
    postIdx : number,
    category : number,
    imagePath : string,
    imageName : string,
    description : string,
    userIdx : number,
    userName : string,
    createTime : string,
    commentList : commentType[],
}

export type postListType = {
    dataList : postType[],
    hasMore : boolean,
    insertMax : boolean,
}

export type postViewType = {
    prevDate : string,
    dataList : postType[],
    nextDate : string,
}

export default postType;