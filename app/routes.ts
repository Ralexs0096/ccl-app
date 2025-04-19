import {
  type RouteConfig,
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
  ])
] satisfies RouteConfig;
