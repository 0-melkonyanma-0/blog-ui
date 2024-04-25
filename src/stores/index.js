import { mapStores } from 'pinia'
import {useAuthStore} from "./AuthStore.js";

export default {
    computed: {
        // note we are not passing an array, just one store after the other
        // each store will be accessible as its id + 'Store'
        ...mapStores(useAuthStore)
    },
}
