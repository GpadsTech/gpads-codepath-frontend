import React, { useState } from 'react';

export function Profile() {
    // Simulação do utilizador atual (ex: logado como Desenvolvedor)
    const [isAdmin] = useState(false); // Altere para true se quiser testar como admin

    const [formData, setFormData] = useState({
        name: 'Samara Jovino',
        email: 'samaramelosa@gmail.com',
        password: '',
        userType: 'Desenvolvedor',
        cell: 'Engenharia de Dados'
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Células oficiais exatas conforme a matriz do projeto
    const validCells = [
        'Gestão',
        'IA Ambiental',
        'Hardware',
        'P&D',
        'Aplicações Plataforma',
        'Engenharia de Dados'
    ];

    const validUserTypes = [
        'Desenvolvedor',
        'Administrador',
        'Avaliador'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'O nome completo é obrigatório.';
        if (!formData.email.includes('@')) newErrors.email = 'Insira um e-mail válido.';
        if (formData.password && formData.password.length < 6) {
            newErrors.password = 'A palavra-passe deve ter pelo menos 6 caracteres.';
        }
        if (!formData.cell) newErrors.cell = 'Selecione uma célula válida.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccessMessage('Informações do perfil atualizadas com sucesso!');
        } catch (err) {
            console.error('Erro ao atualizar perfil:', err);
            setErrors({ general: 'Erro ao guardar as alterações. Tente novamente.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ color: '#fff', maxWidth: '800px', margin: '0 auto', paddingBottom: '40px' }}>
            <h2 style={{ marginBottom: '10px' }}>Gestão de Perfil e Contrato</h2>
            <p style={{ color: '#a0a0c0', marginBottom: '30px', fontSize: '14px' }}>
                Consulte e atualize as informações da conta e dados de contrato.
            </p>

            {successMessage && (
                <div style={{ background: '#2ecc7122', border: '1px solid #2ecc71', color: '#2ecc71', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '20px' }}>
                    {successMessage}
                </div>
            )}

            {errors.general && (
                <div style={{ background: '#ff6b6b22', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '20px' }}>
                    {errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ 
                background: '#1e1e38', 
                padding: '30px', 
                borderRadius: '8px',
                border: '1px solid #333357',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                {/* Campo Nome */}
                <div style={{ textAlign: 'left' }}>
                    <label style={{ fontSize: '13px', display: 'block', marginBottom: '6px', color: '#a0a0c0' }}>Nome Completo</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', background: '#252542', border: errors.name ? '1px solid #ff6b6b' : '1px solid #333357', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    />
                    {errors.name && <span style={{ fontSize: '12px', color: '#ff6b6b', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                </div>

                {/* Campo E-mail */}
                <div style={{ textAlign: 'left' }}>
                    <label style={{ fontSize: '13px', display: 'block', marginBottom: '6px', color: '#a0a0c0' }}>E-mail Institucional</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', background: '#252542', border: errors.email ? '1px solid #ff6b6b' : '1px solid #333357', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    />
                    {errors.email && <span style={{ fontSize: '12px', color: '#ff6b6b', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                </div>

                {/* Campo Palavra-passe */}
                <div style={{ textAlign: 'left' }}>
                    <label style={{ fontSize: '13px', display: 'block', marginBottom: '6px', color: '#a0a0c0' }}>Nova Palavra-passe (Opcional)</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Deixe em branco para manter a atual"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', background: '#252542', border: errors.password ? '1px solid #ff6b6b' : '1px solid #333357', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    />
                    <span style={{ fontSize: '11px', color: '#8080a0', marginTop: '4px', display: 'block' }}>Mínimo de 6 caracteres se for alterar.</span>
                    {errors.password && <span style={{ fontSize: '12px', color: '#ff6b6b', marginTop: '4px', display: 'block' }}>{errors.password}</span>}
                </div>

                {/* Tipo de Utilizador (Bloqueado para não-admins por segurança) */}
                <div style={{ textAlign: 'left' }}>
                    <label style={{ fontSize: '13px', display: 'block', marginBottom: '6px', color: '#a0a0c0' }}>Tipo de Utilizador</label>
                    <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        disabled={!isAdmin}
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            borderRadius: '6px', 
                            background: isAdmin ? '#252542' : '#1a1a2e', 
                            border: '1px solid #333357', 
                            color: isAdmin ? '#fff' : '#8080a0', 
                            outline: 'none', 
                            boxSizing: 'border-box',
                            cursor: isAdmin ? 'pointer' : 'not-allowed'
                        }}
                    >
                        {validUserTypes.map((type) => (
                            <option key={type} value={type} style={{ background: '#1e1e38', color: '#fff' }}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {!isAdmin && (
                        <span style={{ fontSize: '11px', color: '#e67e22', marginTop: '4px', display: 'block' }}>
                            A alteração do tipo de utilizador requer privilégios de Administrador.
                        </span>
                    )}
                </div>

                {/* Célula do Projeto (Com as opções exatas do print) */}
                <div style={{ textAlign: 'left' }}>
                    <label style={{ fontSize: '13px', display: 'block', marginBottom: '6px', color: '#a0a0c0' }}>Célula do Projeto</label>
                    <select
                        name="cell"
                        value={formData.cell}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', background: '#252542', border: '1px solid #333357', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    >
                        {validCells.map((cellOption) => (
                            <option key={cellOption} value={cellOption} style={{ background: '#1e1e38', color: '#fff' }}>
                                {cellOption}
                            </option>
                        ))}
                    </select>
                    <span style={{ fontSize: '11px', color: '#8080a0', marginTop: '4px', display: 'block' }}>Selecione uma das células oficiais autorizadas.</span>
                </div>

                {/* Botão de Envio */}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: '10px',
                        width: '100%',
                        padding: '14px',
                        background: '#6c63ff',
                        color: '#fff',
                        border: '2px solid #8b83ff',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        transition: 'background 0.2s'
                    }}
                >
                    {loading ? 'A GUARDAR ALTERAÇÕES...' : 'GUARDAR ALTERAÇÕES'}
                </button>
            </form>
        </div>
    );
}

export default Profile;