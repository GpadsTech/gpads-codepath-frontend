/**
 * Cliente HTTP central da aplicação.
 *
 * Responsável por realizar chamadas à API do backend.
 *
 * Todas as requisições passam por este arquivo para manter
 * um único padrão de comunicação com o backend.
 *
 * O token Firebase é enviado no cabeçalho Authorization
 * quando existe um usuário autenticado.
 */

import { auth } from "../firebase/firebaseAuth";

const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint, options = {}) {

    const user = auth.currentUser;

    const token = user
        ? await user.getIdToken()
        : null;

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers,
        }
    );

    if (!response.ok) {
        throw new Error(
            `Erro na API: ${response.status}`
        );
    }

    return response.json();
}