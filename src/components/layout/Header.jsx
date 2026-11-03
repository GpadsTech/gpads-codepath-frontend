import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import {PixelAvatar} from '../avatar/PixelAvatar';
export function Header() { const {user}=useAuth(); const {pathname}=useLocation(); const labels={dashboard:'Início', reports:'Relatórios', ranking:'Ranking', avatar:'Meu avatar', users:'Cadastrar usuários', profile:'Meu perfil'};
return <header className="cp-header"><span className="cp-breadcrumb">CODEPATH <span>/</span> {labels[pathname.split('/')[1]] || 'Sua jornada'}</span><Link to="/profile" className="cp-account"><span>{user?.name || 'Meu perfil'}</span><PixelAvatar avatarId={user?.avatarId} size={32}/></Link></header>; }
export default Header;
