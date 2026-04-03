import './App.css';
import ProfileCard from "./components/profilecomponent/Profile";
import {UserProvider} from "./context/UserContext";

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
    </div>
  );
}

export default App;
