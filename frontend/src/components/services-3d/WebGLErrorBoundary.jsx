import { Component } from "react";

// The `activate3D` gate (desktop + fine pointer + WebGL2 + no reduced-motion)
// rules out most failure modes up front, but GPU driver quirks and extension
// conflicts can still make the Canvas throw at runtime — and an uncaught
// error inside a Canvas takes the *entire* React tree down with it (no
// built-in recovery). This is the safety net: catch it, render the same
// lightweight fallback grid used for every other non-3D path.
export default class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn("[Services 3D] falling back to grid after a render error:", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
