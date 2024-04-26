import {defineStore} from "pinia";
import axios from "axios";
import {API_PATH} from "../plugins/consts.js";
import Cookies from 'js-cookie'


export const useAuthStore = defineStore('authStore', {
    state: () => ({
        access_token: Cookies.get('access_token'),
        user: null,
        returnUrl: null
    }),
    actions: {
        async login({email, password}) {
            const {data} = await axios.post(`${API_PATH}/auth/login`, {
                email, password
            })
            this.access_token = data.access_token
            Cookies.set('token', data.access_token, {expires: data.expiers_in})

            await this.getCurrentUser()
        },
        async getCurrentUser() {
            const {data} = await axios.get(`${API_PATH}/auth/current-user`)
            this.user = data
        }
    }
})
