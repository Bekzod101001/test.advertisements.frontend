import request from "@/plugins/axios";

const RESOURCE = 'adverts';
export async function getAdvertsApi (params) {
    return request.get(`${RESOURCE}`, {
        params: params
    });
}
export async function getAdvertApi (id) {
    return request.get(`${RESOURCE}/${id}`);
}
export async function createAdvertApi (newAdvertFormData) {
    return request.post(RESOURCE, newAdvertFormData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export async function updateAdvertApi (id, advert) {
    return request.put(`${RESOURCE}/${id}`, advert);
}
export async function deleteAdvertApi (id) {
    return request.delete(`${RESOURCE}/${id}`);
}

