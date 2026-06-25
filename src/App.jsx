import { Routes, Route } from "react-router";

import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/pages/Dashboard";
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Settings from "./components/pages/Settings";
export default function App() {
  return (
    <Routes>
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />

       <Route
        path="/"
        element={
          <>
            <SignedIn>
              <DashboardLayout />
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
