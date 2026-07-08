const LOGOS = ["Angel Doces", "Construfé", "Top Show"];

export default function LogoMarquee() {
  // Repete a lista para criar um loop contínuo no marquee
  const items = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <section className="py-12 border-y border-white/5 bg-[#0c1322]" data-testid="logo-marquee">
      <div className="container-x">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 mb-6">
          Empresas que confiam na SGS
        </p>
      </div>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex gap-14 whitespace-nowrap w-max">
          {items.map((name, i) => (
            <div
              key={i}
              className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-500/70 hover:text-white transition grayscale hover:grayscale-0"
            >
              {name}
              <sup className="text-sgs-green ml-0.5">●</sup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
