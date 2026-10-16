import React from 'react';

export function Card({ children, style, ...props }) {
    return (
        <div style={{
            background: 'var(--bg-secondary, #1e1e38)',
            borderRadius: 'var(--border-radius, 8px)',
            padding: '20px',
            border: '1px solid var(--border-color, #333357)',
            color: 'var(--text-main, #ffffff)',
            ...style
        }} {...props}>
            {children}
        </div>
    );
}

export default Card;