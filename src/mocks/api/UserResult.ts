// searchResult.ts
import { rest } from "msw";
import UserData from "../data/UserData.json";

const handlers = [
    rest.post("/api/user", async (req, res, ctx) => {
        await sleep(200);
        let result = {};
        const { id, password } = await req.json();
        UserData.map((item) => {if(item.userId == id && item.password == password) result = item;});
        return res(ctx.status(200), ctx.json(result));
    }),
];

async function sleep(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export default handlers;