import { useState, useEffect, useRef } from "react";

export default function BugattiButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Vérifie la taille écran
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Barre de progression
  useEffect(() => {
    let interval;
    if (isPlaying && audioRef.current && audioRef.current.duration > 0) {
      interval = setInterval(() => {
        const prog =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(prog);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Desktop : maintien
  const handleMouseDown = () => {
    if (!isDesktop || !audioRef.current) return;
    audioRef.current.play();
    setIsPlaying(true);
  };
  const handleMouseUp = () => {
    if (!isDesktop || !audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
  };

  // Mobile / tablette : simple click
  const handleClick = () => {
    if (isDesktop || !audioRef.current) return;
    if (!isPlaying) audioRef.current.play();
    else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <audio ref={audioRef} src="/Bugatti/BugattiSound2.mp3" preload="auto" />

      <button
        className="mt-6 w-full px-6 py-3 border-2 border-white text-white font-bold rounded 
             bg-transparent hover:bg-white hover:text-black transition-colors duration-300"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
      >
        {isPlaying
          ? "En cours..."
          : isDesktop
          ? "Maintenir pour écouter"
          : "Clique pour écouter"}
      </button>

      <div className="w-full h-2 bg-white/30 rounded mt-2 overflow-hidden">
        <div
          className="h-2 bg-red-600 rounded transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
