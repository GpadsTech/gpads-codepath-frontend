import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './SideBar';
import { Header } from './Header';

export function DefaultLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh', background: '#12121a' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <Header />
        <main style={{ padding: '30px', color: '#fff' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;