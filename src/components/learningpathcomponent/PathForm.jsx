import { useState } from "react";
import { useLearningPath } from "../../context/LearningPathContext";

export default function PathForm() {
    const { fetchPath, loading } = useLearningPath();

    const [form, setForm] = useState({
        username:            "",
        programminglanguage: "",
        skilllevel:          "",
        goal:                "",
        dailyhourstostudy:   1,
    });

    function handleChange(e) {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetchPath(form);
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
                name="skilllevel"
                value={form.skilllevel}
                onChange={handleChange}
                required
            >
                <option value="">Select skill level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
            <input
                name="goal"
                placeholder="Your goal (e.g. get a job, build projects)"
                value={form.goal}
                onChange={handleChange}
                required
            />
            <input
                name="dailyhourstostudy"
                type="number"
                min="1"
                max="12"
                placeholder="Daily hours to study"
                value={form.dailyhourstostudy}
                onChange={handleChange}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Generating path..." : "Generate Learning Path"}
            </button>
        </form>
    );
}