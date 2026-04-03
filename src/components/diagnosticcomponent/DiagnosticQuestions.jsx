import { useState } from "react";
import { useDiagnostic } from "../../context/DiagnosticContext";

export default function DiagnosticQuestions() {
    const { questions, submitAnswers, loading, error } = useDiagnostic();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const total        = questions.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    function handleSelect(questionid, optionKey) {
        if (submitted) return;
        setSelectedAnswers(prev => ({ ...prev, [questionid]: optionKey }));
    }

    function handleSubmit() {
        if (answeredCount < total) {
            alert("Please answer all questions before submitting.");
            return;
        }

        // Build Answer[] matching EvaluateRequest.Answer shape
        const answers = questions.questions.map(q => ({
            questionid:   q.questionid,
            chosenoption: selectedAnswers[q.questionid],
        }));

        setSubmitted(true);
        submitAnswers(answers);
    }

    return (
        <div className="question-display">
            <div className="assessment-info">
                <span>{questions.assessment.programminglanguage}</span>
                <span>{questions.assessment.difficultylevel}</span>
                <span>{total} questions</span>
                {!submitted && (
                    <span style={{ marginLeft: "auto", fontSize: "12px", color: "#888" }}>
                        {answeredCount}/{total} answered
                    </span>
                )}
            </div>

            {questions.questions.map((q) => {
                const chosen = selectedAnswers[q.questionid];
                return (
                    <div key={q.questionid} className="question-card">
                        <p className="question-text">{q.questionno}. {q.question}</p>
                        <ul className="options-list" style={{ padding: 0 }}>
                            {Object.entries(q.options).map(([key, val]) => (
                                <li
                                    key={key}
                                    onClick={() => handleSelect(q.questionid, key)}
                                    className={`option-item
                                        ${chosen === key ? "option-selected" : ""}
                                        ${submitted ? "option-locked" : ""}
                                    `}
                                >
                                    <span className="option-key">{key}.</span> {val}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}

            {error && <p className="error">{error}</p>}

            {!submitted && (
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Evaluating..." : "Submit Answers"}
                </button>
            )}

            {submitted && loading && (
                <p style={{ textAlign: "center", color: "#888" }}>
                    Generating your personalised learning path...
                </p>
            )}
        </div>
    );
}