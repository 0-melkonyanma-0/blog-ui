import axios from 'axios'
import Cookies from "js-cookie";

axios.interceptors.request.use(request => {
    const token = Cookies.get('access_token')
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
    }

    return request
})
