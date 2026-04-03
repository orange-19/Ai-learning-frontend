const BASE_URL = "http://localhost:8080";

export async function generateQuestions({ username, programminglanguage, difficultylevel, questionneededforassessment }) {
    const res = await fetch(`${BASE_URL}/generate-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            programminglanguage,
            difficultylevel,
            questionneededforassessment,
        }),
    });

    if (!res.ok) {
        throw new Error(`Failed to generate questions: ${res.status}`);
    }

    return res.json(); // returns QuestionResponse shape
}

export async function evaluateAnswers({ username, programminglanguage, answers }) {
    const res = await fetch(`${BASE_URL}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, programminglanguage, answers }),
        // answers = [{ questionid: 1, chosenoption: "A" }, ...]
    });
    if (!res.ok) throw new Error(`Failed to evaluate: ${res.status}`);
    return res.json();
}