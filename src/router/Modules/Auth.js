import importer from "../../plugins/importer.js";

export default [
    {
        path: '/',
        redirect: '/login',
        component: importer('auth/index.vue'),
        children: [
            {
                path: '/login',
                name: 'auth.login',
                component: importer('auth/login.vue')
            },
            {
                path: '/register',
                name: 'auth.register',
                component: importer('auth/register.vue')
            }
        ]
    }
]
