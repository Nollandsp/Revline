import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/4 rounded-full blur-[150px]" />
      </div>

      {/* Big 404 */}
      <div className="relative select-none mb-8" aria-hidden="true">
        <span className="font-display text-[clamp(7rem,25vw,20rem)] leading-none text-white/[0.04]">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-white uppercase">
            404
          </span>
        </div>
      </div>

      {/* Red divider */}
      <div className="w-16 h-[2px] bg-red-600 mb-8" />

      {/* Logo */}
      <Link href="/" className="mb-8">
        <Image
          src="/RevlineLogo.png"
          alt="Revline"
          width={120}
          height={60}
          className="object-contain h-12 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </Link>

      <h1 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] text-white uppercase leading-none mb-4 text-center">
        Page introuvable
      </h1>
      <p className="text-white/35 text-sm sm:text-base max-w-xs text-center leading-relaxed mb-10 font-body">
        Cette page n&apos;existe pas ou a été déplacée. Retournez au showroom.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/">
          <button className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300 cursor-pointer font-body">
            Retour à l&apos;accueil
          </button>
        </Link>
        <Link href="/Showroom">
          <button className="text-white/55 hover:text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-8 py-4 border border-white/12 hover:border-white/35 transition-all duration-300 cursor-pointer font-body">
            Voir le Showroom
          </button>
        </Link>
      </div>
    </div>
  );
}
