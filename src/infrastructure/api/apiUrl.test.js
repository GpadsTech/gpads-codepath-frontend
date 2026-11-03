import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeApiUrl } from "./apiUrl.js";

test("normaliza a URL antes de concatenar a rota de autenticação", () => {
    const base = "https://gpads-codepath-backend.onrender.com/api";
    for (const value of [base, `${base} `, ` ${base}\n`, `${base}/`, `${base} / `, `${base}%20/`]) {
        assert.equal(`${normalizeApiUrl(value)}/auth/me/`, `${base}/auth/me/`);
    }
});

test("preserva o fallback local", () => {
    assert.equal(normalizeApiUrl(undefined), "http://localhost:8000/api");
    assert.equal(normalizeApiUrl(""), "http://localhost:8000/api");
});
