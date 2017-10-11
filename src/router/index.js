import Vue from 'vue';
import Router from 'vue-router';
import dealers from '@/components/dealers';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'dealers',
            component: dealers
        }
    ]
});
