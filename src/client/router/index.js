import Vue from 'vue';
import Router from 'vue-router';
import Home from '@client/views/home';

Vue.use(Router);

export function createRouter() {
  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [
      {
        path: '/',
        component: Home,
        children: [
          {
            name: 'home',
            path: '/',
            component: () => import('@client/views/posts')
          },
          {
            name: 'post',
            path: '/post/:id',
            component: () => import('@client/views/post')
          },
          {
            name: 'archive',
            path: '/archive',
            component: () => import('@client/views/archive')
          },
          {
            name: 'tags',
            path: '/tags',
            component: () => import('@client/views/tags')
          },
          {
            name: 'tag',
            path: '/tag/:tag',
            component: () => import('@client/views/tag')
          },
          {
            name: 'github',
            path: '/github',
            redirect: () => {
              // window.location.href = 'https://github.com/eteplus';
              window.open('https://github.com/eteplus');
            }
          }
        ]
      },
      {
        name: '404',
        path: '/404',
        component: () => import('@client/views/404')
      },
      {
        path: '*',
        redirect: '/404'
      }
    ]
  });
  return router;
}
