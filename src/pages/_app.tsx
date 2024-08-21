import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>        
        <Header />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}
