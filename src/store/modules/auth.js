import {getAuthUserApi, logoutApi} from "@/api/auth";

export default {
    namespaced: true,
    actions: {
        async getAuthUser({commit}){
            await getAuthUserApi()
                .then((response) => {
                    commit('SET_AUTH_USER', response.data);
                })
        },
        async logout({commit}){
            await logoutApi()
                .then(() => {
                    commit('LOGOUT');
                })
        }
    },

    mutations: {
        SET_AUTH_USER(state, user){
            state.user = user;
        },
        LOGOUT(state){
            state.user = null;
        }
    },

    state: {
        user: null,
    },
    getters: {
        userIsAuthenticated(state){
            return !!state.user;
        }
    },
}