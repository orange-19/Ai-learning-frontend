import './App.css';
import ProfileCard from "./components/profilecomponent/Profile";
import {UserProvider} from "./context/UserContext";
import QuestionForm from "./components/questioncomponent/QuestionForm";
import {QuestionProvider} from "./context/QuestionContext";
import QuestionDisplay from "./components/questioncomponent/QuestionDisplay";

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
    </div>
  );
}

export default App;
