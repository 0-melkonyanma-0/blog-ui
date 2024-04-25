import {createApp} from 'vue'
import App from './components/App.vue'
import vuetify from './plugins/vuetify.js'
import router from "./router/index.js";
import i18n from "./plugins/i18n.js";
import {createPinia} from "pinia";

const app = createApp(App);
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(createPinia())
app.mount('#app')
