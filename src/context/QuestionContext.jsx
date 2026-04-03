import { createContext, useContext, useState } from "react";
import { createQuestionResponse } from "../model/Question";
import { generateQuestions, evaluateAnswers } from "../service/questionService";

const QuestionContext = createContext(null);

export function QuestionProvider({ children }) {
    const [data, setData]             = useState(createQuestionResponse());
    const [loading, setLoading]       = useState(false);
    const [error, setError]           = useState(null);
    const [evalResult, setEvalResult] = useState(null);
    const [evalLoading, setEvalLoading] = useState(false);
    const [evalError, setEvalError]   = useState(null);

    async function fetchQuestions(formData) {
        setLoading(true);
        setError(null);
        setEvalResult(null); // reset previous evaluation
        try {
            const res = await generateQuestions(formData);
            setData(createQuestionResponse(res));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function submitAnswers({ username, programminglanguage, answers }) {
        setEvalLoading(true);
        setEvalError(null);
        try {
            const res = await evaluateAnswers({ username, programminglanguage, answers });
            setEvalResult(res);
        } catch (err) {
            setEvalError(err.message);
        } finally {
            setEvalLoading(false);
        }
    }

    return (
        <QuestionContext.Provider value={{
            data, loading, error,
            fetchQuestions,
            evalResult, evalLoading, evalError,
            submitAnswers,
        }}>
            {children}
        </QuestionContext.Provider>
    );
}

export function useQuestion() {
    const ctx = useContext(QuestionContext);
    if (!ctx) throw new Error("useQuestion must be inside QuestionProvider");
    return ctx;
}