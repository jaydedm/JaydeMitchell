/// <reference types="react-scripts" />

interface Window {
  requestIdleCallback?: (cb: () => void) => number
}
