import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';
import GetInvolved from './pages/GetInvolved';
import GetHelp from './pages/GetHelp';
import Announcements from './pages/Announcements';
import ThePit from './pages/ThePit';
import PrivacyCharter from './pages/PrivacyCharter';
import DataDeletion from './pages/DataDeletion';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: '#F5EFE4' }}>
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://media.base44.com/images/public/user_6a2ac434681f299904d3a76b/37ec6e1b6_IMG-20260609-WA0015.jpg"
            alt="Daraja Africa"
            className="h-16 w-auto object-contain animate-pulse"
          />
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* The Pit — standalone dark page, no main layout */}
      <Route path="/the-pit" element={<ThePit />} />

      {/* All other pages — wrapped in MainLayout with crisis banner + navbar + footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/get-help" element={<GetHelp />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/privacy-charter" element={<PrivacyCharter />} />
        <Route path="/data-deletion" element={<DataDeletion />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;