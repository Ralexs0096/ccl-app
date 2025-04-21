import { Outlet } from 'react-router';
import Sidebar from '~/components/Sidebar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
