import React, { useState } from 'react';

export function AvatarCustomization() {
    const [selectedAccessory, setSelectedAccessory] = useState('Óculos de Sol');

    const accessories = ['Óculos de Sol', 'Chapéu de Explorador', 'Auriculares Gamer', 'Nenhum'];

    return (
        <div style={{
            backgroundColor: '#202024',
            padding: '20px',
            borderRadius: '8px',
            color: '#e1e1e6',
            marginTop: '20px'
        }}>
            <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#f7f7f8' }}>🎨 Personalização do Avatar</h3>
            <p style={{ fontSize: '14px', color: '#a8a8b3', marginBottom: '16px' }}>
                Escolha os acessórios disponíveis para o seu avatar:
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {accessories.map((item) => (
                    <button
                        key={item}
                        onClick={() => setSelectedAccessory(item)}
                        style={{
                            backgroundColor: selectedAccessory === item ? '#8257e5' : '#29292e',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 14px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: selectedAccessory === item ? 'bold' : 'normal'
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <p style={{ marginTop: '14px', fontSize: '13px', color: '#00b37e' }}>
                Selecionado atualmente: <strong>{selectedAccessory}</strong>
            </p>
        </div>
    );
}

export default AvatarCustomization;