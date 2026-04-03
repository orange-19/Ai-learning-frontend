const BASE_URL = "http://localhost:8080/";

export async function getUserProfileByName(name) {
    const res = await fetch(
        `${BASE_URL}get-profile/${name}`,   // fix: template literal + no double slash
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }  // fix: lowercase 'a'
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch profile");
    }

    return res.json();
}