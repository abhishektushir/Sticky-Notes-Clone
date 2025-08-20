import "./App.css";
import AuthGuard from "./components/app-components/AuthGuard";
import LoginForm from "./components/app-components/LoginForm";
import { MockAuth0Provider } from "./components/app-components/MockAuthProvider";

function App() {
  return (
    <MockAuth0Provider>
      <AuthGuard>
        <LoginForm />
      </AuthGuard>
    </MockAuth0Provider>
  );
}

export default App;
