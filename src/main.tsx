import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import AppContainer from './AppContainer.tsx';
import './index.css';
import { MinimalErrorFallback } from './pages/error-fallback/MinimalErrorFallback.tsx';
import { ServerErrorPage } from './pages/error/server-error/ServerErrorPage.tsx';

function initializeApp() {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    const errorContainer = document.createElement('div');
    document.body.appendChild(errorContainer);

    const errorRoot = createRoot(errorContainer);
    errorRoot.render(<ServerErrorPage errorMessage='Root Element Not Found' />);

    return;
  }

  const root = createRoot(rootElement);

  const logError = (error: unknown, info: React.ErrorInfo): void => {
    console.error('Runtime error:', error);
    console.error('Component stack:', info.componentStack);
  };

  root.render(
    <ErrorBoundary
      FallbackComponent={MinimalErrorFallback}
      onError={logError}
      onReset={() => {
        console.log('Attempting to recover from error...');
      }}
    >
      <AppContainer />
    </ErrorBoundary>,
  );
}

initializeApp();
