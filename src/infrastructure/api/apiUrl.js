// Espaços no fim da variável viram %20 ao concatenar /auth/me/.
export function normalizeApiUrl(value) {
    return (value || "http://localhost:8000/api")
        .trim()
        .replace(/(?:\s|%20|\/)+$/gi, "");
}
