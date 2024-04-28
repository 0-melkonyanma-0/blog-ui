import {importer} from "../../plugins/importer.js";

export default [
    {
        path: '/',
        name: 'users.index',
        component: importer('app/users/index.vue')
    },
    {
        path: '/users/:username',
        name: 'users.show',
        component: importer('app/users/show.vue'),
        // beforeEnter(to, from, next) {
        //     if (Cookies.get('access_token')) {
        //         next()
        //     } else {
        //         next({name: 'auth.login'})
        //     }
        // },
    }
]
