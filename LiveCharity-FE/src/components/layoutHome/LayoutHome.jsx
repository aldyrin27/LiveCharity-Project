import FooterCustom from '../FooterCustom';
import NavbarCustom from '../NavbarCustom';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
export default function LayoutHome() {
  return (

    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ToastContainer />
      <NavbarCustom />
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
      <FooterCustom />
    </div>
  );
}
