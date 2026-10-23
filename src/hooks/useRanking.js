import { useEffect, useState } from "react";
import { useAuth } from "./useAuth.js";
import { RankingService } from "../domain/services/RankingService.js";
import { RankingApi } from "../infrastructure/api/rankingApi.js";

/** Ranking ("all" ou "week"). Devolve { ranking, loading, error }. */
export function useRanking(period = "all") {
    const { user: authUser, loading: authLoading } = useAuth();
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading) return;

        if (!authUser) {
            setLoading(false);
            return;
        }

        setLoading(true);
        new RankingService(new RankingApi())
            .getRanking(period)
            .then(setRanking)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [authUser?.uid, authLoading, period]);

    return { ranking, loading, error };
}