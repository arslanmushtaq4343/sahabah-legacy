import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import HomePage from './components/home/HomePage';
import ComparePanel from './components/companions/ComparePanel';
import { DailyCompanionBanner, StudyStreakBar, WeeklyCompanionBadge, AccessibilityPanel } from './components/global/GlobalFeatures';
import { PageSkeleton } from './components/layout/PageSkeleton';
import { RouteErrorBoundary } from './components/layout/RouteErrorBoundary';
import { PageTransition } from './components/layout/PageTransition';
import { OnboardingModal } from './components/layout/OnboardingModal';
import styles from './App.module.css';

/* ── Lazy-loaded route chunks ────────────────────────────────────────── */
const CompanionsPage     = lazy(() => import('./components/companions/CompanionsPage'));
const ConnectionsPage    = lazy(() => import('./components/connections/ConnectionsPage'));
const InsightsPage       = lazy(() => import('./components/insights/InsightsPage'));
const ImamsPage          = lazy(() => import('./components/imams/ImamsPage'));
const LibraryPage        = lazy(() => import('./components/library/LibraryPage'));
const QuranTriggersPage  = lazy(() => import('./components/quranTriggers/QuranTriggersPage'));
const LaqabPage          = lazy(() => import('./components/laqab/LaqabPage'));
const DeathsPage         = lazy(() => import('./components/deaths/DeathsPage'));
const LastWordsPage      = lazy(() => import('./components/lastWords/LastWordsPage'));

export default function App() {
  return (
    <>
      {/* Skip-to-main-content for keyboard / screen-reader users */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <div className={`${styles.shell} premium-surface`}>
        <Sidebar />
        <main id="main-content" className={styles.main}>
          {/* Feature 95 — Daily Companion Banner */}
          <DailyCompanionBanner />

          <Suspense fallback={<PageSkeleton />}>
            <PageTransition>
              <Routes>
                {/* Home is eager — it's the landing page */}
                <Route path="/" element={<HomePage />} />

                <Route path="/companions" element={
                  <RouteErrorBoundary><CompanionsPage /></RouteErrorBoundary>
                } />
                <Route path="/connections" element={
                  <RouteErrorBoundary><ConnectionsPage /></RouteErrorBoundary>
                } />
                <Route path="/insights" element={
                  <RouteErrorBoundary><InsightsPage /></RouteErrorBoundary>
                } />
                <Route path="/imams" element={
                  <RouteErrorBoundary><ImamsPage /></RouteErrorBoundary>
                } />
                <Route path="/library" element={
                  <RouteErrorBoundary><LibraryPage /></RouteErrorBoundary>
                } />
                <Route path="/library/quran-triggers" element={
                  <RouteErrorBoundary><QuranTriggersPage /></RouteErrorBoundary>
                } />
                <Route path="/library/laqab" element={
                  <RouteErrorBoundary><LaqabPage /></RouteErrorBoundary>
                } />
                <Route path="/library/deaths" element={
                  <RouteErrorBoundary><DeathsPage /></RouteErrorBoundary>
                } />
                <Route path="/library/last-words" element={
                  <RouteErrorBoundary><LastWordsPage /></RouteErrorBoundary>
                } />
              </Routes>
            </PageTransition>
          </Suspense>

          {/* Feature 96 — Study Streak Bar */}
          <StudyStreakBar />
        </main>

        <ComparePanel />

        {/* Feature 97 — Weekly Companion (positioned fixed) */}
        <div className={styles.weeklyBadgeWrap}>
          <WeeklyCompanionBadge />
        </div>

        {/* Feature 98 — Accessibility Panel */}
        <AccessibilityPanel />
      </div>

      {/* First-visit guided introduction */}
      <OnboardingModal />
    </>
  );
}
