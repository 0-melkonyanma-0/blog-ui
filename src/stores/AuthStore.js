import {defineStore} from "pinia";
import axios from "axios";
import {API_PATH} from "../plugins/consts.js";
import Cookies from 'js-cookie'
import intersection from "lodash/intersection.js";
import router from "../router/index.js";


export const useAuthStore = defineStore('authStore', {
    state: () => ({
        access_token: Cookies.get('access_token'),
        user: Cookies.get('current_user') !== undefined ? JSON.parse(Cookies.get('current_user')) : null,
        returnUrl: null,
        loading: false,
    }),
    actions: {
        async register(credentials) {
            this.loading = true
            const {data} = await axios.post(`${API_PATH}/auth/register`, credentials).catch(() => {
                this.loading = false
            })

            this.access_token = data.access_token
            Cookies.set('access_token', data.access_token, {expires: data.expiers_in})

            await this.getCurrentUser()
            this.loading = false

            router.push({name: 'posts.index'})
        },
        async login({email, password}) {
            this.loading = true
            const {data} = await axios.post(`${API_PATH}/auth/login`, {
                email, password
            }).catch(() => {
                this.loading = false
            })

            this.access_token = data.access_token
            Cookies.set('access_token', data.access_token, {expires: data.expiers_in})

            await this.getCurrentUser()
            this.loading = false

            router.push({name: 'posts.index'})
        },
        async getCurrentUser() {
            const {data} = await axios.get(`${API_PATH}/auth/current-user`)
            Cookies.set('current_user', JSON.stringify(data))
            this.user = data
        },
        async logout() {
            await axios.post(`${API_PATH}/auth/logout`)
            Cookies.remove('access_token')
            Cookies.remove('current_user')
            this.user = null
            this.access_token = null
        },
        can_or(permissions) {
            return canOr(this.user, permissions)
        },
    }
})

const canOr = (user, permissions) => {
    permissions = permissions.split('|')
    return intersection(user.permissions, permissions).length !== 0
}
