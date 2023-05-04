import { getLS } from "../localStorage";
import { get, logout } from "./request";

export async function isUserAuthenticated() {
    if (!getLS('jwt_token')) return Promise.resolve(false);
    let res = await get('/auth/verify');
    if (res.status === 200 && res.data?.data?.status) return Promise.resolve({
        rollNumber: res.data.data.rollNumber,
        isAdmin: res.data.data.isAdmin
    });
    logout();
    return Promise.resolve(false);
}

