import { ErrorInfo, PureComponent, ReactNode } from 'react';

interface ErrorBoundaryState {
    error: Error | null;
}

export interface ErrorBoundaryProps {
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
    static defaultProps = {
        fallback: 'Something went wrong...'
    };

    state = {
        error: null
    };

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const { onError } = this.props;

        onError?.(error, errorInfo);
    }

    render() {
        const { children, fallback } = this.props;
        const { error } = this.state;

        if (error) {
            return fallback;
        }

        return children;
    }
}

export default ErrorBoundary;
