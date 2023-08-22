// searchResult.ts
import { rest } from "msw";
import PostData from "../data/PostData.json";
import CommentData from "../data/CommentData.json";

const handlers = [
    rest.get("/api/post", async (req, res, ctx) => {
        await sleep(200);
        
        const initCommentData = CommentData.reverse();

        //매니저가 아닌 경우 자신의 사진만 조회
        const userStatus = Number(req.url.searchParams.get("userIdx"));
        let initData = userStatus != 0 ? PostData.filter(function(data) {return data.userIdx == userStatus}) : PostData;

        //카테고리에 따라 조회
        const categoryStatus = Number(req.url.searchParams.get("category"));
        initData = categoryStatus != 0 ? initData.filter(function(data) {return data.category == categoryStatus}) : initData;

        initData.map((item) => {
            initCommentData.map((comment) => {if(item.postIdx == comment.postIdx){
                item.commentList.push(comment);
                if(item.commentTime == "") item.commentTime = comment.createTime;
            }})
        })

        const uploadStatus = JSON.parse(req.url.searchParams.get("upload") as string);
        if(uploadStatus) initData = initData.sort((a, b) => {return new Date(a.createTime).getTime() - new Date(b.createTime).getTime();}).reverse();

        const commentStatus =JSON.parse(req.url.searchParams.get("comment") as string);
        if(commentStatus) initData = initData.sort((a, b) => {return new Date(a.commentTime).getTime() - new Date(b.commentTime).getTime();}).reverse();
        else initData = initData.sort((a, b) => {return new Date(a.commentTime).getTime() - new Date(b.commentTime).getTime();});

        const page = Number(req.url.searchParams.get("page"));
        const size = Number(req.url.searchParams.get("size"));
        const len = (page + 1) * size <= initData.length ? (page + 1) * size : initData.length;

        const dataList = [];
        for(let i= page * size; i < len; i++) dataList.push(initData[i]);

        const result = {
            dataList : dataList,
            hasMore : len < initData.length
        };
        return res(ctx.status(200), ctx.json(result));
    }),
    rest.post("/api/post", async (req, res, ctx) => {
        await sleep(200);
        const result = true;
        return res(ctx.status(200), ctx.json(result));
    }),
    rest.put("/api/post", async (req, res, ctx) => {
        await sleep(200);
        const totalCnt = PostData.length;
        const result = {
            dataList : PostData,
            totalCnt : totalCnt
        };

        return res(ctx.status(200), ctx.json(result));
    }),
    rest.delete("/api/post", async (req, res, ctx) => {
        await sleep(200);
        const result = PostData;
        return res(ctx.status(200), ctx.json(result));
    }),
];

async function sleep(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export default handlers;