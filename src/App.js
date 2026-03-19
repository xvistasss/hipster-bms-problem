// Root application entry.
// Responsibilities:
// - Wrap app with error boundary
// - Mount main dashboard safely
// - Keep app shell minimal and clean

import React from 'react';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}

export default App;
