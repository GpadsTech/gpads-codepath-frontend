import React from 'react';

export function Profile() {
    return (
        <div style={{ color: '#fff', maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '10px' }}>Meu Perfil</h2>
            <p style={{ color: '#a0a0c0', marginBottom: '30px' }}>
                Gerencia as informações da sua conta e dados pessoais.
            </p>

            <div style={{ 
                background: '#1e1e38', 
                padding: '25px', 
                borderRadius: '8px',
                border: '1px solid #333357'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' }}>
                    <div style={{ 
                        width: '70px', 
                        height: '70px', 
                        background: '#6c63ff', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '24px', 
                        fontWeight: 'bold' 
                    }}>
                        S
                    </div>
                    <div>
                        <h3 style={{ fontSize: '18px' }}>Samara Jovino</h3>
                        <p style={{ fontSize: '14px', color: '#a0a0c0' }}>samaramelosa@gmail.com</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ background: '#252542', padding: '15px', borderRadius: '6px' }}>
                        <span style={{ fontSize: '12px', color: '#a0a0c0', display: 'block', marginBottom: '4px' }}>Cargo / Função</span>
                        <span style={{ fontWeight: '500' }}>Desenvolvedora Frontend / Mentora STEM</span>
                    </div>
                    <div style={{ background: '#252542', padding: '15px', borderRadius: '6px' }}>
                        <span style={{ fontSize: '12px', color: '#a0a0c0', display: 'block', marginBottom: '4px' }}>Branch de Trabalho</span>
                        <span style={{ fontWeight: '500', color: '#2ecc71' }}>feature/login-e-componentes</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;