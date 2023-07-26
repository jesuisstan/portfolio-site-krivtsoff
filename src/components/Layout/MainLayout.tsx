import { Outlet } from 'react-router-dom';
import Menu from './Menu';

const MainLayout = () => {
  return (
    <div>
      <Menu />
      <div style={{ marginTop: '92px', marginBottom: '90px' }}>
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
