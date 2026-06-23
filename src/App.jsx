import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';

import MainLayout from './components/layout/MainLayout';

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

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route path="/the-pit" element={<ThePit />} />
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
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
