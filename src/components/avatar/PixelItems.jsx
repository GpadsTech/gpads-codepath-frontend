import React from 'react';

/**
 * CATÁLOGO CENTRAL DE ITENS EM PIXEL ART
 * Para adicionar novos itens futuramente, basta inserir um novo objeto nesta lista.
 */
export const AVATAR_ITEMS_CATALOG = [
    {
        id: 'hat-codepath',
        name: 'Chapéu CodePath',
        type: 'Acessório',
        requiredLevel: 1,      // Liberado desde o Nível 1
        requiredPoints: 0,
        renderLayer: () => (
            <g key="hat-codepath">
                {/* Boné Rosa Choque com Aba Ciano Neon */}
                <path d="M 20,16 L 44,16 L 42,6 L 22,6 Z" fill="#ff007f" stroke="#111118" strokeWidth="2" />
                <rect x="28" y="9" width="8" height="4" fill="#ffffff" rx="1" />
                <rect x="16" y="16" width="32" height="4" fill="#00f0ff" stroke="#111118" strokeWidth="2" rx="1" />
            </g>
        )
    },
    {
        id: 'glasses-tech',
        name: 'Óculos Tech',
        type: 'Acessório',
        requiredLevel: 2,      // Liberado no Nível 2
        requiredPoints: 300,
        renderLayer: () => (
            <g key="glasses-tech">
                {/* Visor Cyberpunk Ciano */}
                <rect x="21" y="23" width="22" height="8" fill="#00f0ff" opacity="0.85" stroke="#111118" strokeWidth="2" rx="2" />
                <rect x="23" y="24" width="7" height="3" fill="#ffffff" opacity="0.8" />
                <rect x="34" y="24" width="7" height="3" fill="#ffffff" opacity="0.8" />
            </g>
        )
    },
    {
        id: 'coat-gpads',
        name: 'Casaco GPADS',
        type: 'Roupa',
        requiredLevel: 3,      // Liberado no Nível 3
        requiredPoints: 750,
        renderLayer: () => (
            <g key="coat-gpads">
                {/* Casaco Roxo e Dourado */}
                <path d="M 17,46 L 24,46 L 26,59 L 17,59 Z" fill="#7c3aed" stroke="#111118" strokeWidth="2" />
                <path d="M 47,46 L 40,46 L 38,59 L 47,59 Z" fill="#7c3aed" stroke="#111118" strokeWidth="2" />
                <rect x="24" y="46" width="2" height="13" fill="#facc15" />
                <rect x="38" y="46" width="2" height="13" fill="#facc15" />
            </g>
        )
    }
];

/**
 * Função utilitária que renderiza a camada do item equipado no avatar
 */
export function renderEquippedItemLayer(equippedNameOrId) {
    if (!equippedNameOrId || equippedNameOrId === "Nenhum") return null;

    const itemFound = AVATAR_ITEMS_CATALOG.find(
        (item) => item.id === equippedNameOrId || item.name === equippedNameOrId
    );

    return itemFound ? itemFound.renderLayer() : null;
}