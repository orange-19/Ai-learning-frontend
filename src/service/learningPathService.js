const BASE_URL = "http://localhost:8080/";

export async function generatePath(requestBody) {
    const res = await fetch(`${BASE_URL}generate-path`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
        throw new Error(`Failed to generate path: ${res.status}`);
    }

    return res.json();
}