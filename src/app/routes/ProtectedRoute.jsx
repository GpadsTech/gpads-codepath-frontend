/**
 * Protege páginas que exigem autenticação.
 *
 * Usuários não autenticados são redirecionados para o Login.
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}