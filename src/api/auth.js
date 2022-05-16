import request from "@/plugins/axios";

const RESOURCE = 'auth';
export async function getAuthUserApi () {
    return request.get(`${RESOURCE}/me`);
}

export async function loginApi (email, password) {
    return request.post(`${RESOURCE}/login`, {
        email,
        password
    });
}
export async function logoutApi () {
    return request.post(`${RESOURCE}/logout`);
}
