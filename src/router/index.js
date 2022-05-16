import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Profile from "@/views/Profile";
import AdvertSingle from "@/views/Adverts/AdvertSingle";
import AdvertEdit from "@/views/Adverts/AdvertEdit";
import AdvertCreate from "@/views/Adverts/AdvertCreate";
import AdvertIndex from "@/views/Adverts/AdvertIndex";

Vue.use(VueRouter)

const routes = [

    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/adverts',
        name: 'Advert Index',
        component: AdvertIndex
    },
    {
        path: '/adverts/create',
        name: 'Advert Create',
        component: AdvertCreate,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/adverts/:advertID',
        name: 'Advert Single',
        component: AdvertSingle
    },
    {
        path: '/adverts/:advertID/edit',
        name: 'Advert Edit',
        component: AdvertEdit,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '*',
        redirect: '/profile'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    /* FIXME:
        this is very unstable way for checking if user is authenticated,
        best way is to way when actual request for getting auth user.
        How to make it better: wait for getAuthUser() vuex action for finish,
        and then check by result
     */
    const userIsAuthenticated = !!localStorage.getItem('authToken');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!userIsAuthenticated) {
            next({
                name: 'Login'
            })
        }
    }

    next();

});

export default router
