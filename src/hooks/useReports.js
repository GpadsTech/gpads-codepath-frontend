import { useEffect, useState } from "react";
import { useAuth } from "./useAuth.js";
import { ReportService } from "../domain/services/ReportService.js";
import { ReportApi } from "../infrastructure/api/reportApi.js";

/** Entregas visíveis ao usuário logado. Devolve { reports, loading, error }. */
export function useReports() {
    const { user: authUser, loading: authLoading } = useAuth();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading) return;

        if (!authUser) {
            setLoading(false);
            return;
        }

        setLoading(true);
        new ReportService(new ReportApi())
            .getAll()
            .then(setReports)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [authUser?.uid, authLoading]);

    return { reports, loading, error };
}