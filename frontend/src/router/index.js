import {createRouter, createWebHistory} from 'vue-router'

import _Clean from '../views/_Clean.vue';
import ChatsView from "@/views/ChatsView";
import store from "@/store";

const routes = [
    {
        path: '/',
        name: 'Главная',
        component: ChatsView
    },
    {
        path: '/clean',
        name: 'clean page',
        component: () => import( '../views/_Clean')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {

    document.title = to.name + " | SecureEx";//Изменить тайтл страницы
    store.commit("showLoader");//Показать анимацию загрузки
    store.commit("actionMenuStatus", false);//Закрыть экшн меню

    next();
});

router.afterEach((to, from) => {
    store.commit("hideLoader");//Убрать анимацию загрузки
});

export default router
