import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

const DashboardPage = lazy(() => import("./components/pages/DashboardPage"));
const CreateAgentPage = lazy(() => import("./components/pages/CreateAgentPage"));
const AgentDetailPage = lazy(() => import("./components/pages/AgentDetailPage"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
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