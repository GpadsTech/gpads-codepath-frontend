import React from 'react';

export function Avatar({ url, size = 'medium', name = 'Utilizador' }) {
    const sizeMap = {
        small: '40px',
        medium: '80px',
        large: '120px'
    };

    const dimension = sizeMap[size] || sizeMap.medium;

    return (
        <div style={{
            width: dimension,
            height: dimension,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #8257e5',
            backgroundColor: '#202024',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {url ? (
                <img src={url} alt={`Avatar de ${name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
                <span style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>
                    {name.charAt(0)}
                </span>
            )}
        </div>
    );
}

export default Avatar;