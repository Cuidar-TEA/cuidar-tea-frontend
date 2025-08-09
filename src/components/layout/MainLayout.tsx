import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;