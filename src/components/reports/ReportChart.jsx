import React from 'react';

export function ReportChart() {
    const chartData = [
        { day: 'Seg', points: 120 },
        { day: 'Ter', points: 200 },
        { day: 'Qua', points: 150 },
        { day: 'Qui', points: 300 },
        { day: 'Sex', points: 250 },
        { day: 'Sáb', points: 400 },
        { day: 'Dom', points: 350 },
    ];

    const maxPoints = 400; 
    return (
        <div style={{
            backgroundColor: '#202024',
            borderRadius: '8px',
            padding: '24px',
            color: '#e1e1e6',
            marginTop: '20px',
            border: '1px solid #29292e'
        }}>
            <h3 style={{ fontSize: '16px', marginBottom: '20px', color: '#f7f7f8' }}>📊 Evolução de Pontuação Semanal</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '180px', paddingTop: '20px', borderBottom: '1px solid #29292e' }}>
                {chartData.map((item) => {
                    const heightPercentage = (item.points / maxPoints) * 100;
                    return (
                        <div key={item.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                            <span style={{ fontSize: '11px', color: '#a8a8b3' }}>{item.points}</span>
                            <div style={{
                                width: '32px',
                                height: `${heightPercentage}%`,
                                backgroundColor: '#00b37e',
                                borderRadius: '4px 4px 0 0',
                                transition: 'height 0.3s ease'
                            }}></div>
                            <span style={{ fontSize: '12px', color: '#c4c4cc', marginTop: '4px' }}>{item.day}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ReportChart;