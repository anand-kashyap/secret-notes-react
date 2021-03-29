import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './common/Footer';
import Header from './common/Header';
import AppRouter from './Router';

interface AppProps {}

function App({}: AppProps) {
  return (
    <Router>
      <div className="relative c-container">
        <Header />
        <main className="flex place-content-center">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
