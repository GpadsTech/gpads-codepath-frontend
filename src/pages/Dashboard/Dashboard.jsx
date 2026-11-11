import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import {useRanking} from '../../hooks/useRanking';
import {ApiClient} from '../../infrastructure/api/apiClient';
import {PixelAvatar} from '../../components/avatar/PixelAvatar';
const api=new ApiClient();

export function Dashboard(){
  const {user}=useAuth();
  const {ranking,error:rankError}=useRanking();
  const [data,setData]=useState(null),[error,setError]=useState('');
  const manager=['leader','admin','evaluator'].includes(user?.role);

  useEffect(()=>{
    let active=true;
    api.get('/dashboard/').then(d=>active&&setData(d)).catch(e=>active&&setError(e.message));
    return()=>{active=false;};
  },[user?.id]);

  const points=data?.points??user?.points??0;
  const level=user?.level||1;
  const sprint=data?.activities?.[0];

  // A MÁGICA ACONTECE AQUI: 
  // Se "ranking" não existir ainda, ele usa uma lista vazia "[]" para não dar erro
  const rankingSeguro = ranking || [];

  return (
    <div className="cp-page">
      <div className="cp-welcome">
        <div>
          <h2>Bem-vindo(a), {user?.name}!</h2>
          <p className="cp-muted">Pronto para a próxima quest?</p>
        </div>
        <div className="cp-level">
          <div>
            <b>LVL {level}</b>
            <span>{points} XP</span>
          </div>
          <progress max="100" value={data?.progress || 0} aria-label="Progresso nos desafios"/>
        </div>
      </div>
      
      {error&&<p role="alert" className="cp-notice">{error}</p>}
      
      <div className="cp-dashboard-grid">
        <section className="cp-panel cp-accent-blue">
          <h3><span>ϟ</span> Status da jornada</h3>
          <h4>{sprint?.title || 'Sua próxima conquista'}</h4>
          <span className="cp-badge cp-success">{sprint?'◉ EM ANDAMENTO':'◉ PRONTO PARA COMEÇAR'}</span>
          <p className="cp-muted cp-panel-detail">
            {data?.completedChallenges??0} desafios concluídos · {data?.pendingReports??0} entregas em avaliação
          </p>
          <Link className="cp-link" to="/reports">Acompanhar relatórios →</Link>
        </section>
        <section className="cp-panel cp-accent-pink">
          <h3><span>♟</span> Minha célula</h3>
          <h4>{data?.cellName || user?.cellId || user?.ledCellIds?.join(', ') || 'Célula não vinculada'}</h4>
          <p className="cp-muted cp-panel-detail">Aprendizado, colaboração e evolução em equipe.</p>
          <Link className="cp-link" to={manager?'/users':'/avatar'}>
            {manager?'Cadastrar usuários →':'Personalizar meu avatar →'}
          </Link>
        </section>
      </div>
      
      <section className="cp-panel cp-leaderboard">
        <h3><span>♜</span> Leaderboard <Link to="/ranking">Ver ranking →</Link></h3>
        {rankError&&<p role="alert">{rankError.message}</p>}
        
        {/* Usamos a variável segura para fazer o .slice */}
        {rankingSeguro.slice(0,3).map((r,i)=>
          <div className={'cp-leaderboard-row cp-place-'+(i+1)+(r.userId===user?.id?' cp-is-you':'')} key={r.userId}>
            <span className="cp-rank-number">#{r.position}</span>
            <PixelAvatar avatarId={r.avatarId} size={40}/>
            <strong>{r.name}{r.userId===user?.id?' (Você)':''}</strong>
            <span className="cp-xp">LVL {r.level||1} | {r.points} XP</span>
          </div>
        )}
        
        {/* Usamos a variável segura para ver o .length também */}
        {rankingSeguro.length===0&&!rankError&&
          <p className="cp-muted">O ranking aparecerá após o cadastro dos estudantes.</p>
        }
      </section>
      
      <div className="cp-bottom-quest">
        <span className="cp-muted">CADA ENTREGA É UM NOVO NÍVEL.</span>
        <Link className="cp-link" to="/reports">{manager?'Revisar entregas':'Iniciar nova missão'} →</Link>
      </div>
    </div>
  )
}
export default Dashboard;