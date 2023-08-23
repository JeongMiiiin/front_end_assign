// searchResult.ts
import { rest } from "msw";
import PostData from "../data/PostData.json";
import CommentData from "../data/CommentData.json";

const handlers = [
    rest.get("/api/post/list", async (req, res, ctx) => {
        await sleep(200);
        
        const initCommentData = CommentData.reverse();

        //매니저가 아닌 경우 자신의 사진만 조회
        const userStatus = Number(req.url.searchParams.get("userIdx"));
        let initData = userStatus != 0 ? PostData.filter(function(data) {return data.userIdx == userStatus}) : [...PostData];

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

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() < 10 ? '0' + today.getMonth() : today.getMonth();
        const date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
        const todayText = year + "-" + month + "-" + date;
        let todayCnt = 0;
        for(let i=0; i < initData.length; i++) if(todayText == initData[i].createTime.split(" ")[0]) todayCnt++;

        const page = Number(req.url.searchParams.get("page"));
        const size = Number(req.url.searchParams.get("size"));
        const len = (page + 1) * size <= initData.length ? (page + 1) * size : initData.length;

        const dataList = [];
        for(let i= page * size; i < len; i++) dataList.push(initData[i]);

        const result = {
            dataList : dataList,
            hasMore : len < initData.length,
            insertMax : todayCnt >= 5
        };
        return res(ctx.status(200), ctx.json(result));
    }),

    rest.get("/api/post/view", async (req, res, ctx) => {
        await sleep(200);

        //매니저가 아닌 경우 자신의 사진만 조회
        const userStatus = Number(req.url.searchParams.get("userIdx"));
        let initData = userStatus != 0 ? PostData.filter(function(data) {return data.userIdx == userStatus}) : [...PostData];

        //해당날짜 세팅
        const targetDate = req.url.searchParams.get("targetDate") as string;
        let prevDate = "";
        for(let i=0; i < initData.length; i++){
            if(initData[i].createTime.split(" ")[0] != targetDate) prevDate = initData[i].createTime.split(" ")[0];
            else break;
        }
        let nextDate = "";
        for(let i=initData.length - 1; i >= 0; i--){
            if(initData[i].createTime.split(" ")[0] != targetDate) nextDate = initData[i].createTime.split(" ")[0];
            else break;
        }

        initData = initData.filter(function(data) {return data.createTime.split(" ")[0] == targetDate});

        const result = {
            prevDate : prevDate,
            dataList : initData,
            nextDate : nextDate,
        }
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