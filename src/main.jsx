import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { TooltipProvider } from "./components/ui/tooltip";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { TodoProvider } from "./context/TodoContext";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster position="bottom-right" />
          <TodoProvider>
            <App />
          </TodoProvider>
        </TooltipProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
