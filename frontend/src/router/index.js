import {createRouter, createWebHistory} from 'vue-router'
import Main from '../views/Main.vue'

const routes = [
    {
        path: '/',
        name: 'Главная',
        component: Main
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.name + " | SecureEx";
    next();
});

router.afterEach((to, from) => {

});

export default router
