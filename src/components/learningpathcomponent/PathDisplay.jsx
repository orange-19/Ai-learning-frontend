import { useDiagnostic } from "../../context/DiagnosticContext";

export default function PathDisplay() {
    const { pathData, evalResult, reset } = useDiagnostic();
    const lp = pathData.learningpath;

    return (
        <div className="question-display">

            {/* Evaluation summary — replaces the raw JSON pre block */}
            {evalResult && evalResult.evaluation && (
                <div className="eval-summary">
                    <div className="eval-header">
                        <div>
                            <p className="eval-name">{evalResult.evaluation.username}</p>
                            <p className="eval-lang">{evalResult.evaluation.programminglanguage}</p>
                        </div>
                        <div className="score-circle">
                            <span className="score-number">{evalResult.evaluation.score}</span>
                            <span className="score-label">score</span>
                        </div>
                    </div>

                    <div className="eval-stats">
                        <div className="stat-box correct">
                            <span className="stat-num">{evalResult.evaluation.correctcount}</span>
                            <span className="stat-lbl">Correct</span>
                        </div>
                        <div className="stat-box wrong">
                            <span className="stat-num">{evalResult.evaluation.wrongcount}</span>
                            <span className="stat-lbl">Wrong</span>
                        </div>
                        <div className="stat-box total">
                            <span className="stat-num">{evalResult.evaluation.totalquestions}</span>
                            <span className="stat-lbl">Total</span>
                        </div>
                        <div className="stat-box level">
                            <span className="stat-num" style={{ fontSize: "14px" }}>
                                {evalResult.evaluation.skilllevel}
                            </span>
                            <span className="stat-lbl">Skill level</span>
                        </div>
                    </div>

                    {/* Weak topics */}
                    {evalResult.evaluation.weaktopics?.length > 0 && (
                        <div style={{ marginTop: "14px" }}>
                            <p className="topic-label">Weak topics</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                                {evalResult.evaluation.weaktopics.map(t => (
                                    <span key={t} className="topic-pill weak-pill">{t}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Strong topics */}
                    {evalResult.evaluation.strongtopics?.length > 0 && (
                        <div style={{ marginTop: "12px" }}>
                            <p className="topic-label">Strong topics</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                                {evalResult.evaluation.strongtopics.map(t => (
                                    <span key={t} className="topic-pill strong-pill">{t}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Wrong questions review */}
                    {evalResult.wrongquestions?.length > 0 && (
                        <div style={{ marginTop: "20px" }}>
                            <p className="topic-label" style={{ marginBottom: "10px" }}>
                                Questions to review
                            </p>
                            {evalResult.wrongquestions.map(q => (
                                <div key={q.questionid} className="wrong-question-card">
                                    <p className="wrong-q-text">
                                        {q.questionno}. {q.question}
                                    </p>
                                    <div className="wrong-q-row">
                                        <span className="wrong-badge">Your answer</span>
                                        <span className="wrong-val">{q.chosenoption} — {q.chosenoption === "—" ? "not answered" : ""}</span>
                                    </div>
                                    <div className="wrong-q-row">
                                        <span className="correct-badge">Correct</span>
                                        <span className="correct-val">{q.correctoption}. {q.correctanswer}</span>
                                    </div>
                                    <span className="topic-tag">{q.topic}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Learning path */}
            {pathData.success && pathData.days?.length > 0 && (
                <>
                    <div className="path-summary" style={{ marginTop: "24px" }}>
                        <h2 style={{ margin: "0 0 6px", fontSize: "18px" }}>
                            Your learning path — {lp.programminglanguage}
                        </h2>
                        <p className="path-goal">Goal: {lp.goal}</p>
                        <div className="assessment-info">
                            <span>{lp.totaldays} days</span>
                            <span>{lp.dailyhourstostudy} hrs/day</span>
                            <span>Score: {lp.diagnosticscore}</span>
                        </div>

                        <div className="topics-row">
                            {lp.weaktopics?.length > 0 && (
                                <div className="topic-group">
                                    <p className="topic-label">Weak topics</p>
                                    {lp.weaktopics.map(t => (
                                        <span key={t} className="topic-pill weak-pill">{t}</span>
                                    ))}
                                </div>
                            )}
                            {lp.strongtopics?.length > 0 && (
                                <div className="topic-group">
                                    <p className="topic-label">Strong topics</p>
                                    {lp.strongtopics.map(t => (
                                        <span key={t} className="topic-pill strong-pill">{t}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {pathData.days.map(d => (
                        <div key={d.day} className="question-card">
                            <div className="day-header">
                                <span className="day-badge">Day {d.day}</span>
                                <span className="day-focus">{d.focusarea}</span>
                                <span className="day-hours">{d.estimatedhours}h</span>
                            </div>
                            <p className="question-text">{d.topic}</p>
                            {d.subtopics?.length > 0 && (
                                <ul className="options-list">
                                    {d.subtopics.map((s, i) => <li key={i}>{s}</li>)}
                                </ul>
                            )}
                            <p className="day-exercise">Exercise: {d.exercise}</p>
                            {d.resources?.length > 0 && (
                                <div className="resources">
                                    <p className="topic-label">Resources</p>
                                    {d.resources.map((r, i) => (
                                        <a key={i} href={r} target="_blank"
                                           rel="noreferrer" className="resource-link">{r}</a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}

            <button className="submit-btn" onClick={reset} style={{ marginTop: "32px" }}>
                Start over
            </button>
        </div>
    );
}