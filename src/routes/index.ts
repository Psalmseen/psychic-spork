import { Route, Router } from '@vaadin/router';

const routes: Route[] = [
  {
    path: '/',
    component: 'app-index',
    action: async () => {
      await import('../index');
    },
    children: [
      {
        path: 'user/:id',
        component: 'user-detail',
        action: async () => {
          await import('../component/user-detail');
        },
      },
    ],
  },
  {
    path: '/add-user',
    component: 'add-user',
    action: async () => {
      await import('../component/add-user');
    },
  },
  {
    path: '/edit-user/:id',
    component: 'add-user',
    action: async () => {
      await import('../component/add-user');
    },
  },
  {
    path: '/add-desc/:id',
    component: 'add-desc',
    action: async () => {
      await import('../component/add-desc');
    },
  },
];

const outlet = document.querySelector('#outlet');
export const router = new Router(outlet);
router.setRoutes(routes);
export const location = router.location;
