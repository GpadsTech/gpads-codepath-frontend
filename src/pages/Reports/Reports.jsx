import React from 'react';

export function Reports() {
    const reportCards = [
        { title: 'Tarefas Concluídas', value: '14 / 18', percentage: '78%', color: '#4e44ce' },
        { title: 'Missões do CodePath', value: '6 / 8', percentage: '75%', color: '#ffcc00' },
        { title: 'Presença e Participação', value: '100%', percentage: '100%', color: '#2ecc71' }
    ];

    return (
        <div style={{ color: '#fff', maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '10px' }}>Relatórios de Progresso</h2>
            <p style={{ color: '#a0a0c0', marginBottom: '30px' }}>
                Acompanha o teu desempenho detalhado e o progresso nas entregas do projeto.
            </p>

            {/* Cartões de Estatísticas */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
                {reportCards.map((card, index) => (
                    <div key={index} style={{ 
                        background: '#1e1e38', 
                        padding: '20px', 
                        borderRadius: '8px', 
                        flex: '1', 
                        minWidth: '200px',
                        border: '1px solid #333357'
                    }}>
                        <p style={{ fontSize: '13px', color: '#a0a0c0', marginBottom: '8px' }}>{card.title}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{card.value}</span>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: card.color }}>{card.percentage}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Secção de Histórico Recente */}
            <div style={{ 
                background: '#1e1e38', 
                padding: '25px', 
                borderRadius: '8px',
                border: '1px solid #333357'
            }}>
                <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Atividades Recentes</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ background: '#252542', padding: '12px 15px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Implementação da navegação e rotas (React Router)</span>
                        <span style={{ color: '#2ecc71', fontSize: '12px' }}>Concluído</span>
                    </div>
                    <div style={{ background: '#252542', padding: '12px 15px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Criação dos componentes base (Button, Input, Card)</span>
                        <span style={{ color: '#2ecc71', fontSize: '12px' }}>Concluído</span>
                    </div>
                    <div style={{ background: '#252542', padding: '12px 15px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Estruturação do Layout e Sidebar</span>
                        <span style={{ color: '#2ecc71', fontSize: '12px' }}>Concluído</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;