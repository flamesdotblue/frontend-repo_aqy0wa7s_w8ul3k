import { Gift, FileText, Wallet } from 'lucide-react';

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
          <li>Submit your wallet address to register your claim.</li>
          <li>Claims are processed in waves to prevent congestion.</li>
        </ol>

        <div className="mt-6 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4">
          <div className="text-emerald-300 text-sm font-medium">Allocation</div>
          <div className="text-white text-sm mt-1">
            10% of total supply (2,100,000 CYLRC) is reserved for airdrop and pre-buy participants.
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          <Wallet className="h-4 w-4" /> Wallet
        </h3>
        <p className="text-white/70 text-sm mt-2">
          Wallet connection UI is intentionally simplified in this version. Use your preferred EVM wallet to receive tokens when claims open.
        </p>
        <a
          href="#/whitepaper"
          className="mt-4 inline-flex items-center justify-center w-full rounded-md border border-white/15 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 text-sm font-medium transition"
        >
          Read Whitepaper
        </a>
      </div>
    </div>
  );
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
