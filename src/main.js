import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import dateFilter from "@/filters/date_filter";
import uppercaseFirstLetter from "@/filters/uppercaseFirstLetter_filter";
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'

const app = createApp(App);
const pinia = createPinia()

loadFonts()

app.config.globalProperties.$filters = {
    dateFilter, uppercaseFirstLetter
}

app
    .use(router)
    .use(pinia)
    .use(vuetify)
    .mount('#app')
