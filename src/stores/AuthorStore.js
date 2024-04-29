import {defineStore} from "pinia";
import axios from "axios";
import {API_PATH} from "../plugins/consts.js";
import Cookies from 'js-cookie'
import intersection from "lodash/intersection.js";
import router from "../router/index.js";
import {useAuthStore} from "./AuthStore.js";


export const useAuthorsStore = defineStore('authorStore', {
    state: () => ({
        authors: Cookies.get('authors') ? JSON.parse(Cookies.get('authors')) : []
    }),
    actions: {
        async getAuthors() {
            const {data} = await axios.get(`${API_PATH}/users/${useAuthStore().user.username}/authors`)
            this.authors = data.data
            Cookies.set('authors', JSON.stringify(data.data))
        }
    }
})

const canOr = (user, permissions) => {
    permissions = permissions.split('|')
    return intersection(user.permissions, permissions).length !== 0
}
