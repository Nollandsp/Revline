"use client";

export default function Marquee({ items = [], speed = "normal", className = "" }) {
  const doubled = [...items, ...items];
  const animClass =
    speed === "fast" ? "animate-marquee-fast" :
    speed === "slow" ? "animate-marquee-slow" :
    "animate-marquee";

  return (
    <div className={`marquee-wrapper overflow-hidden ${className}`}>
      <div className={`flex items-center whitespace-nowrap ${animClass}`}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-white/30 text-[10px] font-semibold tracking-[0.35em] uppercase px-6">
              {item}
            </span>
            <span className="w-1 h-1 bg-red-600 rounded-full flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
