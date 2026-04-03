import { createContext, useContext, useState } from "react";
import { createQuestionResponse } from "../model/Question";
import { generateQuestions } from "../service/questionService";

const QuestionContext = createContext(null);

export function QuestionProvider({ children }) {
    const [data, setData]       = useState(createQuestionResponse());
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);

    async function fetchQuestions(formData) {
        setLoading(true);
        setError(null);
        try {
            const res = await generateQuestions(formData);
            setData(createQuestionResponse(res));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <QuestionContext.Provider value={{ data, loading, error, fetchQuestions }}>
            {children}
        </QuestionContext.Provider>
    );
}

export function useQuestion() {
    const ctx = useContext(QuestionContext);
    if (!ctx) throw new Error("useQuestion must be inside QuestionProvider");
    return ctx;
}