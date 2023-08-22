// searchResult.ts
import { rest } from "msw";
import PostData from "../data/PostData.json";

const handlers = [
    rest.get("/api/post", async (req, res, ctx) => {
        await sleep(200);

        const initData = PostData;

        const page = Number(req.url.searchParams.get("page"));
        const size = Number(req.url.searchParams.get("size"));
        const len = (page + 1) * size <= initData.length ? (page + 1) * size : initData.length;

        const dataList = [];
        for(let i= page * size; i < len; i++) dataList.push(initData[i]);


        const totalCnt = PostData.length;
        const result = {
            dataList : dataList,
            totalCnt : totalCnt
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