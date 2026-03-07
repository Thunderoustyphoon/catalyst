import { Component, type ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // In production, send to error reporting service (e.g., Sentry)
    console.error("[ErrorBoundary] Caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md space-y-6">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h2 className="text-foreground" style={{ fontSize: "var(--text-xl)", fontWeight: 500 }}>
                Something went wrong
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: "var(--text-sm)" }}>
                An unexpected error occurred. Please try again or contact support if the problem persists.
              </p>
            </div>
            <Button
              onClick={this.handleReset}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
