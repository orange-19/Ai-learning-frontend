import { useState } from "react";
import { useQuestion } from "../../context/QuestionContext";

export default function QuestionForm() {
    const { fetchQuestions, loading } = useQuestion();

    const [form, setForm] = useState({
        username:                    "",
        programminglanguage:         "",
        difficultylevel:             "",
        questionneededforassessment: 5,
    });

    function handleChange(e) {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetchQuestions(form);
    }

    return (
        <form onSubmit={handleSubmit} className="question-form">
            <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
            />
            <select
                name="programminglanguage"
                value={form.programminglanguage}
                onChange={handleChange}
                required
            >
                <option value="">Select language</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="c++">C++</option>
            </select>
            <select
                name="difficultylevel"
                value={form.difficultylevel}
                onChange={handleChange}
                required
            >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <input
                name="questionneededforassessment"
                type="number"
                min="1"
                max="20"
                value={form.questionneededforassessment}
                onChange={handleChange}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate Questions"}
            </button>
        </form>
    );
}