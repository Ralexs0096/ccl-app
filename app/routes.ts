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
      route('login', 'routes/auth/login-page.tsx'),
      route('forgot-password', 'routes/auth/forgot-password.tsx'),

      // Actions
      route('logout', 'actions/logout.action.ts')
    ])
  ]),
  layout('layouts/main-layout.tsx', [index('routes/home-page.tsx')])
] satisfies RouteConfig;
