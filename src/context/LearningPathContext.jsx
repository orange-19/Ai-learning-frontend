import { createContext, useContext, useState } from "react";
import { createPathResponse } from "../model/LearningPath";
import { generatePath } from "../service/learningPathService";

const LearningPathContext = createContext(null);

export function LearningPathProvider({ children }) {
    const [data, setData]       = useState(createPathResponse());
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);

    async function fetchPath(formData) {
        setLoading(true);
        setError(null);
        try {
            const res = await generatePath(formData);
            setData(createPathResponse(res));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <LearningPathContext.Provider value={{ data, loading, error, fetchPath }}>
            {children}
        </LearningPathContext.Provider>
    );
}

export function useLearningPath() {
    const ctx = useContext(LearningPathContext);
    if (!ctx) throw new Error("useLearningPath must be inside LearningPathProvider");
    return ctx;
}