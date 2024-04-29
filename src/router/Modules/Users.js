import {importer} from "../../plugins/importer.js";
import Cookies from "js-cookie";

export default [
    {
        path: '/users/:username',
        name: 'users.show',
        component: importer('app/users/show.vue'),
    },
    {
        path: '/users/:username/settings',
        name: 'users.settings',
        component: importer('app/users/settings.vue'),
        beforeEnter(to, from, next) {
            if (Cookies.get('access_token') &&
                to.params.username === JSON.parse(Cookies.get('current_user')).username)
            {
                next()
            } else {
                next({name: 'posts.index'})
            }
        },
    },
]
