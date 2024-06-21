import "@/index.css";

import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home/Home";
import ParticipantsPage from "@/pages/participants/ParticipantsPage";
import ResultsPage from "@/pages/results/ResultsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deltagere" element={<ParticipantsPage />} />
        <Route path="/resultater" element={<ResultsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
