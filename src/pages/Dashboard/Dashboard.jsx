import React from 'react';

export function Dashboard() {
    const mockUserData = {
        name: "Samara",
        level: 4,
        currentPoints: 850,
        nextLevelPoints: 1000,
        progressPercentage: 85,
        conquestsCount: 12,
        activeChallenges: 3,
    };

    const mockRankingSummary = [
        { position: 1, name: "Ana Beatriz", points: 1250 },
        { position: 2, name: "Samara (Tu)", points: 850, isUser: true },
        { position: 3, name: "Carlos Eduardo", points: 720 },
    ];

    return (
        <div style={{ color: '#fff', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {/* 1. Cabeçalho com Saudação e Avatar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #29292e', paddingBottom: '20px', marginBottom: '24px' }}>
                <div>
                    <h2>Olá, {mockUserData.name}! 👋</h2>
                    <p style={{ color: '#a0a0c0', marginTop: '5px' }}>
                        Bem-vinda de volta ao painel principal do GPADS CodePath!
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#8257e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                        {mockUserData.name.charAt(0)}
                    </div>
                    <span style={{ backgroundColor: '#8257e5', fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                        Nível {mockUserData.level}
                    </span>
                </div>
            </div>

            {/* 2. Cartões de Métricas (Pontos, Conquistas, Desafios) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ backgroundColor: '#202024', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '14px', color: '#a8a8b3', marginBottom: '8px' }}>Pontuação</h3>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#00b37e' }}>{mockUserData.currentPoints} pts</p>
                </div>
                <div style={{ backgroundColor: '#202024', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '14px', color: '#a8a8b3', marginBottom: '8px' }}>Conquistas</h3>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#00b37e' }}>{mockUserData.conquestsCount}</p>
                </div>
                <div style={{ backgroundColor: '#202024', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '14px', color: '#a8a8b3', marginBottom: '8px' }}>Desafios Ativos</h3>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#00b37e' }}>{mockUserData.activeChallenges}</p>
                </div>
            </div>

            {/* 3. Barra de Progresso */}
            <div style={{ backgroundColor: '#202024', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: '#c4c4cc' }}>
                    <span>Progresso para o Nível {mockUserData.level + 1}</span>
                    <span>{mockUserData.currentPoints} / {mockUserData.nextLevelPoints} pts</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#29292e', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${mockUserData.progressPercentage}%`, height: '100%', backgroundColor: '#00b37e', borderRadius: '4px' }}></div>
                </div>
            </div>

            {/* 4. Ranking Resumido */}
            <div>
                <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>🏆 Top Ranking</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {mockRankingSummary.map((item) => (
                        <li key={item.position} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#202024', padding: '12px 16px', borderRadius: '6px', marginBottom: '8px', border: item.isUser ? '1px solid #8257e5' : 'none' }}>
                            <span>#{item.position} {item.name}</span>
                            <strong>{item.points} pts</strong>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;