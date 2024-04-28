import {importer} from "../../plugins/importer.js";
import Cookies from "js-cookie";

export default [
    {
        path: '/',
        name: 'posts.index',
        component: importer('app/posts/index.vue')
    },
    {
        path: '/posts/create',
        name: 'posts.create',
        component: importer('app/posts/create.vue')
    },
    {
        path: '/posts/:id',
        name: 'posts.show',
        component: importer('app/posts/show.vue'),
        beforeEnter(to, from, next) {
            if (Cookies.get('access_token')) {
                next()
            } else {
                next({name: 'auth.login'})
            }
        },
    }
]
