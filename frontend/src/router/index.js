import {createRouter, createWebHistory} from 'vue-router'
import _Clean from '../views/_Clean.vue'

const routes = [
    {
        path: '/',
        name: 'Главная',
        component: _Clean
    },
    /*{
        path: '/about',
        name: 'about',
        component: () => import(/!* webpackChunkName: "about" *!/ '../views/AboutView.vue')
    }*/
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
