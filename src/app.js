import { useState } from "react";
import DashboardPage from "./components/DashboardPage";
import LandingPage from "./components/LandingPage";
import "./styles.css";

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />;
  }

  return <DashboardPage />;
}
