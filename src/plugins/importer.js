import {useAuthStore} from "../stores/AuthStore.js";

export function importer(component) {
    return import(`../views/${component}`)
}
