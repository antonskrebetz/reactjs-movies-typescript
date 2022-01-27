import { Component, ErrorInfo, ReactNode } from "react";
import ErrorMessage from "../error-message/error-message";

type TProps = {
  children: ReactNode;
}

type TState = {
  error: boolean;
}

export default class ErrorBoundary extends Component<TProps, TState> {
  public state: TState = {
    error: false
  };

  static getDerivedStateFromError(_: Error): TState {
    return { error: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage/>
    }

    return this.props.children;
  }
}