import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiClient } from '../../infrastructure/api/apiClient';
import { PixelAvatar } from '../../components/avatar/PixelAvatar';
import { useAuth } from '../../hooks/useAuth';

const api = new ApiClient();

export function Ranking() {
  const { user } = useAuth();
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api.get('/ranking/')
      .then((data) => {
        if (active) {
          setRankingData(Array.isArray(data) ? data : data?.results || []);
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Variável segura para evitar o erro de .length ou .map em undefined
  const rankingList = Array.isArray(rankingData) ? rankingData : [];

  return (
    <div className="cp-page">
      <div className="cp-welcome">
        <div>
          <h2>Ranking Geral</h2>
          <p className="cp-muted">Acompanhe a pontuação e o nível dos participantes.</p>
        </div>
        <Link className="cp-link" to="/dashboard">← Voltar ao Dashboard</Link>
      </div>

      {error && <p role="alert" className="cp-notice">{error}</p>}
      {loading && <p className="cp-muted">Carregando ranking...</p>}

      {!loading && (
        <section className="cp-panel cp-leaderboard" style={{ marginTop: '1.5rem' }}>
          <h3><span>♜</span> Classificação Geral</h3>
          
          {rankingList.length === 0 ? (
            <p className="cp-muted" style={{ marginTop: '1rem' }}>
              O ranking aparecerá após o cadastro dos estudantes.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' }}>
              {rankingList.map((r, i) => (
                <div 
                  className={'cp-leaderboard-row cp-place-' + (i + 1) + (r.userId === user?.id ? ' cp-is-you' : '')} 
                  key={r.userId || i}
                >
                  <span className="cp-rank-number">#{r.position || i + 1}</span>
                  <PixelAvatar avatarId={r.avatarId} size={40} />
                  <strong>{r.name || 'Usuário'} {r.userId === user?.id ? ' (Você)' : ''}</strong>
                  <span className="cp-xp">LVL {r.level || 1} | {r.points || 0} XP</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Ranking;