import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CreateAgentPage = lazy(() => import("./pages/CreateAgentPage"));
const AgentDetailPage = lazy(() => import("./pages/AgentDetailPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const SyntaxTual = lazy(() => import("./pages/SyntaxTual"));
const NewsPage = lazy(() => import("./pages/NewsPage"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<SyntaxTual />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-agent" element={<CreateAgentPage />} />
          <Route path="/agent/:id" element={<AgentDetailPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;