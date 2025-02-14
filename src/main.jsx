import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "../src/routes/Routes.jsx";
import AuthProviders from "./providers/AuthProviders.jsx";

// Import TanStack Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap the application with both AuthProvider and QueryClientProvider */}
    <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Routes}></RouterProvider>
      </QueryClientProvider>
    </AuthProviders>
  </StrictMode>
);
