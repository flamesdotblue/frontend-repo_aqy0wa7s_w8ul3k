import { Rocket } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-fuchsia-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> live
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
            cylrc — Community-first Crypto Airdrop
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Claim your share of the 21,000,000 CYLRC supply. 75% launches as circulating supply.
            The rest powers growth: airdrops, team, and a sustainable annual burn.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#/airdrop" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition">
              <Rocket className="h-4 w-4" /> Join the Airdrop
            </a>
            <a href="#/whitepaper" className="inline-flex items-center gap-2 rounded-md border border-white/15 text-white/90 hover:text-white hover:bg-white/10 px-5 py-3 text-sm font-medium transition">
              Read Whitepaper
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{
            title: 'Total Supply', value: '21,000,000 CYLRC', desc: 'Hard capped, no hidden mints.'
          }, {
            title: 'Initial Supply', value: '75% (15,750,000)', desc: 'Circulating at launch.'
          }, {
            title: 'Airdrop / Team / Burn', value: '10% / 10% / 5%', desc: 'Fair and transparent allocation.'
          }].map((card) => (
            <div key={card.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-white/60 text-sm">{card.title}</div>
              <div className="mt-1 text-white font-semibold text-xl">{card.value}</div>
              <div className="mt-1 text-white/60 text-sm">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
