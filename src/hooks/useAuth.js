import { useEffect, useState } from "react";
import {
    loginUser as login,
    logoutUser as logout,
    observeAuthState,
} from "../infrastructure/firebase/firebaseAuth.js";

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