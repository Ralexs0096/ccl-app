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
      route('signup', 'routes/signup-page.tsx')
    ])
  ])
] satisfies RouteConfig;
