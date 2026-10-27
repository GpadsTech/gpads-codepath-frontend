import React from 'react';
import { useReports } from "../../hooks/useReports.js";

export function Reports() {
    const { reports, loading } = useReports();

    const totalReports = reports?.length || 0;
    const completedReports = reports?.filter(r => r.status === 'completed' || r.status === 'Concluído')?.length || 0;
    const completionRate = totalReports > 0 ? Math.round((completedReports / totalReports) * 100) : 100;

    const reportCards = [
        { 
            title: 'TAREFAS CONCLUÍDAS', 
            value: totalReports > 0 ? `${completedReports} / ${totalReports}` : '14 / 18', 
            percentage: totalReports > 0 ? `${completionRate}%` : '78%', 
            color: '#00f0ff' 
        },
        { 
            title: 'MISSÕES CODEPATH', 
            value: '6 / 8', 
            percentage: '75%', 
            color: '#ffcc00' 
        },
        { 
            title: 'PRESENÇA & PARTICIPAÇÃO', 
            value: '100%', 
            percentage: '100%', 
            color: '#00e676' 
        }
    ];

    if (loading) {
        return (
            <div style={{ color: '#00f0ff', maxWidth: '800px', padding: '20px', fontFamily: 'var(--font-pixel)', fontSize: '12px' }}>
                <p>CARREGANDO RELATÓRIOS...</p>
            </div>
        );
    }

    return (
        <div style={{ color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '16px', color: '#ff007f', marginBottom: '10px' }}>&gt; RELATÓRIOS DE PROGRESSO</h2>
            <p style={{ color: '#8e95b3', marginBottom: '30px', fontSize: '13px' }}>
                Acompanha o teu desempenho detalhado e o progresso nas entregas do projeto.
            </p>

            {/* Cartões de Estatísticas estilo Arcade */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '30px' }}>
                {reportCards.map((card, index) => (
                    <div key={index} style={{ 
                        background: '#15182e', 
                        padding: '16px', 
                        borderRadius: '6px', 
                        flex: '1', 
                        minWidth: '200px',
                        border: '1px solid #2b2e4a'
                    }}>
                        <p style={{ fontSize: '10px', fontFamily: 'var(--font-pixel)', color: '#8e95b3', marginBottom: '10px' }}>{card.title}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{card.value}</span>
                            <span style={{ fontSize: '12px', fontFamily: 'var(--font-pixel)', color: card.color }}>{card.percentage}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Histórico Recente / Markdown Preview Box */}
            <div style={{ 
                background: '#15182e', 
                padding: '20px', 
                borderRadius: '8px',
                border: '1px solid #2b2e4a'
            }}>
                <h3 style={{ fontSize: '12px', color: '#00f0ff', marginBottom: '15px' }}>📋 ATIVIDADES RECENTES</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {reports && reports.length > 0 ? (
                        reports.map((item, idx) => (
                            <div key={item.id || idx} style={{ 
                                background: '#0b0c16', 
                                padding: '12px 15px', 
                                borderRadius: '4px', 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                border: '1px solid #2b2e4a'
                            }}>
                                <span style={{ fontSize: '13px' }}>{item.title || item.name || item.description}</span>
                                <span style={{ color: '#00e676', fontSize: '10px', fontFamily: 'var(--font-pixel)' }}>
                                    {item.status || 'CONCLUÍDO'}
                                </span>
                            </div>
                        ))
                    ) : (
                        <>
                            <div style={{ background: '#0b0c16', padding: '12px 15px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', border: '1px solid #2b2e4a' }}>
                                <span style={{ fontSize: '13px' }}>Implementação da navegação e rotas (React Router)</span>
                                <span style={{ color: '#00e676', fontSize: '10px', fontFamily: 'var(--font-pixel)' }}>CONCLUÍDO</span>
                            </div>
                            <div style={{ background: '#0b0c16', padding: '12px 15px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', border: '1px solid #2b2e4a' }}>
                                <span style={{ fontSize: '13px' }}>Criação dos componentes base (Button, Input, Card)</span>
                                <span style={{ color: '#00e676', fontSize: '10px', fontFamily: 'var(--font-pixel)' }}>CONCLUÍDO</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Reports;