import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '@/components/dashboard';
import { CampaignForm } from '@/components/campaign-form';
import { LandingPage } from '@/components/landing-page';
import { PromotionsList } from '@/components/promotions/promotion-list';
import { PromotionDetails } from '@/components/promotions/promotion-details';
import { CreditsPage } from '@/components/credits/credits-page';
import { Sidebar } from '@/components/layout/sidebar';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="reddit-marketing-theme">
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-sm z-50">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6" />
              <h1 className="text-xl font-bold">Reddit Promoter</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="mr-2" onClick={() => setIsLoggedIn(true)}>Log In</Button>
              <Button onClick={() => setIsLoggedIn(true)}>Sign Up</Button>
              <ModeToggle />
            </div>
          </div>
        </header>
        <LandingPage onGetStarted={() => setIsLoggedIn(true)} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="reddit-marketing-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <header className="border-b fixed top-0 right-0 left-0 z-50 bg-background">
            <div className="container flex h-16 items-center justify-between px-4 lg:px-8">
              <div className="flex items-center gap-2">
                <Sidebar />
                <Rocket className="h-6 w-6" />
                <h1 className="text-xl font-bold">Reddit Promoter</h1>
              </div>
              <ModeToggle />
            </div>
          </header>

          <main className="pt-16 lg:pl-[240px]">
            <div className="container px-4 py-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/campaigns/new" element={<CampaignForm />} />
                <Route path="/promotions" element={<PromotionsList />} />
                <Route path="/promotions/:id" element={<PromotionDetails />} />
                <Route path="/credits" element={<CreditsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;