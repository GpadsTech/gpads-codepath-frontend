import React from 'react';
import { useUser } from '../../hooks/useUser.js';
import { useRanking } from '../../hooks/useRanking.js';

export function Dashboard() {
    const { user, loading: userLoading } = useUser();
    const { ranking, loading: rankingLoading } = useRanking("all");

    const userData = {
        name: user?.name || "Estudante",
        level: user?.level ?? 1,
        currentPoints: user?.points ?? 0,
        nextLevelPoints: ((user?.level ?? 1) * 250),
        progressPercentage: user?.progress ?? Math.min(100, Math.round(((user?.points ?? 0) / ((user?.level ?? 1) * 250)) * 100)),
        conquestsCount: user?.conquestsCount ?? 0,
        activeChallenges: user?.activeChallenges ?? 0,
    };

    const topRanking = (ranking || []).slice(0, 3).map((item, index) => ({
        position: item.position ?? index + 1,
        name: item.name + (item.userId === user?.id ? " (Tu)" : ""),
        points: item.points ?? 0,
        isUser: item.userId === user?.id,
    }));

    if (userLoading || rankingLoading) {
        return (
            <div style={{ color: '#00f0ff', padding: '40px', textAlign: 'center', fontFamily: 'var(--font-pixel)', fontSize: '12px' }}>
                <p>CARREGANDO DADOS DO PAINEL...</p>
            </div>
        );
    }

    return (
        <div style={{ color: '#fff', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {/* Header com estilo RPG/Arcade */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #2b2e4a', paddingBottom: '20px', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ fontSize: '16px', color: '#fff', marginBottom: '6px' }}>Bem-vindo(a), {userData.name}!</h2>
                    <p style={{ color: '#8e95b3', fontSize: '12px' }}>Pronta para a próxima quest?</p>
                </div>

                {/* Barra de Level / XP */}
                <div style={{ textAlign: 'right', minWidth: '200px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--font-pixel)', color: '#00f0ff', marginBottom: '6px' }}>
                        <span>LVL {userData.level}</span>
                        <span>{userData.currentPoints}/{userData.nextLevelPoints} XP</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', backgroundColor: '#15182e', border: '1px solid #3b82f6', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${userData.progressPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #ff007f)' }}></div>
                    </div>
                </div>
            </div>

            {/* Cartões de Status / Célula */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ backgroundColor: '#15182e', padding: '16px', borderRadius: '6px', border: '1px solid #3b82f6' }}>
                    <h3 style={{ fontSize: '10px', color: '#00f0ff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        ⚡ STATUS SPRINT
                    </h3>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{userData.currentPoints} pts</p>
                    <span style={{ fontSize: '10px', color: '#00e676', backgroundColor: 'rgba(0,230,118,0.1)', border: '1px solid #00e676', padding: '2px 6px', borderRadius: '4px', marginTop: '8px', display: 'inline-block' }}>
                        EM ANDAMENTO
                    </span>
                </div>

                <div style={{ backgroundColor: '#15182e', padding: '16px', borderRadius: '6px', border: '1px solid #ff007f' }}>
                    <h3 style={{ fontSize: '10px', color: '#ff66cc', marginBottom: '10px' }}>👾 CONQUISTAS</h3>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{userData.conquestsCount} Desbloqueadas</p>
                </div>

                <div style={{ backgroundColor: '#15182e', padding: '16px', borderRadius: '6px', border: '1px solid #ffcc00' }}>
                    <h3 style={{ fontSize: '10px', color: '#ffcc00', marginBottom: '10px' }}>⚔️ DESAFIOS ATIVOS</h3>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{userData.activeChallenges} Quests</p>
                </div>
            </div>

            {/* Leaderboard Estilizado conforme imagem */}
            <div style={{ backgroundColor: '#15182e', padding: '20px', borderRadius: '8px', border: '1px solid #2b2e4a' }}>
                <h3 style={{ fontSize: '12px', color: '#ffcc00', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🏆 LEADERBOARD
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {topRanking.length > 0 ? (
                        topRanking.map((item) => {
                            const isGold = item.position === 1;
                            const isUser = item.isUser;
                            const borderColor = isGold ? '#ffcc00' : isUser ? '#ff007f' : '#3b82f6';

                            return (
                                <div key={item.position} style={{ 
                                    display: 'flex', 
                                    justify: 'space-between', 
                                    alignItems: 'center',
                                    backgroundColor: '#0b0c16', 
                                    padding: '12px 16px', 
                                    borderRadius: '6px', 
                                    border: `1px solid ${borderColor}`,
                                    boxShadow: isUser ? '0 0 10px rgba(255,0,127,0.2)' : 'none'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '12px', color: borderColor }}>
                                            #{item.position}
                                        </span>
                                        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.name}</span>
                                    </div>
                                    <span style={{ 
                                        backgroundColor: isGold ? 'rgba(255,204,0,0.15)' : 'rgba(59,130,246,0.15)', 
                                        color: isGold ? '#ffcc00' : '#00f0ff', 
                                        border: `1px solid ${borderColor}`,
                                        padding: '4px 10px', 
                                        borderRadius: '4px',
                                        fontSize: '10px',
                                        fontFamily: 'var(--font-pixel)'
                                    }}>
                                        {item.points} XP
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ color: '#8e95b3', fontSize: '12px' }}>Nenhum participante no ranking ainda.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;