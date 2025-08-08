
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useTutorMessages } from "./hooks/useTutorMessages";
import "./i18n/config";

const queryClient = new QueryClient();

const getBasename = (): string => {
  const path = window.location.pathname;
  const parts = path.split("/");

  // Check if the path structure is /flows/{uuid}
  if (parts.length > 2 && parts[1] === "flows") {
    return `/${parts[1]}/${parts[2]}`;
  }

  return "/";
};

const AppContent = () => {
  const { i18n } = useTranslation();
  const { resendLastMessage } = useTutorMessages();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'setFlowLanguage') {
        const { languageCode } = event.data;
        i18n.changeLanguage(languageCode).then(() => {
          // Resend last message in new language
          resendLastMessage();
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [i18n, resendLastMessage]);

  return (
    <BrowserRouter basename={getBasename()}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
