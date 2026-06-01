import React, { Component, ReactNode } from 'react';
import { hardResetApp, ERROR_RECOVERY_KEY } from '@/lib/safe-storage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const getRecoveryAttempts = (): number => {
  if (typeof window === 'undefined') return 0;
  const stored = window.sessionStorage.getItem(ERROR_RECOVERY_KEY);
  const parsed = stored ? parseInt(stored, 10) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
};

const setRecoveryAttempts = (attempts: number): void => {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(ERROR_RECOVERY_KEY, String(attempts));
  } catch {
    // ignore sessionStorage failures
  }
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    const attempts = getRecoveryAttempts() + 1;
    setRecoveryAttempts(attempts);

    hardResetApp();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;