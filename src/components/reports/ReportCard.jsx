import React from 'react';

export function ReportCard({ title, value, subtitle, trend }) {
    return (
        <div style={{
            backgroundColor: '#202024',
            borderRadius: '8px',
            padding: '20px',
            color: '#e1e1e6',
            flex: 1,
            minWidth: '200px',
            border: '1px solid #29292e'
        }}>
            <h4 style={{ fontSize: '14px', color: '#a8a8b3', marginBottom: '8px' }}>{title}</h4>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f7f7f8', marginBottom: '4px' }}>
                {value}
            </div>
            {subtitle && (
                <p style={{ fontSize: '12px', color: trend === 'up' ? '#00b37e' : '#fba94c', margin: 0 }}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default ReportCard;