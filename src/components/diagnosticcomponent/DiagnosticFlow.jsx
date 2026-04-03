import { useDiagnostic } from "../../context/DiagnosticContext";
import DiagnosticForm from "./DiagnosticForm";
import DiagnosticQuestions from "./DiagnosticQuestions";
import PathDisplay from "../learningpathcomponent/PathDisplay";

export default function DiagnosticFlow() {
    const { step } = useDiagnostic();

    if (step === "form")      return <DiagnosticForm />;
    if (step === "questions") return <DiagnosticQuestions />;
    if (step === "result")    return <p style={{ textAlign: "center" }}>Generating your learning path...</p>;
    if (step === "path")      return <PathDisplay />;

    return null;
}