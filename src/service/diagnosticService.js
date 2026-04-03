const BASE_URL = "http://localhost:8080/";

// Step 1 — generate diagnostic questions
export async function generateDiagnostic(requestBody) {
    const res = await fetch(`${BASE_URL}generate-diagnostic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });
    if (!res.ok) throw new Error(`Failed to generate diagnostic: ${res.status}`);
    return res.json();
}

// Step 2 — evaluate answers
export async function evaluateDiagnostic({ username, programminglanguage, answers }) {
    const res = await fetch(`${BASE_URL}evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, programminglanguage, answers }),
    });
    if (!res.ok) throw new Error(`Failed to evaluate: ${res.status}`);
    return res.json();
}

// Step 3 — generate learning path using username from evaluate response
export async function generatePath(requestBody) {
    const res = await fetch(`${BASE_URL}generate-path`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });
    if (!res.ok) throw new Error(`Failed to generate path: ${res.status}`);
    return res.json();
}