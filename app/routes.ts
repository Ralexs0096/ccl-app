import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route
} from '@react-router/dev/routes';

export default [
  ...prefix('/auth', [
    layout('layouts/auth-layout.tsx', [
      route('login', 'routes/login-page.tsx'),
      route('forgot-password', 'routes/forgot-password.tsx')
    ])
  ]),
  ...prefix('/', [index('home-page.tsx')])
] satisfies RouteConfig;
