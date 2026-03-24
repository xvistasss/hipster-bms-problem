// Root application entry.
// Responsibilities:
// - Wrap app with error boundary
// - Mount main dashboard safely
// - Keep app shell minimal and clean

import React from 'react';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';

import { useAuthStore } from './store/authStore';
import { useAuthBootstrap } from './hooks/useAuthBootstrap';

function App() {
  useAuthBootstrap();
  
  const loading = useAuthStore((state) => state.loading);
  if (loading) { return <Loader /> }

  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}

export default App;
