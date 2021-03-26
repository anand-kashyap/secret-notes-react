import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './common/Footer';
import Header from './common/Header';
import AppRouter from './Router';

interface AppProps {}

function App({}: AppProps) {
  return (
    <Router>
      <div className="relative h-full">
        <Header />
        <main>
          <AppRouter />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
