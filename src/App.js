import './App.css';
import ProfileCard from "./components/profilecomponent/Profile";
import {UserProvider} from "./context/UserContext";
import QuestionForm from "./components/questioncomponent/QuestionForm";
import {QuestionProvider} from "./context/QuestionContext";
import QuestionDisplay from "./components/questioncomponent/QuestionDisplay";
import DiagnosticFlow from "./components/diagnosticcomponent/DiagnosticFlow";
import {DiagnosticProvider} from "./context/DiagnosticContext";

function App() {
    const username = "akash";
  return (
    <div>
        <UserProvider loggedInName={username}>
            <nav className="navbar">
                <span>Learning Assistant</span>
                <ProfileCard></ProfileCard>
            </nav>
        </UserProvider>
        <QuestionProvider>
            <main className="main-content">
                <QuestionForm />
                <QuestionDisplay />
            </main>
        </QuestionProvider>
        <DiagnosticProvider>
            <main className="main-content">
                <DiagnosticFlow />
            </main>
        </DiagnosticProvider>
    </div>
  );
}

export default App;
