import { useQuestion } from "../../context/QuestionContext";

export default function QuestionDisplay() {
    const { data, loading, error } = useQuestion();

    if (loading) return <p>Loading questions...</p>;
    if (error)   return <p className="error">{error}</p>;
    if (!data.success || data.questions.length === 0) return null;

    return (
        <div className="question-display">
            <div className="assessment-info">
                <span>{data.assessment.programminglanguage}</span>
                <span>{data.assessment.difficultylevel}</span>
                <span>{data.assessment.totalquestions} questions</span>
            </div>

            {data.questions.map((q) => (
                <div key={q.questionid} className="question-card">
                    <p className="question-text">
                        {q.questionno}. {q.question}
                    </p>
                    <ul className="options-list">
                        {Object.entries(q.options).map(([key, val]) => (
                            <li key={key}>
                                <span className="option-key">{key}.</span> {val}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}