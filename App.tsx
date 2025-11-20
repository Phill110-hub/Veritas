import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

// Dashboard Components
import { DashboardLayout } from './components/DashboardLayout';
import { Overview } from './components/dashboard/Overview';
import { UploadTool } from './components/dashboard/UploadTool';
import { FileList } from './components/dashboard/FileList';
import { Settings } from './components/dashboard/Settings';

// Landing Page Wrapper
const LandingPage: React.FC = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Features />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Routes */}
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Overview />} />
            <Route path="upload" element={<UploadTool />} />
            <Route path="recent" element={<FileList title="Recent Files" filter="RECENT" />} />
            <Route path="completed" element={<FileList title="Completed Analysis" filter="COMPLETED" />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;