import React from 'react';
import { RankingItem } from './RankingItem';

export function RankingList() {
    // Dados simulados
    const rankingData = [
        { position: 1, name: "Ana Beatriz", points: 1250 },
        { position: 2, name: "Samara", points: 850, isUser: true },
        { position: 3, name: "Carlos Eduardo", points: 720 },
        { position: 4, name: "Mariana Souza", points: 610 },
        { position: 5, name: "João Pedro", points: 530 }
    ];

    return (
        <div style={{ color: '#fff', padding: '24px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#121214', borderRadius: '12px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '22px', borderBottom: '1px solid #29292e', paddingBottom: '12px' }}>
                🏆 Tabela de Classificação Geral
            </h2>
            <div>
                {rankingData.map((item) => (
                    <RankingItem 
                        key={item.position}
                        position={item.position}
                        name={item.name}
                        points={item.points}
                        isUser={item.isUser}
                    />
                ))}
            </div>
        </div>
    );
}

export default RankingList;