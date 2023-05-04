import { getLS } from "../localStorage";
import { get } from "./request";

export async function isUserAuthenticated() {
    if (!getLS('jwt_token')) return Promise.resolve(false);
    let res = await get('/auth/verify');
    if(res.status === 200 && res.data) return Promise.resolve(true);
}