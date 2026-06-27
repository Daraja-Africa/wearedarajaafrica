import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';

import MainLayout from './components/layout/MainLayout';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const Resources = lazy(() => import('./pages/Resources'));
const Gallery = lazy(() => import('./pages/Gallery'));
const GetInvolved = lazy(() => import('./pages/GetInvolved'));
const GetHelp = lazy(() => import('./pages/GetHelp'));
const Announcements = lazy(() => import('./pages/Announcements'));
const ThePit = lazy(() => import('./pages/ThePit'));
const PrivacyCharter = lazy(() => import('./pages/PrivacyCharter'));
const DataDeletion = lazy(() => import('./pages/DataDeletion'));

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route path="/the-pit" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingSkeleton />}>
                <ThePit />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route element={<MainLayout />}>
            <Route path="/" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  <Home />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path="/about" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  <About />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path="/programs" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  <Programs />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path="/resources" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  <Resources />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path="/gallery" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  <Gallery />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path="/get-involved" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  <GetInvolved />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path="/get-help" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  <GetHelp />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path="/announcements" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  <Announcements />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path="/privacy-charter" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  <PrivacyCharter />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path="/data-deletion" element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingSkeleton />}>
                  <DataDeletion />
                </Suspense>
              </ErrorBoundary>
            } />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
