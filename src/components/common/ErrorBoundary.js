// Application error boundary.
// Responsibilities:
// - Catch render errors
// - Prevent full app crash
// - Show simple fallback UI

import React from 'react';
import { loggerService } from '../../services/loggerServices';

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
    loggerService.error('UI_ERROR_BOUNDARY', {
      name: error.name,
      error: error.message,
      componentStack: info.componentStack,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <div className="rounded-lg border border-red-200 bg-white p-6 text-center shadow-sm max-w-sm w-full">
            <h2 className="text-lg font-semibold text-red-600">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              An unexpected error occurred while rendering the page.
            </p>

            <button
              type="button"
              onClick={this.handleRetry}
              className="mt-4 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
