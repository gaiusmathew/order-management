import { Router } from 'express';
import orderRoutes from './orderRoutes';
import userRoutes from './userRoutes';

interface IRouteGroup {
  path: string;
  router: Router;
}

const routes: IRouteGroup[] = [
  { path: '/orders', router: orderRoutes },
  { path: '/users', router: userRoutes },
];

export default routes;
