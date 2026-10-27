import React from 'react';
import { useRanking } from '../../hooks/useRanking.js';

export function Ranking() {
    const { ranking, loading } = useRanking("all");

    const getBadge = (points) => {
        if (points >= 1200) return '🥇 Mestre CodePath';
        if (points >= 1100) return '🥈 Especialista';
        if (points >= 1000) return '🥉 Avançado';
        return '💡 Participante';
    };

    const rankingData = (ranking || []).map((item, index) => ({
        position: item.position || index + 1,
        name: item.name,
        points: typeof item.points === 'number' ? `${item.points} pts` : (item.points || '0 pts'),
        badge: item.badge || item.achievement || getBadge(item.points || 0),
    }));

    if (loading) {
        return (
            <div style={{ color: '#00f0ff', maxWidth: '800px', padding: '20px', fontFamily: 'var(--font-pixel)', fontSize: '12px' }}>
                <p>CARREGANDO RANKING...</p>
            </div>
        );
    }

    return (
        <div style={{ color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '16px', color: '#ffcc00', marginBottom: '10px' }}>🏆 RANKING GERAL</h2>
            <p style={{ color: '#8e95b3', marginBottom: '25px', fontSize: '13px' }}>
                Consulta a classificação atual dos participantes com base nas entregas e pontos acumulados.
            </p>

            <div style={{ 
                background: '#15182e', 
                borderRadius: '8px', 
                overflow: 'hidden',
                border: '1px solid #2b2e4a'
            }}>
                <div style={{ 
                    display: 'flex', 
                    background: '#0b0c16', 
                    padding: '14px 20px', 
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '10px',
                    color: '#8e95b3',
                    borderBottom: '1px solid #2b2e4a'
                }}>
                    <span style={{ width: '80px' }}>POSIÇÃO</span>
                    <span style={{ flex: 1 }}>PARTICIPANTE</span>
                    <span style={{ width: '160px' }}>CONQUISTA</span>
                    <span style={{ width: '100px', textAlign: 'right' }}>PONTOS</span>
                </div>

                {rankingData.length > 0 ? (
                    rankingData.map((user, index) => (
                        <div key={user.position || index} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '14px 20px', 
                            borderBottom: index < rankingData.length - 1 ? '1px solid #1c203d' : 'none',
                            background: user.position === 1 ? 'rgba(255, 204, 0, 0.05)' : 'transparent'
                        }}>
                            <span style={{ width: '80px', fontFamily: 'var(--font-pixel)', fontSize: '11px', color: user.position === 1 ? '#ffcc00' : '#00f0ff' }}>
                                #{user.position}
                            </span>
                            <span style={{ flex: 1, fontWeight: '500', fontSize: '14px' }}>{user.name}</span>
                            <span style={{ width: '160px', fontSize: '12px', color: '#8e95b3' }}>{user.badge}</span>
                            <span style={{ width: '100px', textAlign: 'right', fontFamily: 'var(--font-pixel)', fontSize: '11px', color: '#ff007f' }}>
                                {user.points}
                            </span>
                        </div>
                    ))
                ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#8e95b3', fontSize: '12px' }}>
                        Nenhum participante encontrado no ranking.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Ranking;