import { type FallbackProps } from 'react-error-boundary';

import { ServerErrorPage } from '../error/server-error/ServerErrorPage';

export const MinimalErrorFallback: React.FC<FallbackProps> = () => {
  return <ServerErrorPage />;
};

export default MinimalErrorFallback;
