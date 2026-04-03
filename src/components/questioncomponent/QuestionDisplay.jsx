import { useState } from "react";
import { useQuestion } from "../../context/QuestionContext";

export default function QuestionDisplay() {
    const {
        data, loading, error,
        submitAnswers, evalResult, evalLoading, evalError,
    } = useQuestion();

    // selectedAnswers = { [questionid]: "A" | "B" | "C" | "D" }
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    if (loading) return <p>Loading questions...</p>;
    if (error)   return <p className="error">{error}</p>;
    if (!data.success || data.questions.length === 0) return null;

    function handleSelect(questionid, optionKey) {
        if (submitted) return; // lock after submit
        setSelectedAnswers(prev => ({ ...prev, [questionid]: optionKey }));
    }

    function handleSubmit() {
        const allAnswered = data.questions.every(q => selectedAnswers[q.questionid]);
        if (!allAnswered) {
            alert("Please answer all questions before submitting.");
            return;
        }

        // Build answers array matching EvaluateRequest.Answer[]
        const answers = data.questions.map(q => ({
            questionid:    q.questionid,
            chosenoption:  selectedAnswers[q.questionid],
        }));

        submitAnswers({
            username:            data.assessment.username,
            programminglanguage: data.assessment.programminglanguage,
            answers,
        });

        setSubmitted(true);
    }

    const answeredCount = Object.keys(selectedAnswers).length;
    const total         = data.questions.length;

    return (
        <div className="question-display">

            {/* Assessment header */}
            <div className="assessment-info">
                <span>{data.assessment.programminglanguage}</span>
                <span>{data.assessment.difficultylevel}</span>
                <span>{total} questions</span>
                {!submitted && (
                    <span style={{ marginLeft: "auto", fontSize: "12px", color: "#888" }}>
                        {answeredCount}/{total} answered
                    </span>
                )}
            </div>

            {/* Questions */}
            {data.questions.map((q) => {
                const chosen = selectedAnswers[q.questionid];

                return (
                    <div key={q.questionid} className="question-card">
                        <p className="question-text">
                            {q.questionno}. {q.question}
                        </p>
                        <ul className="options-list">
                            {Object.entries(q.options).map(([key, val]) => {
                                const isChosen = chosen === key;
                                return (
                                    <li
                                        key={key}
                                        onClick={() => handleSelect(q.questionid, key)}
                                        className={`option-item ${isChosen ? "option-selected" : ""} ${submitted ? "option-locked" : ""}`}
                                    >
                                        <span className="option-key">{key}.</span> {val}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}

            {/* Submit button */}
            {!submitted && (
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={evalLoading}
                >
                    {evalLoading ? "Submitting..." : "Submit Answers"}
                </button>
            )}

            {/* Evaluation result */}
            {evalError && <p className="error">{evalError}</p>}
            {evalResult && (
                <div className="eval-result">
                    <h3>Result</h3>
                    <pre>{JSON.stringify(evalResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}