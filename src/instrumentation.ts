/**
 * Next.js Instrumentation — runs once at server startup, before any requests.
 *
 * Problem: Node.js 22 + Next.js 15 starts with the experimental `--localstorage-file`
 * flag. When the file path is invalid, Node creates a broken `localStorage` global
 * where methods like `getItem` are NOT functions. This crashes Zustand's persist
 * middleware and any other code that touches localStorage during SSR.
 *
 * Fix: detect the broken localStorage and replace it with a safe no-op shim.
 */
export async function register() {
  // Only patch on the server (Node.js runtime)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const needsPatch =
      typeof (globalThis as unknown as Record<string, unknown>).localStorage !== "undefined" &&
      typeof (globalThis as unknown as { localStorage?: { getItem?: unknown } }).localStorage
        ?.getItem !== "function";

    if (needsPatch) {
      // Replace the broken localStorage with a safe no-op shim
      Object.defineProperty(globalThis, "localStorage", {
        value: {
          getItem:    (_key: string): null => null,
          setItem:    (_key: string, _value: string): void => {},
          removeItem: (_key: string): void => {},
          clear:      (): void => {},
          key:        (_index: number): null => null,
          length:     0,
        },
        writable:     true,
        configurable: true,
        enumerable:   false,
      });
    }
  }
}
