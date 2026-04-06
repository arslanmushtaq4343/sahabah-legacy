import { Component, ReactNode } from 'react';
import styles from './RouteErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[RouteErrorBoundary]', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className={styles.wrapper} role="alert">
          <div className={styles.inner}>
            <div className={styles.ornament} aria-hidden="true">✦</div>
            <h2 className={styles.title}>Something went wrong</h2>
            <p className={styles.message}>
              This page encountered an unexpected error. You can try again or navigate to another section.
            </p>
            <details className={styles.details}>
              <summary>Technical details</summary>
              <pre className={styles.stack}>{this.state.error.message}</pre>
            </details>
            <button className={styles.retryBtn} onClick={this.handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
