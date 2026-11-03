import React from 'react';
import {Outlet} from 'react-router-dom';
import {Sidebar} from './SideBar';
import {Header} from './Header';
export function DefaultLayout() { return <div className="cp-world"><div className="cp-shell"><Sidebar/><div className="cp-workspace"><Header/><main className="cp-main"><Outlet/></main></div></div><div className="cp-world-caption" aria-hidden="true">GPADS CODEPATH · CONSTRUA SUA PRÓXIMA CONQUISTA</div></div>; }
export default DefaultLayout;
