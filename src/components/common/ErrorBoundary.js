// Application error boundary.
// Responsibilities:
// - Catch render errors
// - Prevent full app crash
// - Show simple fallback UI

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.error('UI Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <div className="rounded-lg border border-red-200 bg-white p-6 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-red-600">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please refresh the page and try again.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
