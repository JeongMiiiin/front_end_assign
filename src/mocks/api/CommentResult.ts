// searchResult.ts
import { rest } from "msw";
import PostData from "../data/PostData.json";

const handlers = [
    rest.post("/api/comment", async (req, res, ctx) => {
        await sleep(200);
        const result = true;
        return res(ctx.status(200), ctx.json(result));
    })
];

async function sleep(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export default handlers;