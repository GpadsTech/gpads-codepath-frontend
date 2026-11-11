import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ApiClient } from '../../infrastructure/api/apiClient';
import { PixelAvatar } from '../../components/avatar/PixelAvatar';

const api = new ApiClient();

// Células oficiais atualizadas conforme o repositório
const OFFICIAL_CELLS = [
  { id: 'educacao-comunicação-ciberescola', name: 'educação-comunicação-ciberescola' },
  { id: 'gestao-projetos-entregas', name: 'gestao-projetos-entregas' },
  { id: 'hardware', name: 'hardware' },
  { id: 'ia-ambiental', name: 'ia-ambiental' },
  { id: 'inovacao-negocios', name: 'inovação-negócios' },
  { id: 'pesquisa-desenvolvimento', name: 'pesquisa-desenvolvimento' },
  { id: 'plataforma-engenharia-dados-aplicacoes', name: 'plataforma-engenharia-dados-aplicacoes' }
];

export function Profile() {
  const { user, logout } = useAuth();
  const [cells, setCells] = useState(OFFICIAL_CELLS);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    cellId: user?.cellId || '',
    role: user?.role || 'student',
    email: user?.email || '',
    newPassword: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    
    api.get('/cells')
      .then((cellsRes) => {
        if (active && Array.isArray(cellsRes) && cellsRes.length > 0) {
          setCells(cellsRes);
        }
      })
      .catch(() => {});

    api.get('/profile')
      .then((profileRes) => {
        if (active && profileRes) {
          setProfileData((prev) => ({
            ...prev,
            name: profileRes.name || user?.name || '',
            cellId: profileRes.cellId || user?.cellId || '',
            role: profileRes.role || user?.role || 'student',
            email: profileRes.email || user?.email || '',
          }));
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [user]);

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const payload = {
        name: profileData.name,
        cellId: profileData.cellId,
      };
      if (profileData.email) {
        payload.email = profileData.email;
      }
      if (profileData.newPassword) {
        payload.password = profileData.newPassword;
      }

      await api.post('/profile', payload);

      setMessage('Informações e credenciais atualizadas com sucesso!');
      setProfileData((prev) => ({ ...prev, newPassword: '' }));
    } catch (err) {
      setError(err.message || 'Erro ao atualizar perfil.');
    } finally {
      setSaving(false);
    }
  };

  const getRoleDetails = (role) => {
    switch (role) {
      case 'admin':
        return {
          title: 'Administrador',
          description: 'Gerencia acessos do sistema, avalia entregas das células e coordena o repositório no GitHub.'
        };
      case 'student':
      case 'user':
      default:
        return {
          title: 'Estudante',
          description: 'Implementa componentes, envia relatórios de progresso e participa ativamente da célula.'
        };
    }
  };

  const currentRoleInfo = getRoleDetails(profileData.role);

  return (
    <div className="cp-page">
      <div className="cp-welcome">
        <div>
          <h2>Meu Perfil</h2>
          <p className="cp-muted">Gerencie suas informações pessoais, e-mail, senha e célula.</p>
        </div>
        <Link className="cp-link" to="/dashboard">← Voltar ao Dashboard</Link>
      </div>

      <div className="cp-panel cp-accent-blue" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <span className="cp-badge cp-success" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
              {currentRoleInfo.title}
            </span>
            <h3 style={{ marginTop: '0.4rem', fontSize: '1.6rem' }}>{profileData.name || 'Usuário GPADS'}</h3>
            <p className="cp-muted" style={{ marginTop: '0.2rem' }}>{profileData.email || user?.email}</p>
            
            <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', borderLeft: '3px solid var(--cp-accent, #3b82f6)' }}>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                <b>Papel na plataforma:</b> {currentRoleInfo.description}
              </p>
            </div>
          </div>
          <div>
            <PixelAvatar avatarId={user?.avatarId} size={90} />
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '2rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontWeight: 'bold' }}>
            Nome completo
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              placeholder="Digite seu nome completo"
              style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'inherit', fontSize: '1rem' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontWeight: 'bold' }}>
            E-mail de acesso <span style={{ fontWeight: 'normal', fontSize: '0.85rem', opacity: 0.7 }}>(opcional se não for alterar)</span>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="seu.email@exemplo.com"
              style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'inherit', fontSize: '1rem' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontWeight: 'bold' }}>
            Nova senha <span style={{ fontWeight: 'normal', fontSize: '0.85rem', opacity: 0.7 }}>(deixe em branco para manter a atual)</span>
            <input
              type="password"
              value={profileData.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              minLength={8}
              placeholder="Mínimo de 8 caracteres"
              style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'inherit', fontSize: '1rem' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontWeight: 'bold' }}>
            Tipo de conta na plataforma <span style={{ fontWeight: 'normal', fontSize: '0.85rem', opacity: 0.7 }}>(somente leitura)</span>
            <select
              value={profileData.role}
              disabled={true}
              style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: '1rem', cursor: 'not-allowed' }}
            >
              <option value="student">Estudante</option>
              <option value="admin">Administrador</option>
            </select>
            <span style={{ fontSize: '0.8rem', color: 'rgba(248, 113, 113, 0.8)', marginTop: '-0.2rem' }}>
              🔒 O tipo de conta só pode ser alterado por um administrador.
            </span>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontWeight: 'bold' }}>
            Célula Oficial
            <select
              value={profileData.cellId}
              onChange={(e) => handleChange('cellId', e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'inherit', fontSize: '1rem' }}
            >
              <option value="" style={{ background: '#1e1e2f', color: '#fff' }}>Selecione a sua célula</option>
              {cells.map((c) => (
                <option key={c.id || c.name} value={c.id || c.name} style={{ background: '#1e1e2f', color: '#fff' }}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
            <button type="submit" disabled={saving} className="cp-link" style={{ border: 'none', cursor: 'pointer', padding: '0.75rem 1.5rem' }}>
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <Link to="/avatar" style={{ color: 'var(--cp-accent, #3b82f6)', textDecoration: 'underline', fontSize: '0.95rem' }}>
              Personalizar meu avatar →
            </Link>
          </div>
        </form>

        {error && <p role="alert" className="cp-notice" style={{ color: '#ff6b6b', marginTop: '1rem' }}>{error}</p>}
        {message && <p role="status" className="cp-notice" style={{ color: '#4ade80', marginTop: '1rem' }}>{message}</p>}

        <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span className="cp-muted" style={{ fontSize: '0.85rem' }}>Sessão ativa no ambiente seguro GPADS CodePath.</span>
          <button
            onClick={logout}
            style={{ 
              background: 'transparent', 
              color: '#f87171', 
              border: '1px solid rgba(248, 113, 113, 0.4)', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(248, 113, 113, 0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;