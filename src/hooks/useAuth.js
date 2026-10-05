/**
 * Hook responsável por disponibilizar o estado de autenticação
 * para os componentes React.
 *
 * Ele observa o Firebase Authentication e informa se existe
 * um usuário autenticado.
 */

import { useEffect, useState } from "react";

import {
    auth,
    login,
    logout,
    observeAuthState,
} from "../infrastructure/firebase/firebaseAuth";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = observeAuthState((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
    };
}