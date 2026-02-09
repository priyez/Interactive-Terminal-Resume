"use client";

import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen bg-gray-900 text-gray-200 p-8 flex items-center justify-center">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl font-bold mb-4 text-red-400">
                            ⚠️ Something went wrong
                        </h1>
                        <p className="mb-4">
                            The terminal encountered an unexpected error. Please refresh the page to try again.
                        </p>
                        <details className="bg-gray-800 p-4 rounded border border-gray-700">
                            <summary className="cursor-pointer font-semibold mb-2">
                                Error Details
                            </summary>
                            <pre className="text-xs overflow-auto">
                                {this.state.error?.toString()}
                            </pre>
                        </details>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
