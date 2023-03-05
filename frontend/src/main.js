import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import loader from './plugins/loader';

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueSweetalert2)
app.use(loader)

app.mount('#app');
