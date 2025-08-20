import "./App.css";
import AuthGuard from "./components/app-components/AuthGuard";
import { MockAuth0Provider } from "./components/app-components/MockAuthProvider";
import NoteDashboard from "./layouts/NoteDashboard";

function App() {
  return (
    <MockAuth0Provider>
      <AuthGuard>
        <NoteDashboard/>
      </AuthGuard>
    </MockAuth0Provider>
  );
}

export default App;
