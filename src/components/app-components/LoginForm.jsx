import React from "react";
import chrome from "@/assests/chrome.svg";
import github from "@/assests/github.svg";
import { LogIn} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import { useAuth0 } from "./MockAuthProvider.jsx";

const LoginForm = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleLogin = async (connection) => {
    await loginWithRedirect({
      authorizationParams: {
        connection,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-xl sm:text-2xl">
              Welcome to NoteKeeper
            </CardTitle>
            <CardDescription className="text-sm">
              Sign in to access your personal notes
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 space-y-4">
            <Button
              onClick={() => handleLogin()}
              disabled={isLoading}
              className="w-full h-11 text-base">
              <LogIn className="h-4 w-4 mr-2" />
              {isLoading ? "Signing in..." : "Sign In with Demo Account"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={() => handleLogin("google-oauth2")}
                disabled={isLoading}
                className="w-full h-11 text-base">
                <img src={chrome} alt="google" className="h-4 w-4 mr-2" />
                Continue with Google (Demo)
              </Button>

              <Button
                variant="outline"
                onClick={() => handleLogin("github")}
                disabled={isLoading}
                className="w-full h-11 text-base">
                <img src={github} alt="github" className="h-4 w-4 mr-2" />
                Continue with GitHub (Demo)
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground mt-6">
              <p>
                <strong>Demo Mode:</strong> This is a demo version using mock
                authentication. Your notes are stored locally in your browser.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
