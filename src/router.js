import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home/main'
    },
    {
        path: "/home",
        component: () => import('./components/home.vue'),
        children: [{
            path: 'main',
            component: () => import('./components/main/main.vue')           
        },{
            path: 'json',
            component: () => import('./components/json/json.vue')
        },{
            path: 'group',
            component:() => import('./components/group.vue')
        },{
            path: 'more',
            component: () => import('./components/more.vue')
        }]
    }
]

const router = new VueRouter({
    routes
})

export default router;