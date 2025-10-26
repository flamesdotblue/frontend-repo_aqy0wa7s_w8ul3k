import { useEffect, useState } from 'react';
import { Rocket, Coins, FileText, Gift } from 'lucide-react';

function classNames(...arr) {
  return arr.filter(Boolean).join(' ');
}

const routes = [
  { path: '', label: 'Home', icon: Rocket },
  { path: 'airdrop', label: 'Airdrop', icon: Gift },
  { path: 'tokenomics', label: 'Tokenomics', icon: Coins },
  { path: 'whitepaper', label: 'Whitepaper', icon: FileText },
];

export default function Navbar() {
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const getRoute = () => (window.location.hash.replace('#/', '') || '');
    setCurrent(getRoute());
    const onHashChange = () => setCurrent(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-white font-bold">C</div>
          <div>
            <div className="text-white font-semibold tracking-wide">cylrc</div>
            <div className="text-xs text-white/60 -mt-1">Crypto Airdrop</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-2">
          {routes.map(({ path, label, icon: Icon }) => (
            <a
              key={path}
              href={`#/${path}`}
              className={classNames(
                'px-3 py-2 rounded-md text-sm flex items-center gap-2 transition',
                current === path
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#/airdrop"
          className="md:inline-flex hidden items-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition"
        >
          <Gift className="h-4 w-4" /> Join Airdrop
        </a>
      </div>
    </header>
  );
}
