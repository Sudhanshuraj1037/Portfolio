import { Component, type ReactNode } from "react";

export class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("WebGL canvas failed, falling back to CSS:", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
