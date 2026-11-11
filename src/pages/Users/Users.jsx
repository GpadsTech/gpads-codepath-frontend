import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ApiClient } from '../../infrastructure/api/apiClient';

const api = new ApiClient();

export function Users() {
  const { user } = useAuth();
  // Conforme o alinhamento, apenas admin e student existem oficialmente na plataforma
  const allowed = ['admin', 'student'].includes(user?.role);
  const canCreateAdmin = ['admin'].includes(user?.role);

  const empty = { name: '', role: 'student', cellId: '', email: '', password: '' };
  
  const [form, setForm] = useState(empty);
  const [users, setUsers] = useState([]);
  const [cells, setCells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!allowed) return;
    let active = true;

    Promise.all([api.get('/students/'), api.get('/cells/')])
      .then(([members, options]) => {
        if (active) {
          setUsers(Array.isArray(members) ? members : members?.results || []);
          const rawCells = Array.isArray(options) ? options : options?.results || [];
          // Corrige o nome da célula para "Aplicações Plataforma" se necessário
          const formattedCells = rawCells.map(c => c.name === 'Aplicativos Plataforma' ? { ...c, name: 'Aplicações Plataforma' } : c);
          setCells(formattedCells);
        }
      })
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [allowed]);

  if (!allowed) return <Navigate to="/dashboard" replace />;

  const change = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return; // Bloqueia cliques repetidos
    
    setBusy(true);
    setError('');
    setMessage('');

    try {
      const member = await api.post('/students/', form);
      setUsers((p) => [member, ...p]);
      setForm(empty);
      setMessage('Conta criada com sucesso. O usuário já pode acessar a plataforma.');
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar usuário. Verifique os campos.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cp-page">
      <p className="cp-eyebrow">ÁREA DO MESTRE / GESTÃO DE ACESSOS</p>
      <h2>Cadastrar usuários</h2>
      <p className="cp-muted">Uma nova pessoa. Uma nova jornada no GPADS.</p>

      <div className="cp-registration-layout">
        <section className="cp-panel cp-accent-pink">
          <h3><span>✚</span> Novo acesso</h3>
          
          <form onSubmit={submit} className="cp-form">
            <label>
              Nome completo
              <input
                required
                maxLength={120}
                autoComplete="name"
                placeholder="Ex: Maria Silva"
                value={form.name}
                onChange={(e) => change('name', e.target.value)}
              />
            </label>

            <div className="cp-form-row">
              <label>
                Tipo de usuário
                <select
                  aria-label="Tipo de usuário"
                  value={form.role}
                  onChange={(e) => change('role', e.target.value)}
                >
                  <option value="student">Estudante</option>
                  {canCreateAdmin && <option value="admin">Administrador</option>}
                </select>
              </label>

              <label>
                Célula oficial
                <select
                  aria-label="Célula"
                  required
                  disabled={loading}
                  value={form.cellId}
                  onChange={(e) => change('cellId', e.target.value)}
                >
                  <option value="">{loading ? 'Carregando células…' : 'Selecione a célula'}</option>
                  {cells.map((c) => (
                    <option value={c.id || c.name} key={c.id || c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              E-mail institucional
              <input
                required
                type="email"
                autoComplete="email"
                placeholder="nome@exemplo.com"
                value={form.email}
                onChange={(e) => change('email', e.target.value)}
              />
            </label>

            <label>
              Senha inicial
              <input
                required
                type="password"
                minLength={8}
                maxLength={128}
                autoComplete="new-password"
                placeholder="Pelo menos 8 caracteres"
                value={form.password}
                onChange={(e) => change('password', e.target.value)}
              />
            </label>

            <button type="submit" disabled={busy || loading || !form.cellId} className="cp-link" style={{ cursor: busy ? 'not-allowed' : 'pointer' }}>
              {busy ? 'Cadastrando…' : '✚ Cadastrar usuário'}
            </button>
          </form>

          {error && <p role="alert" className="cp-notice" style={{ color: '#ff6b6b', marginTop: '1rem' }}>{error}</p>}
          {message && <p role="status" className="cp-notice" style={{ marginTop: '1rem' }}>{message}</p>}
        </section>

        <aside className="cp-panel cp-accent-blue">
          <h3><span>◇</span> Cada papel, uma missão</h3>
          <div className="cp-role-description">
            <span className="cp-badge">ESTUDANTE</span>
            <p>Envia relatórios, recebe feedback e acompanha sua evolução na célula.</p>
          </div>
          {canCreateAdmin && (
            <div className="cp-role-description">
              <span className="cp-badge">ADMINISTRADOR</span>
              <p>Gerencia acessos do sistema, avalia entregas e coordena o repositório.</p>
            </div>
          )}
          <p className="cp-muted" style={{ marginTop: '1rem' }}>As células são restritas às opções oficiais do GPADS.</p>
        </aside>
      </div>

      <section className="cp-panel" style={{ marginTop: '1.5rem' }}>
        <h3>Usuários cadastrados <span className="cp-count">{users.length}</span></h3>
        {loading ? (
          <p className="cp-muted">Carregando usuários…</p>
        ) : users.length ? (
          <div className="cp-table-scroll">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Nome / e-mail</th>
                  <th>Tipo</th>
                  <th>Célula</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id || u.email}>
                    <td>
                      <strong>{u.name}</strong>
                      <p className="cp-muted">{u.email}</p>
                    </td>
                    <td>
                      <span className="cp-badge">
                        {{ admin: 'Administrador', student: 'Estudante', user: 'Estudante' }[u.role] || u.role}
                      </span>
                    </td>
                    <td>{cells.find((c) => c.id === u.cellId || c.name === u.cellId)?.name || u.cellId || 'Não informada'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="cp-muted">Nenhum usuário cadastrado.</p>
        )}
      </section>
    </div>
  );
}

export default Users;