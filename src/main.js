import {createApp} from 'vue'
import App from './components/App.vue'
import vuetify from './plugins/vuetify.js'
import router from "./router/index.js";
import i18n from "./plugins/i18n.js";
import './plugins/index.js'
import {createPinia} from "pinia";
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options = {
    position: 'bottom-right',
    maxToasts: 10,
    timeout: 4000
};

const app = createApp(App);
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(createPinia())
app.use(Toast, options)
app.mount('#app')
