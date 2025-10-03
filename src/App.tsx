import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CreateAgentPage = lazy(() => import("./pages/CreateAgentPage"));
const AgentDetailPage = lazy(() => import("./pages/AgentDetailPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/create-agent" element={<ProtectedRoute><CreateAgentPage /></ProtectedRoute>} />
          <Route path="/agent/:id" element={<ProtectedRoute><AgentDetailPage /></ProtectedRoute>} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;