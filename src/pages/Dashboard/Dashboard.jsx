import React from 'react';
import { useUser } from '../../hooks/useUser.js';
import { useRanking } from '../../hooks/useRanking.js';

export function Dashboard() {
    const { user, loading: userLoading } = useUser();
    const { ranking, loading: rankingLoading } = useRanking("all");

    // Dados dinâmicos do usuário vindo da API com fallbacks para evitar erros enquanto carrega
    const userData = {
        name: user?.name || "Estudante",
        level: user?.level ?? 1,
        currentPoints: user?.points ?? 0,
        nextLevelPoints: ((user?.level ?? 1) * 250), // Meta de pontos calculada para o nível
        progressPercentage: user?.progress ?? Math.min(100, Math.round(((user?.points ?? 0) / ((user?.level ?? 1) * 250)) * 100)),
        conquestsCount: user?.conquestsCount ?? 0,
        activeChallenges: user?.activeChallenges ?? 0,
    };

    // Pega os 3 primeiros do ranking retornado pela API
    const topRanking = (ranking || []).slice(0, 3).map((item, index) => ({
        position: item.position ?? index + 1,
        name: item.name + (item.userId === user?.id ? " (Tu)" : ""),
        points: item.points ?? 0,
        isUser: item.userId === user?.id,
    }));

    if (userLoading || rankingLoading) {
        return (
            <div style={{ color: '#fff', padding: '40px', textAlign: 'center' }}>
                <p>Carregando dados do painel...</p>
            </div>
        );
    }

    return (
        <div style={{ color: '#fff', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {/* 1. Cabeçalho com Saudação e Avatar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #29292e', paddingBottom: '20px', marginBottom: '24px' }}>
                <div>
                    <h2>Olá, {userData.name}! 👋</h2>
                    <p style={{ color: '#a0a0c0', marginTop: '5px' }}>
                        Bem-vinda de volta ao painel principal do GPADS CodePath!
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#8257e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                        {userData.name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ backgroundColor: '#8257e5', fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                        Nível {userData.level}
                    </span>
                </div>
            </div>

            {/* 2. Cartões de Métricas (Pontos, Conquistas, Desafios) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ backgroundColor: '#202024', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '14px', color: '#a8a8b3', marginBottom: '8px' }}>Pontuação</h3>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#00b37e' }}>{userData.currentPoints} pts</p>
                </div>
                <div style={{ backgroundColor: '#202024', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '14px', color: '#a8a8b3', marginBottom: '8px' }}>Conquistas</h3>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#00b37e' }}>{userData.conquestsCount}</p>
                </div>
                <div style={{ backgroundColor: '#202024', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '14px', color: '#a8a8b3', marginBottom: '8px' }}>Desafios Ativos</h3>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#00b37e' }}>{userData.activeChallenges}</p>
                </div>
            </div>

            {/* 3. Barra de Progresso */}
            <div style={{ backgroundColor: '#202024', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: '#c4c4cc' }}>
                    <span>Progresso para o Nível {userData.level + 1}</span>
                    <span>{userData.currentPoints} / {userData.nextLevelPoints} pts</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#29292e', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${userData.progressPercentage}%`, height: '100%', backgroundColor: '#00b37e', borderRadius: '4px' }}></div>
                </div>
            </div>

            {/* 4. Ranking Resumido */}
            <div>
                <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>🏆 Top Ranking</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {topRanking.length > 0 ? (
                        topRanking.map((item) => (
                            <li key={item.position} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#202024', padding: '12px 16px', borderRadius: '6px', marginBottom: '8px', border: item.isUser ? '1px solid #8257e5' : 'none' }}>
                                <span>#{item.position} {item.name}</span>
                                <strong>{item.points} pts</strong>
                            </li>
                        ))
                    ) : (
                        <p style={{ color: '#a8a8b3', fontSize: '14px' }}>Nenhum participante no ranking ainda.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;