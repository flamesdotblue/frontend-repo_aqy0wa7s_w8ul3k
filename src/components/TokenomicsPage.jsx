import { Coins } from 'lucide-react';

const totalSupply = 21_000_000;
const initialPct = 0.75;
const airdropPct = 0.10;
const teamPct = 0.10;
const burnPct = 0.05;

const format = (n) => n.toLocaleString();

export default function TokenomicsPage() {
  const initialSupply = Math.round(totalSupply * initialPct);
  const airdropSupply = Math.round(totalSupply * airdropPct);
  const teamSupply = Math.round(totalSupply * teamPct);
  const burnSupply = Math.round(totalSupply * burnPct);

  const allocations = [
    { label: 'Initial Circulating', pct: 75, amount: initialSupply, color: 'from-cyan-500 to-blue-600' },
    { label: 'Airdrop / Pre-buy', pct: 10, amount: airdropSupply, color: 'from-emerald-500 to-teal-600' },
    { label: 'Team', pct: 10, amount: teamSupply, color: 'from-violet-500 to-fuchsia-600' },
    { label: 'Burn Reserve', pct: 5, amount: burnSupply, color: 'from-rose-500 to-orange-600' },
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Coins className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Tokenomics</h2>
            <p className="text-white/60">Transparent supply and distribution model for CYLRC.</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-white/70 text-sm">Total Supply</div>
            <div className="text-white text-3xl font-extrabold mt-1">{format(totalSupply)} CYLRC</div>

            <div className="mt-6 space-y-4">
              {allocations.map((a) => (
                <div key={a.label} className="">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>{a.label}</span>
                    <span>{a.pct}% — {format(a.amount)}</span>
                  </div>
                  <div className="mt-2 h-3 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${a.color}`} style={{ width: `${a.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-white/60 text-sm">
              Annual Burn: ~0.001% of total supply once per year from the Burn Reserve.
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-white/70 text-sm">Launch Snapshot</div>
              <div className="text-white font-semibold text-xl mt-1">{format(initialSupply)} circulating</div>
              <p className="text-white/60 text-sm mt-2">
                75% of supply is liquid at launch to support healthy market dynamics.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-white/70 text-sm">Growth & Community</div>
              <div className="text-white font-semibold text-xl mt-1">{format(airdropSupply)} for airdrops</div>
              <p className="text-white/60 text-sm mt-2">
                Targeted programs to reward early adopters and active contributors.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-white/70 text-sm">Team Alignment</div>
              <div className="text-white font-semibold text-xl mt-1">{format(teamSupply)} reserved</div>
              <p className="text-white/60 text-sm mt-2">
                Long-term incentives with clear vesting and transparency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
