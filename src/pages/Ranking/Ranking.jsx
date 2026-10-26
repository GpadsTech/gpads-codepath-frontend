import React from 'react';
import { useRanking } from '../../hooks/useRanking.js';

export function Ranking() {
    const { ranking, loading } = useRanking("all");

    // Determina a conquista/selo com base na pontuação vinda da API
    const getBadge = (points) => {
        if (points >= 1200) return '🥇 Mestre CodePath';
        if (points >= 1100) return '🥈 Especialista';
        if (points >= 1000) return '🥉 Avançado';
        return '💡 Participante';
    };

    // Mapeia os dados reais da API para a estrutura que o layout da Samara espera
    const rankingData = (ranking || []).map((item, index) => ({
        position: item.position || index + 1,
        name: item.name,
        points: typeof item.points === 'number' ? `${item.points} pts` : (item.points || '0 pts'),
        badge: item.badge || item.achievement || getBadge(item.points || 0),
    }));

    if (loading) {
        return (
            <div style={{ color: '#fff', maxWidth: '800px', padding: '20px' }}>
                <p style={{ color: '#a0a0c0' }}>Carregando ranking...</p>
            </div>
        );
    }

    return (
        <div style={{ color: '#fff', maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '10px' }}>Ranking Geral</h2>
            <p style={{ color: '#a0a0c0', marginBottom: '30px' }}>
                Consulta a classificação atual dos participantes com base nas entregas e pontos acumulados.
            </p>

            <div style={{ 
                background: '#1e1e38', 
                borderRadius: '8px', 
                overflow: 'hidden',
                border: '1px solid #333357'
            }}>
                <div style={{ 
                    display: 'flex', 
                    background: '#252542', 
                    padding: '15px 20px', 
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#a0a0c0',
                    borderBottom: '1px solid #333357'
                }}>
                    <span style={{ width: '80px' }}>Posição</span>
                    <span style={{ flex: 1 }}>Participante</span>
                    <span style={{ width: '150px' }}>Conquista</span>
                    <span style={{ width: '100px', textAlign: 'right' }}>Pontos</span>
                </div>

                {rankingData.length > 0 ? (
                    rankingData.map((user, index) => (
                        <div key={user.position || index} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '15px 20px', 
                            borderBottom: index < rankingData.length - 1 ? '1px solid #252542' : 'none',
                            background: user.position === 1 ? 'rgba(108, 99, 255, 0.1)' : 'transparent'
                        }}>
                            <span style={{ width: '80px', fontWeight: 'bold', color: user.position === 1 ? '#ffcc00' : '#fff' }}>
                                #{user.position}
                            </span>
                            <span style={{ flex: 1, fontWeight: '500' }}>{user.name}</span>
                            <span style={{ width: '150px', fontSize: '13px', color: '#a0a0c0' }}>{user.badge}</span>
                            <span style={{ width: '100px', textAlign: 'right', fontWeight: 'bold', color: '#6c63ff' }}>
                                {user.points}
                            </span>
                        </div>
                    ))
                ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#a0a0c0' }}>
                        Nenhum participante encontrado no ranking.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Ranking;