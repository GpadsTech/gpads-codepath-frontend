import React from 'react';

export function AvatarLevel({ level }) {
    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#202024',
            border: '1px solid #00b37e',
            padding: '6px 12px',
            borderRadius: '20px',
            color: '#00b37e',
            fontWeight: 'bold',
            fontSize: '14px'
        }}>
            <span>⭐ Nível {level}</span>
        </div>
    );
}

export default AvatarLevel;