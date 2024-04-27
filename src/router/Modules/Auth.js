import {importer} from "../../plugins/importer.js";
import Cookies from "js-cookie";
import router from "../index.js";

export default [
    {
        path: '/auth',
        component: importer('auth/index.vue'),
        beforeEnter(to, from, next) {
            if (Cookies.get('access_token')) {
                next({name: 'posts.index'})
            } else {
                next()
            }
        },
        children: [
            {
                path: '/login',
                name: 'auth.login',
                component: importer('auth/login.vue'),
            },
            {
                path: '/register',
                name: 'auth.register',
                component: importer('auth/register.vue')
            }
        ],
    }
]
