import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Dashboard } from '@/components/dashboard';
import { CampaignForm } from '@/components/campaign-form';
import { LandingPage } from '@/components/landing-page';
import { CampaignsList } from '@/components/campaigns/campaign-list';
import { CampaignDetails } from '@/components/campaigns/campaign-details';
import { CreditsPage } from '@/components/credits/credits-page';
import { PrivacyPolicy } from '@/components/pages/privacy-policy';
import { TermsAndConditions } from '@/components/pages/terms-and-conditions';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import { Rocket } from 'lucide-react';
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ProtectedApp() {
  return (
    <SignedIn>
      <Routes>
        <Route path="/" element={<LandingPage isSignedIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns/new" element={<CampaignForm />} />
        <Route path="/campaigns" element={<CampaignsList />} />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
    </SignedIn>
  );
}

function HeaderAndSidebar() {
  return (
    <header className="border-b fixed top-0 right-0 left-0 z-50 bg-background">
      <div className="flex h-20 items-center justify-between w-full px-4 lg:px-8">
        <Sidebar />
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <Rocket className="h-6 w-6" />
          <h1 className="text-xl font-bold">Revelve</h1>
        </Link>
        <div className="flex items-center gap-4 ml-auto pr-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}

function MainLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderAndSidebar />
      <main className="flex-1 pt-20 lg:pl-[240px]">
        <div className="container px-4 py-6 lg:px-8">
          <ProtectedApp />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider defaultTheme="system" storageKey="reddit-marketing-theme">
        <Router>
          <SignedOut>
            <Routes>
              <Route path="/" element={<LandingPage isSignedIn={false} />} />
              <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
              <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="*" element={<Navigate to="/sign-in" replace />} />
            </Routes>
            <Footer />
          </SignedOut>
          <SignedIn>
            <Routes>
              <Route path="/" element={<LandingPage isSignedIn={true} />} />
              <Route path="/*" element={<MainLayout />} />
            </Routes>
          </SignedIn>
        </Router>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;