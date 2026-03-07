import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./components/layouts/root-layout";
import { PublicLayout } from "./components/layouts/public-layout";
import { StudentLayout } from "./components/layouts/student-layout";
import { ClientLayout } from "./components/layouts/client-layout";
import { AuthGuard } from "./components/layouts/auth-guard";

// Lazy loaders
import { MainPage } from "./components/main-page";
import { LoginPage } from "./components/pages/login-page";
import { SignupPage } from "./components/pages/signup-page";
import { FeaturesPage } from "./components/features-page";
import { HowItWorksPage } from "./components/how-it-works-page";
import { TestimonialsPage } from "./components/testimonials-page";
import { DiagnosticPage } from "./components/pages/diagnostic-page";
import { RoadmapPage } from "./components/pages/roadmap-page";
import { StudentDashboardPage } from "./components/pages/student-dashboard-page";
import { LearningPage } from "./components/pages/learning-page";
import { CoursePage } from "./components/pages/course-page";
import { QuizPage } from "./components/pages/quiz-page";
import { PortfolioPage } from "./components/pages/portfolio-page";
import { MarketplacePage } from "./components/pages/marketplace-page";
import { EarningsPage } from "./components/pages/earnings-page";
import { EscrowPage } from "./components/pages/escrow-page";
import { AIAssistantPage } from "./components/pages/ai-assistant-page";
import { SettingsPage } from "./components/pages/settings-page";
import { ClientDashboardPage } from "./components/pages/client-dashboard-page";
import { ClientProjectsPage } from "./components/pages/client-projects-page";
import { ClientPaymentsPage } from "./components/pages/client-payments-page";
import { TalentPage } from "./components/pages/talent-page";
import { NotFoundPage } from "./components/pages/not-found-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      // Public pages
      { index: true, Component: MainPage },
      { path: "features", Component: FeaturesPage },
      { path: "how-it-works", Component: HowItWorksPage },
      { path: "testimonials", Component: TestimonialsPage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },

      // Authenticated: diagnostic flow
      {
        path: "diagnostic",
        element: <AuthGuard><DiagnosticPage /></AuthGuard>,
      },
      {
        path: "roadmap",
        element: <AuthGuard><RoadmapPage /></AuthGuard>,
      },

      // Student dashboard
      {
        path: "student",
        element: <AuthGuard requiredType="student"><StudentLayout /></AuthGuard>,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", Component: StudentDashboardPage },
          { path: "learning", Component: LearningPage },
          { path: "learning/:courseId", Component: CoursePage },
          { path: "quiz", Component: QuizPage },
          { path: "portfolio", Component: PortfolioPage },
          { path: "marketplace", Component: MarketplacePage },
          { path: "earnings", Component: EarningsPage },
          { path: "escrow", Component: EscrowPage },
          { path: "ai-assistant", Component: AIAssistantPage },
          { path: "settings", Component: SettingsPage },
        ],
      },

      // Client dashboard
      {
        path: "client",
        element: <AuthGuard requiredType="client"><ClientLayout /></AuthGuard>,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", Component: ClientDashboardPage },
          { path: "projects", Component: ClientProjectsPage },
          { path: "payments", Component: ClientPaymentsPage },
          { path: "talent", Component: TalentPage },
          { path: "settings", Component: SettingsPage },
        ],
      },

      // Catch-all
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
