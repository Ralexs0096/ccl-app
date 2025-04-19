import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
