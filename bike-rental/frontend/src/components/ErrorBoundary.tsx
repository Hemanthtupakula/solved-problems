import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('TBH Uncaught Error Boundary Caught:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0B] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#141416] border border-white/10 rounded-2xl p-8 text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold font-display text-white">Something went wrong</h2>
              <p className="text-xs text-slate-400 mt-1">
                The application encountered an unexpected state. You can reload to restore your session.
              </p>
            </div>
            {this.state.error && (
              <p className="text-[11px] font-mono text-rose-400 bg-black/50 p-2.5 rounded-xl border border-white/5 break-words text-left">
                {this.state.error.message}
              </p>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] text-black font-extrabold text-xs shadow-teal-glow hover:opacity-95 transition flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Ride Studio</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
