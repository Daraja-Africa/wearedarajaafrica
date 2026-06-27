import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Application error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          reset: this.handleReset,
        });
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#F5EFE4" }}>
          <div className="max-w-md w-full text-center">
            <h1 className="font-display text-3xl font-bold text-brand-charcoal mb-4">
              Something went wrong
            </h1>
            <p className="text-brand-body text-sm mb-6 leading-relaxed">
              We encountered an unexpected error. This has been logged and we'll look into it.
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{ backgroundColor: "#B8671A", color: "#fff" }}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
