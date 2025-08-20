import React from "react";

import LoginForm from "./LoginForm.jsx";
import { useAuth0 } from "./MockAuthProvider.jsx";

const AuthGuard = ({ children }) => {
    const { isLoading, isAuthenticated } = useAuth0();
    

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <>{children}</>;
};

export default AuthGuard;
