import { useEffect, useMemo, useState } from 'react';
import { Gift, FileText, Wallet, CheckCircle2, Copy, Loader2 } from 'lucide-react';

export default function AirdropWhitepaperPage({ currentRoute }) {
  const isAirdrop = currentRoute === 'airdrop';

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            {isAirdrop ? (
              <Gift className="h-5 w-5 text-white" />
            ) : (
              <FileText className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {isAirdrop ? 'Airdrop / Pre-buy' : 'cylrc Whitepaper'}
            </h2>
            <p className="text-white/60">
              {isAirdrop
                ? 'Claim CYLRC during our community airdrop or secure an early allocation.'
                : 'A concise overview of CYLRC’s vision, supply, and long-term alignment.'}
            </p>
          </div>
        </div>

        {isAirdrop ? <AirdropContent /> : <WhitepaperContent />}
      </div>
    </section>
  );
}

function AirdropContent() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-white font-semibold text-lg">How to Participate</h3>
        <ol className="mt-3 list-decimal list-inside text-white/80 space-y-2">
          <li>Connect a compatible wallet (EVM chains supported).</li>
          <li>Complete simple community tasks (follow, share, invite).</li>
          <li>Sign a message to register and confirm your claim.</li>
          <li>Claims are processed in waves to prevent congestion.</li>
        </ol>

        <div className="mt-6 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4">
          <div className="text-emerald-300 text-sm font-medium">Allocation</div>
          <div className="text-white text-sm mt-1">
            10% of total supply (2,100,000 CYLRC) is reserved for airdrop and pre-buy participants.
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
          <h4 className="text-white font-semibold">Eligibility Hints</h4>
          <ul className="mt-2 text-white/70 text-sm list-disc list-inside space-y-1">
            <li>Early community members and active participants receive higher allocations.</li>
            <li>Sybil resistance measures apply; one claim per unique wallet.</li>
            <li>Signing is free and does not require gas; claiming on-chain may require gas later.</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <WalletPanel />
      </div>
    </div>
  );
}

function WalletPanel() {
  const [hasProvider, setHasProvider] = useState(false);
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');
  const [balanceEth, setBalanceEth] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [signing, setSigning] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [txHash, setTxHash] = useState('');

  // Compute a deterministic demo allocation from the address for a stable UX
  const allocation = useMemo(() => {
    if (!account) return 0;
    const seed = account.toLowerCase().replace('0x', '');
    let sum = 0;
    for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
    const min = 150; // min CYLRC
    const max = 1200; // max CYLRC
    return Math.floor(min + (sum % (max - min + 1)));
  }, [account]);

  useEffect(() => {
    const provider = typeof window !== 'undefined' && window.ethereum;
    setHasProvider(Boolean(provider));

    async function init() {
      if (!provider) return;
      try {
        const accs = await provider.request({ method: 'eth_accounts' });
        if (accs && accs.length) {
          const a = accs[0];
          setAccount(a);
          const c = await provider.request({ method: 'eth_chainId' });
          setChainId(c);
          const bal = await provider.request({ method: 'eth_getBalance', params: [a, 'latest'] });
          setBalanceEth(weiToEth(bal));
        }
        provider.on?.('accountsChanged', (accs) => {
          const a = accs?.[0] || '';
          setAccount(a);
          setClaimed(false);
          setTxHash('');
        });
        provider.on?.('chainChanged', (c) => setChainId(c));
      } catch (e) {
        // silent
      }
    }
    init();
  }, []);

  const connect = async () => {
    const provider = window.ethereum;
    if (!provider) return;
    setConnecting(true);
    try {
      const accs = await provider.request({ method: 'eth_requestAccounts' });
      const a = accs[0];
      setAccount(a);
      const c = await provider.request({ method: 'eth_chainId' });
      setChainId(c);
      const bal = await provider.request({ method: 'eth_getBalance', params: [a, 'latest'] });
      setBalanceEth(weiToEth(bal));
    } catch (e) {
      // user rejected or error
    } finally {
      setConnecting(false);
    }
  };

  const signAndClaim = async () => {
    if (!account) return;
    const provider = window.ethereum;
    if (!provider) return;
    setSigning(true);
    try {
      const message = `cylrc airdrop\n\nAddress: ${account}\nChain: ${chainId}\nClaim: ${allocation} CYLRC\n\nI confirm I am eligible and this is my only claim.`;
      const signature = await provider.request({
        method: 'personal_sign',
        params: [message, account],
      });
      // Demo: craft a fake tx hash from signature for UI
      const fakeHash = '0x' + (signature?.slice(2, 66) || Math.random().toString(16).slice(2).padEnd(64, '0'));
      setTxHash(fakeHash);
      setClaimed(true);
      // Persist demo state locally
      localStorage.setItem('cylrc_claimed', JSON.stringify({ account, allocation, fakeHash }));
    } catch (e) {
      // user rejected or error
    } finally {
      setSigning(false);
    }
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const short = (addr) => (addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '');

  return (
    <div>
      <h3 className="text-white font-semibold text-lg flex items-center gap-2">
        <Wallet className="h-4 w-4" /> Wallet
      </h3>

      {!hasProvider && (
        <div className="mt-3 rounded-md border border-yellow-400/20 bg-yellow-400/10 p-3 text-yellow-200 text-sm">
          No wallet detected. Install MetaMask or any EVM-compatible wallet to continue.
        </div>
      )}

      <div className="mt-4 space-y-3">
        {!account ? (
          <button
            onClick={connect}
            disabled={!hasProvider || connecting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 disabled:opacity-60"
          >
            {connecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />} Connect Wallet
          </button>
        ) : (
          <div className="rounded-lg border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/60 text-xs">Connected</div>
                <div className="text-white font-mono text-sm flex items-center gap-2">
                  {short(account)}
                  <button onClick={() => copy(account)} className="text-white/60 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/60 text-xs">Balance</div>
                <div className="text-white text-sm">{balanceEth || '—'} ETH</div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-white/60">
              <div className="rounded-md border border-white/10 bg-white/5 p-2">
                <div className="text-white/50">Chain</div>
                <div className="text-white font-medium">{chainId || '—'}</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-2">
                <div className="text-white/50">Your Allocation</div>
                <div className="text-white font-medium">{allocation} CYLRC</div>
              </div>
            </div>

            {!claimed ? (
              <button
                onClick={signAndClaim}
                disabled={signing}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 text-sm font-medium shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 disabled:opacity-60"
              >
                {signing ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Sign & Claim
              </button>
            ) : (
              <div className="mt-4 rounded-md border border-emerald-400/20 bg-emerald-400/10 p-3">
                <div className="text-emerald-300 text-sm font-medium">Claim registered</div>
                <div className="text-white/80 text-sm mt-1">You have claimed {allocation} CYLRC.</div>
                {txHash && (
                  <div className="mt-2 text-xs text-white/60 break-all">
                    Ref: {txHash}
                  </div>
                )}
              </div>
            )}

            <a
              href="#/whitepaper"
              className="mt-4 inline-flex items-center justify-center w-full rounded-md border border-white/15 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 text-sm font-medium transition"
            >
              Read Whitepaper
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function weiToEth(weiHex) {
  if (!weiHex) return '';
  try {
    const wei = BigInt(weiHex);
    const ethStr = Number(wei) / 1e18;
    // Show up to 4 decimals
    return (Math.round(ethStr * 10000) / 10000).toString();
  } catch {
    return '';
  }
}

function WhitepaperContent() {
  return (
    <article className="prose prose-invert max-w-none mt-8">
      <h3>Overview</h3>
      <p>
        cylrc is a community-first token with a fixed supply of 21,000,000. Our aim is to reward early contributors, sustain long-term development, and maintain a healthy token economy through transparent allocation and a minimal annual burn.
      </p>

      <h3>Supply and Distribution</h3>
      <ul>
        <li><strong>Total Supply:</strong> 21,000,000 CYLRC (hard cap).</li>
        <li><strong>Initial Circulating Supply:</strong> 75% at launch (15,750,000 CYLRC).</li>
        <li><strong>Airdrop / Pre-buy:</strong> 10% (2,100,000 CYLRC) for community programs.</li>
        <li><strong>Team:</strong> 10% (2,100,000 CYLRC) with transparent vesting.</li>
        <li><strong>Burn Reserve:</strong> 5% (1,050,000 CYLRC), with ~0.001% of total supply burned annually.</li>
      </ul>

      <h3>Principles</h3>
      <ul>
        <li><strong>Transparency:</strong> clear token allocations and timelines.</li>
        <li><strong>Community Ownership:</strong> meaningful airdrops and incentives for active members.</li>
        <li><strong>Sustainability:</strong> conservative burn and responsible growth.</li>
      </ul>

      <h3>Roadmap (High-level)</h3>
      <ol>
        <li>Genesis distribution and airdrop program launch.</li>
        <li>Ecosystem partnerships and utility integrations.</li>
        <li>Progressive decentralization and governance.</li>
      </ol>

      <p className="opacity-70">
        This whitepaper is a living document and may evolve as the community and ecosystem grow.
      </p>
    </article>
  );
}
