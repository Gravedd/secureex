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
    },
    {
        path: "/chat",
        name: '',
        component: () => import( '../views/ChatView')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {

    store.commit("reset");//Сбросить настройки хедера
    store.commit("setHeaderName", to.name)
    store.commit("showLoader");//Показать анимацию загрузки
    store.commit("actionMenuStatus", false);//Закрыть экшн меню

    next();
});

router.afterEach((to, from) => {
    store.commit("hideLoader");//Убрать анимацию загрузки
});

export default router
