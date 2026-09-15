import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import Home from "./pages/Home";
import { Intro } from "./components/Intro";
import { ModeRail } from "./components/ModeRail";
import { AnimatePresence } from "framer-motion";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasSeenIntro = sessionStorage.getItem("eswar-portfolio-intro-seen");
    if (hasSeenIntro || params.get("skipIntro") === "true") {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("eswar-portfolio-intro-seen", "true");
  };

  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <TooltipProvider>
          <Toaster />
          <AnimatePresence mode="wait">
            {showIntro ? (
              <Intro key="intro" onComplete={handleIntroComplete} />
            ) : (
              <>
                <ModeRail />
                <Router />
              </>
            )}
          </AnimatePresence>
        </TooltipProvider>
      </PortfolioProvider>
    </ErrorBoundary>
  );
}
