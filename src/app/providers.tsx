"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools }  from "@tanstack/react-query-devtools";
import { ThemeProvider }       from "next-themes";
import { Toaster }             from "sonner";
import { queryClient }         from "@/lib/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
        <Toaster
          position="top-right"
          richColors
          expand
          duration={3500}
          toastOptions={{
            classNames: {
              toast: "font-sans",
            },
          }}
        />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
