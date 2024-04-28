import {defineStore} from "pinia";
import axios from "axios";
import {API_PATH} from "../plugins/consts.js";
import Cookies from 'js-cookie'
import intersection from "lodash/intersection.js";
import router from "../router/index.js";


export const usePostStore = defineStore('postStore', {
    state: () => ({
        authors: []
    }),
    actions: {
        
    }
})

const canOr = (user, permissions) => {
    permissions = permissions.split('|')
    return intersection(user.permissions, permissions).length !== 0
}
