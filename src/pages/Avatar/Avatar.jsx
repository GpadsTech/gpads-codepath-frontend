import React, { useState } from 'react';

export function Avatar() {
    const [selectedItem, setSelectedItem] = useState('Chapéu CodePath');

    const items = [
        { id: 1, name: 'Chapéu CodePath', type: 'Acessório', status: 'Equipado' },
        { id: 2, name: 'Óculos Tech', type: 'Acessório', status: 'Disponível' },
        { id: 3, name: 'Casaco GPADS', type: 'Roupa', status: 'Disponível' }
    ];

    return (
        <div style={{ color: '#fff', maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '10px' }}>Personalização do Avatar</h2>
            <p style={{ color: '#a0a0c0', marginBottom: '30px' }}>
                Personaliza o teu avatar conforme ganhas pontos nas missões do CodePath.
            </p>

            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                {/* Pré-visualização do Avatar */}
                <div style={{ 
                    background: '#1e1e38', 
                    padding: '30px', 
                    borderRadius: '8px', 
                    textAlign: 'center', 
                    flex: '1', 
                    minWidth: '250px',
                    border: '1px solid #333357'
                }}>
                    <div style={{ 
                        width: '120px', 
                        height: '120px', 
                        background: '#252542', 
                        borderRadius: '50%', 
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '40px',
                        border: '2px solid #6c63ff'
                    }}>
                        👤
                    </div>
                    <h3 style={{ fontSize: '18px' }}>O teu Avatar</h3>
                    <p style={{ fontSize: '14px', color: '#a0a0c0', marginTop: '5px' }}>Atualmente usando: <strong>{selectedItem}</strong></p>
                </div>

                {/* Lista de Itens Disponíveis */}
                <div style={{ 
                    background: '#1e1e38', 
                    padding: '25px', 
                    borderRadius: '8px', 
                    flex: '2', 
                    minWidth: '300px',
                    border: '1px solid #333357'
                }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Itens Desbloqueados</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {items.map((item) => (
                            <div key={item.id} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                background: '#252542', 
                                padding: '12px 15px', 
                                borderRadius: '6px' 
                            }}>
                                <div>
                                    <p style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.name}</p>
                                    <span style={{ fontSize: '12px', color: '#a0a0c0' }}>{item.type}</span>
                                </div>
                                <button 
                                    onClick={() => setSelectedItem(item.name)}
                                    style={{ 
                                        background: selectedItem === item.name ? '#4e44ce' : '#333357', 
                                        color: '#fff', 
                                        border: 'none', 
                                        padding: '8px 12px', 
                                        borderRadius: '4px', 
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}
                                >
                                    {selectedItem === item.name ? 'Equipado' : 'Equipar'}
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