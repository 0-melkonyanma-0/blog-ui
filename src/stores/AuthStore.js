import {defineStore} from "pinia";


export const useAuthStore = defineStore('authStore', {
    state: () => ({
        'access_token': null,
    })
})
