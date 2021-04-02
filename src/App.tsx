import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './common/Footer';
import Header from './common/Header';
import AppRouter from './Router';
interface AppProps {}

// Create a client
const queryClient = new QueryClient();

function App({}: AppProps) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="relative c-container">
          <Header />
          <main className="flex place-content-center items-start">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
