import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiClient } from '../../infrastructure/api/apiClient';
import { useAuth } from '../../hooks/useAuth';

const api = new ApiClient();

export function Reports() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api.get('/reports/')
      .then((data) => {
        if (active) {
          // Garante que se a API retornar algo inesperado, tratamos como array
          setReports(Array.isArray(data) ? data : data?.results || []);
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Variável segura para evitar erros de leitura antes dos dados chegarem
  const reportsList = Array.isArray(reports) ? reports : [];

  return (
    <div className="cp-page">
      <div className="cp-welcome">
        <div>
          <h2>Relatórios e Entregas</h2>
          <p className="cp-muted">Acompanhe o status das suas submissões e avaliações.</p>
        </div>
        <Link className="cp-link" to="/dashboard">← Voltar ao Dashboard</Link>
      </div>

      {error && <p role="alert" className="cp-notice">{error}</p>}
      {loading && <p className="cp-muted">Carregando relatórios...</p>}

      {!loading && (
        <section className="cp-panel cp-accent-blue" style={{ marginTop: '1.5rem' }}>
          <h3><span>📋</span> Histórico de Envios</h3>
          
          {reportsList.length === 0 ? (
            <p className="cp-muted" style={{ marginTop: '1rem' }}>
              Nenhum relatório encontrado ou enviado até o momento.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
              {reportsList.map((report, index) => (
                <div key={report.id || index} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                  <strong>{report.title || `Entrega #${index + 1}`}</strong>
                  <p className="cp-muted" style={{ fontSize: '0.9rem', marginTop: '0.3rem' }}>
                    Status: {report.status || 'Em análise'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Reports;