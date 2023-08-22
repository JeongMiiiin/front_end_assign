import commentType from "./CommentType"

type postType = {
    postIdx : number,
    category : number,
    imagePath : string,
    imageName : string,
    description : string,
    userIdx : number,
    userName : string,
    createTime : Date,
    commentList : commentType[],
}

export type postListType = {
    dataList : postType[],
    hasMore : boolean,
}

export default postType;