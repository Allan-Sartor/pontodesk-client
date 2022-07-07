import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { ReactQueryDevtools } from 'react-query/devtools'
import { SidebarDrawerProvider } from '../services/contexts/SidebarDrawerContext';
import { AuthProvider } from '../services/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';

if (process.env.NODE_ENV === 'development') {
  // makeServer();
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={theme}>
          <AuthProvider>
            <SidebarDrawerProvider>
              <Component {...pageProps} />
            </SidebarDrawerProvider>
          </AuthProvider>
        </ChakraProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>

  )
}

export default MyApp
