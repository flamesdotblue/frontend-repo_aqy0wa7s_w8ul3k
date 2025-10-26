import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HomeHero from './components/HomeHero.jsx';
import TokenomicsPage from './components/TokenomicsPage.jsx';
import AirdropWhitepaperPage from './components/AirdropWhitepaperPage.jsx';

function App() {
  const [route, setRoute] = useState('');

  useEffect(() => {
    const getRoute = () => window.location.hash.replace('#/', '') || '';
    setRoute(getRoute());
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderView = () => {
    if (route === 'tokenomics') return <TokenomicsPage />;
    if (route === 'airdrop' || route === 'whitepaper') return <AirdropWhitepaperPage currentRoute={route} />;
    return <HomeHero />;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      {renderView()}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} cylrc — Built for the community.
        </div>
      </footer>
    </div>
  );
}

export default App;
