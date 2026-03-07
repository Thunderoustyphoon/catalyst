import { Outlet } from "react-router";
import { ThemeProvider } from "../../hooks/use-theme";
import { AuthProvider } from "../../hooks/use-auth";
import { ErrorBoundary } from "../error-boundary";
import { IntroGate } from "./intro-gate";

export function RootLayout() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <IntroGate>
            <Outlet />
          </IntroGate>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
