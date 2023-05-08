import {createRouter, createWebHistory} from 'vue-router'

import _Clean from '../views/_Clean.vue';
import ChatsView from "@/views/ChatsView";
import store from "@/store";

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthorized) {
        next()
        return
    }
    next('/')
}
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthorized) {
        next()
        return
    }
    next('/login')
}

const routes = [
    {
        path: '/',
        name: 'Главная',
        beforeEnter: ifAuthenticated,
        component: ChatsView
    },
    {
        path: '/clean',
        name: 'clean page',
        beforeEnter: ifAuthenticated,
        component: () => import( '../views/_Clean')
    },
    {
        path: "/chat/:id",
        name: 'chat',
        beforeEnter: ifAuthenticated,
        component: () => import( '../views/ChatView')
    },
    {
        path: "/login",
        name: '',
        beforeEnter: ifNotAuthenticated,
        component: () => import( '../views/AuthView')
    },
    {
        path: "/user",
        name: '',
        beforeEnter: ifAuthenticated,
        component: () => import( '../views/UserProfile')
    },
    {
        path: "/user/:id",
        name: 'user.profile',
        beforeEnter: ifAuthenticated,
        component: () => import( '../views/UserProfile')
    },
    {
        path: "/search",
        name: '',
        beforeEnter: ifAuthenticated,
        component: () => import( '../views/SearchView')
    },
    {
        path: "/settings",
        name: 'Настройки',
        beforeEnter: ifAuthenticated,
        component: () => import( '../views/SettingsView')
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {

    store.commit("showLoader");//Показать анимацию загрузки
    store.commit("actionMenuStatus", false);//Закрыть экшн меню

    next();
});

router.afterEach((to, from) => {
    store.commit("hideLoader");//Убрать анимацию загрузки
});

export default router
