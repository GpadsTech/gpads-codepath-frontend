import React from 'react';

export function RankingPosition({ position }) {
    const getMedalColor = (pos) => {
        if (pos === 1) return '#ffd700';
        if (pos === 2) return '#c0c0c0';
        if (pos === 3) return '#cd7f32';
        return '#29292e';
    };

    const textColor = position <= 3 ? '#121214' : '#e1e1e6';

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: getMedalColor(position),
            color: textColor,
            fontWeight: 'bold',
            fontSize: '14px'
        }}>
            {position}º
        </span>
    );
}