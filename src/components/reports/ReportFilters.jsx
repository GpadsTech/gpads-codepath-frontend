import React, { useState } from 'react';

export function ReportFilters({ onFilterChange }) {
    const [activeFilter, setActiveFilter] = useState('weekly');

    const handleSelect = (filter) => {
        setActiveFilter(filter);
        if (onFilterChange) onFilterChange(filter);
    };

    const filters = [
        { id: 'weekly', label: 'Esta Semana' },
        { id: 'monthly', label: 'Este Mês' },
        { id: 'yearly', label: 'Este Ano' }
    ];

    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {filters.map((f) => (
                <button
                    key={f.id}
                    onClick={() => handleSelect(f.id)}
                    style={{
                        backgroundColor: activeFilter === f.id ? '#8257e5' : '#202024',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: activeFilter === f.id ? 'bold' : 'normal',
                        transition: 'background-color 0.2s'
                    }}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}

export default ReportFilters;