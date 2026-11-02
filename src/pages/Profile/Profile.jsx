import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import {PixelAvatar} from '../../components/avatar/PixelAvatar';
export function Profile(){const {user,logout}=useAuth();return <div className="cp-page"><p className="cp-eyebrow">SUA IDENTIDADE CODEPATH</p><h2>Meu perfil</h2><section className="cp-panel"><div className="cp-welcome"><div><h3>{user?.name}</h3><p className="cp-muted">{user?.email}</p><span className="cp-badge">{user?.role==='leader'?'LÍDER DE CÉLULA':['admin','evaluator'].includes(user?.role)?'AVALIADOR':'ESTUDANTE / MEMBRO'}</span></div><PixelAvatar avatarId={user?.avatarId} size={140}/></div><div className="cp-feedback"><strong>Célula</strong><p>{user?.cellId || user?.ledCellIds?.join(', ') || 'Não vinculada'}</p></div><p className="cp-muted">Nível {user?.level || 1} · {user?.points || 0} pontos</p><Link className="cp-link" to="/avatar">Escolher meu avatar →</Link><div className="cp-actions" style={{marginTop:24}}><button onClick={logout}>Sair da conta</button></div></section></div>}
export default Profile;
