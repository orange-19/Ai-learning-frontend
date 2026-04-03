import { createContext, useContext, useState } from "react";
import { createQuestionResponse } from "../model/Question";
import { createPathResponse } from "../model/LearningPath";
import {
    generateDiagnostic,
    evaluateDiagnostic,
    generatePath,
} from "../service/diagnosticService";

// steps: "form" | "questions" | "result" | "path"
const DiagnosticContext = createContext(null);

export function DiagnosticProvider({ children }) {

    const [step, setStep]             = useState("form");
    const [formData, setFormData]     = useState(null);      // stores original form input

    const [questions, setQuestions]   = useState(createQuestionResponse());
    const [evalResult, setEvalResult] = useState(null);
    const [pathData, setPathData]     = useState(createPathResponse());

    const [loading, setLoading]       = useState(false);
    const [error, setError]           = useState(null);

    // Step 1 — submit form → generate diagnostic questions
    async function startDiagnostic(form) {
        setLoading(true);
        setError(null);
        try {
            const res = await generateDiagnostic(form);
            setQuestions(createQuestionResponse(res));
            setFormData(form);
            setStep("questions");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Step 2 — user submits answers → evaluate → auto-trigger generate-path
    async function submitAnswers(answers) {
        setLoading(true);
        setError(null);
        try {
            const evalRes = await evaluateDiagnostic({
                username:            formData.username,
                programminglanguage: formData.programminglanguage,
                answers,
            });
            setEvalResult(evalRes);
            setStep("result");

            // Step 3 — auto-generate path using username + original form fields
            const pathRes = await generatePath({
                username:            formData.username,
                programminglanguage: formData.programminglanguage,
                days:                formData.days,
                goal:                formData.goal,
                dailyhourstostudy:   formData.dailyhourstostudy,
            });
            setPathData(createPathResponse(pathRes));
            setStep("path");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function reset() {
        setStep("form");
        setFormData(null);
        setQuestions(createQuestionResponse());
        setEvalResult(null);
        setPathData(createPathResponse());
        setError(null);
    }

    return (
        <DiagnosticContext.Provider value={{
            step, loading, error,
            questions, evalResult, pathData,
            startDiagnostic, submitAnswers, reset,
        }}>
            {children}
        </DiagnosticContext.Provider>
    );
}

export function useDiagnostic() {
    const ctx = useContext(DiagnosticContext);
    if (!ctx) throw new Error("useDiagnostic must be inside DiagnosticProvider");
    return ctx;
}