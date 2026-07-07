import { useMemo, useState } from "react";
import DashboardPage from "./components/DashboardPage";
import LandingPage from "./components/LandingPage";
import "./styles.css";

export default function App() {
  const [started, setStarted] = useState(false);

  const currentDateLabel = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  }, []);

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} currentDateLabel={currentDateLabel} />;
  }

  return <DashboardPage currentDateLabel={currentDateLabel} />;
}
