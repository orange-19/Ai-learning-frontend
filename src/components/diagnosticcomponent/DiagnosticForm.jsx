import { useState } from "react";
import { useDiagnostic } from "../../context/DiagnosticContext";

export default function DiagnosticForm() {
    const { startDiagnostic, loading, error } = useDiagnostic();

    const [form, setForm] = useState({
        username:            "",
        programminglanguage: "",
        days:                30,
        goal:                "",
        dailyhourstostudy:   2,
        diagnosticquestions: 5,
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(f => ({
            ...f,
            [name]: (name === "days" || name === "dailyhourstostudy" || name === "diagnosticquestions")
                ? Number(value)
                : value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        startDiagnostic(form);
    }

    return (
        <div style={{ maxWidth: "480px", margin: "32px auto", padding: "0 16px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "24px", color: "#111" }}>
                Diagnostic Assessment
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                <div className="field-group">
                    <label className="field-label">Username</label>
                    <input
                        name="username"
                        placeholder="e.g. Sri"
                        value={form.username}
                        onChange={handleChange}
                        className="field-input"
                        required
                    />
                </div>

                <div className="field-group">
                    <label className="field-label">Programming language</label>
                    <select
                        name="programminglanguage"
                        value={form.programminglanguage}
                        onChange={handleChange}
                        className="field-input"
                        required
                    >
                        <option value="">Select a language</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="C">C</option>
                        <option value="C++">C++</option>
                        <option value="C#">C#</option>
                        <option value="SQL">SQL</option>
                    </select>
                </div>

                <div className="field-group">
                    <label className="field-label">Your goal</label>
                    <input
                        name="goal"
                        placeholder="e.g. Build strong backend development skills"
                        value={form.goal}
                        onChange={handleChange}
                        className="field-input"
                        required
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="field-group">
                        <label className="field-label">Duration (days)</label>
                        <input
                            name="days"
                            type="number"
                            min="7"
                            max="365"
                            value={form.days}
                            onChange={handleChange}
                            className="field-input"
                            required
                        />
                    </div>
                    <div className="field-group">
                        <label className="field-label">Daily study hours</label>
                        <input
                            name="dailyhourstostudy"
                            type="number"
                            min="1"
                            max="12"
                            value={form.dailyhourstostudy}
                            onChange={handleChange}
                            className="field-input"
                            required
                        />
                    </div>
                </div>

                <div className="field-group">
                    <label className="field-label">Number of diagnostic questions</label>
                    <input
                        name="diagnosticquestions"
                        type="number"
                        min="3"
                        max="20"
                        value={form.diagnosticquestions}
                        onChange={handleChange}
                        className="field-input"
                        required
                    />
                    <span className="field-hint">Between 3 and 20</span>
                </div>

                {error && (
                    <p style={{ color: "#c0392b", fontSize: "13px", margin: "0" }}>{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="submit-btn"
                    style={{ marginTop: "8px" }}
                >
                    {loading ? "Generating questions..." : "Start Diagnostic"}
                </button>

            </form>
        </div>
    );
}