import { useEffect, useState } from "react";
import { useAuth } from "./useAuth.js";
import { UserService } from "../domain/services/UserService.js";
import { UserApi } from "../infrastructure/api/userApi.js";

/** Perfil do usuário logado. Devolve { user, loading, error }. */
export function useUser() {
    const { user: authUser, loading: authLoading } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading) return;          // Firebase ainda confirmando o login

        if (!authUser) {                  // ninguém logado
            setLoading(false);
            return;
        }

        setLoading(true);
        new UserService(new UserApi())
            .getMe()
            .then(setUser)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [authUser?.uid, authLoading]);

    return { user, loading, error };
}