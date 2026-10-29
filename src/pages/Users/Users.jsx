import React,{useEffect,useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import {ApiClient} from '../../infrastructure/api/apiClient';
const api=new ApiClient();
export function Users(){
 const {user}=useAuth();const allowed=user?.role==='leader';
 const initial={name:'',email:'',password:'',role:'student',cellId:user?.ledCellIds?.[0] || ''};
 const [form,setForm]=useState(initial),[students,setStudents]=useState([]),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[error,setError]=useState('');
 useEffect(()=>{if(allowed)api.get('/students/').then(setStudents).catch(e=>setError(e.message));},[allowed]);
 if(!allowed)return <Navigate to="/dashboard" replace/>;
 const change=(k,v)=>setForm(p=>({...p,[k]:v}));
 const submit=async e=>{e.preventDefault();setBusy(true);setError('');setMessage('');try{const student=await api.post('/students/',form);setStudents(p=>[student,...p]);setForm({...initial});setMessage('Conta criada. O estudante já pode entrar com o e-mail e senha cadastrados.');}catch(e){setError(e.message);}finally{setBusy(false);}};
 return <div className="cp-page"><p className="cp-eyebrow">GESTÃO DA CÉLULA</p><h2>Cadastrar usuários</h2><p className="cp-muted">Crie o acesso dos estudantes e membros da sua célula.</p><section className="cp-panel"><h3>Novo estudante / membro</h3><form onSubmit={submit} className="cp-form"><label>Nome<input required maxLength={120} autoComplete="name" value={form.name} onChange={e=>change('name',e.target.value)}/></label><label>E-mail<input required type="email" autoComplete="email" value={form.email} onChange={e=>change('email',e.target.value)}/></label><label>Senha<input required type="password" aria-label="Senha" minLength={8} maxLength={128} autoComplete="new-password" value={form.password} onChange={e=>change('password',e.target.value)}/><small className="cp-muted">Use pelo menos 8 caracteres.</small></label><label>Tipo de usuário<select value={form.role} onChange={e=>change('role',e.target.value)}><option value="student">Estudante / membro</option></select></label>{user.ledCellIds?.length>1&&<label>Célula<select required value={form.cellId} onChange={e=>change('cellId',e.target.value)}>{user.ledCellIds.map(id=><option key={id}>{id}</option>)}</select></label>}<button disabled={busy || !form.cellId}>{busy?'Cadastrando...':'Cadastrar usuário'}</button></form>{error&&<p role="alert" className="cp-notice">{error}</p>}{message&&<p role="status" className="cp-notice">{message}</p>}</section><section className="cp-panel"><h3>Estudantes da célula</h3>{students.length?students.map(s=><div className="cp-report" key={s.id}><strong>{s.name}</strong><p className="cp-muted">{s.email} · {s.cellId}</p></div>):<p className="cp-muted">Nenhum estudante cadastrado.</p>}</section></div>;
}
