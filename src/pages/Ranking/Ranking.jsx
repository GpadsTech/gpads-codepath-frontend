import React from 'react';

export function Ranking() {
    const rankingData = [
        { position: 1, name: 'Samara Sá', points: '1250 pts', badge: '🥇 Mestre CodePath' },
        { position: 2, name: 'Alane Silva', points: '1180 pts', badge: '🥈 Especialista' },
        { position: 3, name: 'Carlos Eduardo', points: '1050 pts', badge: '🥉 Avançado' },
        { position: 4, name: 'Beatriz Lima', points: '990 pts', badge: '💡 Participante' },
        { position: 5, name: 'Lucas Gabriel', points: '920 pts', badge: '💡 Participante' },
    ];

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

                {rankingData.map((user) => (
                    <div key={user.position} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '15px 20px', 
                        borderBottom: user.position < rankingData.length ? '1px solid #252542' : 'none',
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
                ))}
            </div>
        </div>
    );
}

export default Ranking;