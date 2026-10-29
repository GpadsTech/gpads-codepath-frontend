import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PixelAvatar } from '../../components/avatar/PixelAvatar';
import { AVATAR_ITEMS_CATALOG } from '../../components/avatar/PixelItems';

export function Avatar() {
    const { user, updateUserAvatar } = useAuth();

    const currentEquipped = user?.equippedItem || 'Chapéu CodePath';
    const currentGender = user?.gender || 'female';
    const currentSkinTone = user?.skinTone || 'light';
    const userLevel = user?.level || 1;
    const userPoints = user?.points || 0;

    const handleEquip = (itemName) => {
        if (updateUserAvatar) {
            updateUserAvatar({ equippedItem: itemName });
        }
    };

    const handleUpdateCustomization = (changes) => {
        if (updateUserAvatar) {
            updateUserAvatar(changes);
        }
    };

    return (
        <div style={{ color: '#fff', maxWidth: '850px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '16px', color: '#ff007f', marginBottom: '8px', fontFamily: 'var(--font-pixel, monospace)' }}>
                PERSONALIZAÇÃO DO AVATAR
            </h2>
            <p style={{ color: '#8e95b3', marginBottom: '24px', fontSize: '13px' }}>
                Personaliza o teu avatar conforme ganhas pontos e sobes de nível nas missões do CodePath.
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

                {/* PREVIEW DO AVATAR PIXEL ART */}
                <div style={{
                    background: '#15182e',
                    padding: '24px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    flex: '1',
                    minWidth: '280px',
                    border: '1px solid #ff007f',
                    boxShadow: '0 0 15px rgba(255, 0, 127, 0.2)'
                }}>
                    <div style={{ margin: '0 auto 15px', display: 'flex', justifyContent: 'center' }}>
                        <PixelAvatar
                            size={160}
                            gender={currentGender}
                            skinTone={currentSkinTone}
                            equippedItem={currentEquipped}
                        />
                    </div>

                    <h3 style={{ fontSize: '12px', color: '#00f0ff', fontFamily: 'var(--font-pixel, monospace)' }}>
                        TEU AVATAR
                    </h3>
                    <p style={{ fontSize: '11px', color: '#8e95b3', marginTop: '6px' }}>
                        EQUIPADO: <strong style={{ color: '#ffcc00' }}>{currentEquipped}</strong>
                    </p>

                    <div style={{ borderTop: '1px dashed #2b2e4a', margin: '16px 0' }} />

                    {/* BOTÕES DE CABELO E TOM DE PELE */}
                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                            <span style={{ fontSize: '10px', color: '#a0a0c0', fontFamily: 'var(--font-pixel, monospace)', display: 'block', marginBottom: '6px' }}>
                                ESTILO / CABELO:
                            </span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => handleUpdateCustomization({ gender: 'female' })}
                                    style={{
                                        flex: 1,
                                        padding: '6px',
                                        fontSize: '10px',
                                        background: currentGender === 'female' ? '#ff007f' : '#0b0c16',
                                        color: '#fff',
                                        border: '1px solid #ff007f',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-pixel, monospace)'
                                    }}
                                >
                                    👩 Longo (Vermelho)
                                </button>
                                <button
                                    onClick={() => handleUpdateCustomization({ gender: 'male' })}
                                    style={{
                                        flex: 1,
                                        padding: '6px',
                                        fontSize: '10px',
                                        background: currentGender === 'male' ? '#00f0ff' : '#0b0c16',
                                        color: currentGender === 'male' ? '#000' : '#fff',
                                        border: '1px solid #00f0ff',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-pixel, monospace)'
                                    }}
                                >
                                    👨 Curto (Azul)
                                </button>
                            </div>
                        </div>

                        <div>
                            <span style={{ fontSize: '10px', color: '#a0a0c0', fontFamily: 'var(--font-pixel, monospace)', display: 'block', marginBottom: '6px' }}>
                                TOM DE PELE:
                            </span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {[
                                    { id: 'light', name: 'Claro', color: '#fde2d4' },
                                    { id: 'medium', name: 'Médio', color: '#d99b6c' },
                                    { id: 'dark', name: 'Escuro', color: '#734429' }
                                ].map((skin) => (
                                    <button
                                        key={skin.id}
                                        onClick={() => handleUpdateCustomization({ skinTone: skin.id })}
                                        style={{
                                            flex: 1,
                                            padding: '6px',
                                            fontSize: '10px',
                                            background: currentSkinTone === skin.id ? '#ffcc00' : '#0b0c16',
                                            color: currentSkinTone === skin.id ? '#000' : '#fff',
                                            border: `1px solid ${skin.color}`,
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '4px',
                                            fontFamily: 'var(--font-pixel, monospace)'
                                        }}
                                    >
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: skin.color }} />
                                        {skin.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* CATÁLOGO DE ITENS */}
                <div style={{
                    background: '#15182e',
                    padding: '24px',
                    borderRadius: '8px',
                    flex: '2',
                    minWidth: '320px',
                    border: '1px solid #2b2e4a'
                }}>
                    <h3 style={{ fontSize: '11px', fontFamily: 'var(--font-pixel, monospace)', color: '#ffcc00', marginBottom: '16px' }}>
                        CATÁLOGO DE ITENS
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {AVATAR_ITEMS_CATALOG.map((item) => {
                            const isUnlocked = userLevel >= item.requiredLevel && userPoints >= item.requiredPoints;
                            const isEquipped = currentEquipped === item.name || currentEquipped === item.id;

                            return (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: '#0b0c16',
                                    padding: '14px 16px',
                                    borderRadius: '6px',
                                    border: isEquipped ? '1px solid #ff007f' : '1px solid #2b2e4a',
                                    opacity: isUnlocked ? 1 : 0.6
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>{item.name}</p>
                                            {!isUnlocked && (
                                                <span style={{ fontSize: '10px', background: '#334155', color: '#cbd5e1', padding: '1px 6px', borderRadius: '3px' }}>
                                                    🔒 Nível {item.requiredLevel}
                                                </span>
                                            )}
                                        </div>
                                        <span style={{ fontSize: '11px', color: '#8e95b3' }}>{item.type}</span>
                                    </div>

                                    <button
                                        disabled={!isUnlocked}
                                        onClick={() => handleEquip(item.name)}
                                        style={{
                                            background: isEquipped
                                                ? 'linear-gradient(90deg, #ff007f, #8b5cf6)'
                                                : isUnlocked
                                                    ? '#15182e'
                                                    : '#1e293b',
                                            color: isUnlocked ? '#fff' : '#64748b',
                                            border: isEquipped ? 'none' : isUnlocked ? '1px solid #00f0ff' : '1px solid #475569',
                                            padding: '8px 14px',
                                            borderRadius: '4px',
                                            cursor: isUnlocked ? 'pointer' : 'not-allowed',
                                            fontSize: '10px',
                                            fontFamily: 'var(--font-pixel, monospace)',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {isEquipped ? 'EQUIPADO' : isUnlocked ? 'EQUIPAR' : `REQUER NÍVEL ${item.requiredLevel}`}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Avatar;