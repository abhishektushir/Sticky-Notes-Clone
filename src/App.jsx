import "./App.css";
import { Auth0Provider } from "./components/app-components/Auth0Provider";
import AuthGuard from "./components/app-components/AuthGuard";
import { MockAuth0Provider } from "./components/app-components/MockAuthProvider";
import ErrorFallback from "./layouts/ErrorFallback";
import NoteDashboard from "./layouts/NoteDashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorFallback />,
      element: (
        <Auth0Provider>
          <AuthGuard>
            <NoteDashboard />
          </AuthGuard>
        </Auth0Provider>
      ),
      path: "/",
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
