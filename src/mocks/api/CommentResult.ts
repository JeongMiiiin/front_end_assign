// searchResult.ts
import { rest } from "msw";
import PostData from "../data/PostData.json";

const handlers = [
    rest.get("/api/post", async (req, res, ctx) => {
        await sleep(200);
        
        //카테고리에 따라 조회
        const categoryStatus = Number(req.url.searchParams.get("category"));
        let initData = categoryStatus != 0 ? PostData.filter(function(data) {return data.category == categoryStatus}) : PostData;

        const uploadStatus = Boolean(req.url.searchParams.get("uploadStatus"));
        if(uploadStatus){
            initData = initData.sort((a,b) => {
                return (new Date(b.createTime)).getTime() - (new Date(a.createTime)).getTime();
            });
        }

        const commentStatus = Boolean(req.url.searchParams.get("commentStatus"));

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
        const result = PostData;
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