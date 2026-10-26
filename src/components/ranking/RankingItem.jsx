import React from 'react';
import { RankingPosition } from './RankingPosition';

export function RankingItem({ position, name, points, isUser }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isUser ? '#25252b' : '#202024',
            border: isUser ? '1px solid #8257e5' : '1px solid transparent',
            padding: '14px 18px',
            borderRadius: '8px',
            marginBottom: '10px',
            transition: 'background-color 0.2s'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <RankingPosition position={position} />
                <span style={{ color: '#e1e1e6', fontSize: '16px', fontWeight: isUser ? 'bold' : 'normal' }}>
                    {name} {isUser && <span style={{ color: '#8257e5', fontSize: '12px' }}>(Tu)</span>}
                </span>
            </div>
            <span style={{ color: '#00b37e', fontWeight: 'bold', fontSize: '16px' }}>
                {points} pts
            </span>
        </div>
    );
}