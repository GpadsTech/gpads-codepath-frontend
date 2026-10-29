import React, {useState} from 'react';
import {useAuth} from '../../hooks/useAuth';
import {PixelAvatar} from '../../components/avatar/PixelAvatar';
import {AVATARS} from '../../components/avatar/avatarOptions';
export function Avatar() {
 const {user, updateUserAvatar}=useAuth();
 const [selected,setSelected]=useState(user?.avatarId || 'nova');
 const [busy,setBusy]=useState(false), [message,setMessage]=useState('');
 const save=async()=>{setBusy(true);setMessage('');try{await updateUserAvatar({avatarId:selected});setMessage('Avatar salvo no seu perfil.');}catch(e){setMessage(e.message);}finally{setBusy(false);}};
 return <div className="cp-page"><p className="cp-eyebrow">SEU PERSONAGEM · SUA JORNADA</p><h2>Escolha seu avatar</h2><p className="cp-muted">Encontre o personagem que combina com você. Sua escolha acompanha o seu perfil.</p>
 <div className="cp-avatar-layout"><section className="cp-panel cp-avatar-preview"><span className="cp-badge">PLAYER 01</span><PixelAvatar avatarId={selected} size={224}/><h3>{AVATARS.find(a=>a.id===selected)?.name}</h3><p className="cp-muted">Pronto para a próxima missão?</p><button disabled={busy || selected===user?.avatarId} onClick={save}>{busy?'Salvando...':'Usar este avatar'}</button></section>
 <section className="cp-panel"><h3>Personagens disponíveis</h3><div className="cp-avatar-grid">{AVATARS.map(a=><button className={'cp-avatar-option '+(selected===a.id?'is-selected':'')} key={a.id} aria-pressed={selected===a.id} onClick={()=>setSelected(a.id)}><PixelAvatar avatarId={a.id} size={96}/><strong>{a.name}</strong><small>{selected===a.id?'Selecionado':'Selecionar'}</small></button>)}</div></section></div><p role="status">{message}</p></div>;
}
export default Avatar;
