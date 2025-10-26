import { Rocket } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-width interactive Spline background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Non-blocking gradient overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 min-h-[70vh] md:min-h-[80vh] xl:min-h-[90vh] flex items-center">
        <div className="w-full text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> live
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white to-orange-200/80 bg-clip-text text-transparent">
            cylrc — Community-first Crypto Airdrop
          </h1>
          <p className="mt-4 max-w-2xl text-white/80 md:pr-6">
            Claim your share of the 21,000,000 CYLRC supply. 75% launches as circulating supply.
            The rest powers growth: airdrops, team, and a sustainable annual burn.
          </p>
          <div className="mt-8 flex items-center justify-center md:justify-start gap-3">
            <a
              href="#/airdrop"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition"
            >
              <Rocket className="h-4 w-4" /> Join the Airdrop
            </a>
            <a
              href="#/whitepaper"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 text-white/90 hover:text-white hover:bg-white/10 px-5 py-3 text-sm font-medium transition"
            >
              Read Whitepaper
            </a>
          </div>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="relative mx-auto max-w-6xl px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{
            title: 'Total Supply',
            value: '21,000,000 CYLRC',
            desc: 'Hard capped, no hidden mints.'
          },{
            title: 'Initial Supply',
            value: '75% (15,750,000)',
            desc: 'Circulating at launch.'
          },{
            title: 'Airdrop / Team / Burn',
            value: '10% / 10% / 5%',
            desc: 'Fair and transparent allocation.'
          }].map((card) => (
            <div key={card.title} className="rounded-xl border border-white/10 bg-white/5/20 backdrop-blur p-5">
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
