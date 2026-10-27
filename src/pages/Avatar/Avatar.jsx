import React, { useState } from 'react';

export function Avatar() {
    const [selectedItem, setSelectedItem] = useState('Chapéu CodePath');

    const items = [
        { id: 1, name: 'Chapéu CodePath', type: 'Acessório', status: 'Equipado' },
        { id: 2, name: 'Óculos Tech', type: 'Acessório', status: 'Disponível' },
        { id: 3, name: 'Casaco GPADS', type: 'Roupa', status: 'Disponível' }
    ];

    return (
        <div style={{ color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '16px', marginBottom: '10px', color: '#ff007f' }}>PERSONALIZAÇÃO DO AVATAR</h2>
            <p style={{ color: '#8e95b3', marginBottom: '30px', fontSize: '13px' }}>
                Personaliza o teu avatar conforme ganhas pontos nas missões do CodePath.
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {/* Pré-visualização do Avatar */}
                <div style={{ 
                    background: '#15182e', 
                    padding: '30px', 
                    borderRadius: '8px', 
                    textAlign: 'center', 
                    flex: '1', 
                    minWidth: '250px',
                    border: '1px solid #ff007f',
                    boxShadow: '0 0 15px rgba(255, 0, 127, 0.2)'
                }}>
                    <div style={{ 
                        width: '120px', 
                        height: '120px', 
                        background: '#0b0c16', 
                        borderRadius: '50%', 
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '48px',
                        border: '2px solid #00f0ff',
                        boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)'
                    }}>
                        👤
                    </div>
                    <h3 style={{ fontSize: '12px', color: '#00f0ff' }}>TEU AVATAR</h3>
                    <p style={{ fontSize: '12px', color: '#8e95b3', marginTop: '8px' }}>
                        EQUIPADO: <strong style={{ color: '#ffcc00' }}>{selectedItem}</strong>
                    </p>
                </div>

                {/* Lista de Itens Disponíveis */}
                <div style={{ 
                    background: '#15182e', 
                    padding: '25px', 
                    borderRadius: '8px', 
                    flex: '2', 
                    minWidth: '300px',
                    border: '1px solid #2b2e4a'
                }}>
                    <h3 style={{ fontSize: '12px', color: '#ffcc00', marginBottom: '15px' }}>ITENS DESBLOQUEADOS</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {items.map((item) => (
                            <div key={item.id} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                background: '#0b0c16', 
                                padding: '12px 15px', 
                                borderRadius: '6px',
                                border: '1px solid #2b2e4a'
                            }}>
                                <div>
                                    <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>{item.name}</p>
                                    <span style={{ fontSize: '11px', color: '#8e95b3' }}>{item.type}</span>
                                </div>
                                <button 
                                    onClick={() => setSelectedItem(item.name)}
                                    style={{ 
                                        background: selectedItem === item.name ? 'linear-gradient(90deg, #ff007f, #8b5cf6)' : '#15182e', 
                                        color: '#fff', 
                                        border: selectedItem === item.name ? 'none' : '1px solid #3b82f6', 
                                        padding: '8px 12px', 
                                        borderRadius: '4px', 
                                        cursor: 'pointer',
                                        fontSize: '10px',
                                        fontFamily: 'var(--font-pixel)'
                                    }}
                                >
                                    {selectedItem === item.name ? 'EQUIPADO' : 'EQUIPAR'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Avatar;