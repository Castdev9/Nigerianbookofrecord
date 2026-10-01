import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, Calendar, PlusCircle, CheckCircle2 } from 'lucide-react';
import { NigeriaCoatOfArms, NigeriaEmblem } from '../common/NigeriaLogo';

interface HeroProps {
  onExploreIcons: () => void;
  onExploreTimeline: () => void;
  onSubmitHero: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreIcons,
  onExploreTimeline,
  onSubmitHero,
}) => {
  // Target: October 1, 2026 00:00:00 WAT (West Africa Time, UTC+1)
  const targetDate = new Date('2026-10-01T00:00:00+01:00').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isPast: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#040806] pt-12 pb-20">
      {/* Background Ambience: Flag-inspired subtle green & gold gradients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Green Ribbon */}
        <div className="absolute -left-20 top-0 h-full w-1/3 bg-radial from-[#008751]/20 via-[#008751]/5 to-transparent blur-3xl opacity-60" />
        {/* Right Green Ribbon */}
        <div className="absolute -right-20 top-0 h-full w-1/3 bg-radial from-[#008751]/20 via-[#008751]/5 to-transparent blur-3xl opacity-60" />
        {/* Center Golden Jubilee Radiance */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-radial from-amber-500/10 via-emerald-600/5 to-transparent blur-3xl" />
        {/* Archival Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* National Anniversary Header Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 text-xs text-emerald-300 backdrop-blur-md mb-6">
          <NigeriaEmblem size="sm" />
          <span className="font-semibold tracking-wider uppercase">NIGERIA @ 66 JUBILEE ARCHIVE</span>
          <span className="text-emerald-500">·</span>
          <span className="text-stone-300">October 1, 1960 → October 1, 2026</span>
        </div>

        {/* Official Coat of Arms Display */}
        <div className="flex justify-center mb-4">
          <NigeriaCoatOfArms className="h-16 w-16 sm:h-20 sm:w-20 transition-transform hover:scale-105" />
        </div>

        {/* Main Display Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">
          <span className="flex items-center justify-center gap-3 text-stone-300 text-2xl sm:text-3xl lg:text-4xl font-normal tracking-widest uppercase mb-2">
            <span>9JA BOOK OF RECORDS</span>
          </span>
          <span className="bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-clip-text text-transparent">
            66 Years of Nigeria
          </span>
        </h1>

        {/* Core Rhythmic Tagline */}
        <div className="mx-auto max-w-3xl mb-8 space-y-1">
          <p className="font-editorial text-xl sm:text-2xl md:text-3xl text-emerald-200/90 italic font-medium">
            "66 Years of History · 66 Years of People · 66 Years of Ideas"
          </p>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed mt-4">
            Celebrating the people. Preserving the stories. Recording the legacy. Explore the collective struggle, pioneer leaders, cultural titans, and verified records that shaped Africa's giant.
          </p>
        </div>

        {/* 3 Call-To-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={onExploreIcons}
            className="group flex items-center gap-2.5 rounded-lg border border-emerald-500/50 bg-[#008751] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/60 transition-all hover:bg-[#009b5d] hover:scale-[1.02]"
          >
            <Compass className="h-4 w-4 transition-transform group-hover:rotate-45" />
            <span>Explore Nigerian Icons</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExploreTimeline}
            className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-stone-200 backdrop-blur-md transition-all hover:bg-white/10 hover:border-emerald-500/40 hover:text-white"
          >
            <Calendar className="h-4 w-4 text-emerald-400" />
            <span>Explore Nigeria's Timeline</span>
          </button>

          <button
            onClick={onSubmitHero}
            className="flex items-center gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-6 py-3.5 text-sm font-medium text-amber-200 backdrop-blur-md transition-all hover:bg-amber-500/20 hover:border-amber-400"
          >
            <PlusCircle className="h-4 w-4 text-amber-400" />
            <span>Submit a Nigerian Hero</span>
          </button>
        </div>

        {/* Live Countdown Area */}
        <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#0d1611]/80 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
          {timeLeft.isPast ? (
            <div className="py-2 text-center">
              <div className="inline-flex items-center gap-2 text-emerald-400 font-display text-lg sm:text-2xl font-bold">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                Happy 66th Independence Anniversary, Nigeria! 🇳🇬
              </div>
              <p className="text-xs sm:text-sm text-stone-400 mt-2">
                1960 – 2026: Celebrating 66 years of unbroken sovereign nationhood.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium">
                  Countdown to Independence Day 2026
                </span>
                <span className="text-xs text-stone-400">October 1, 2026</span>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="rounded-lg bg-black/40 p-2.5 sm:p-3 border border-white/5">
                  <span className="block font-display text-2xl sm:text-4xl font-bold text-white tabular-nums">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400">Days</span>
                </div>
                <div className="rounded-lg bg-black/40 p-2.5 sm:p-3 border border-white/5">
                  <span className="block font-display text-2xl sm:text-4xl font-bold text-white tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400">Hours</span>
                </div>
                <div className="rounded-lg bg-black/40 p-2.5 sm:p-3 border border-white/5">
                  <span className="block font-display text-2xl sm:text-4xl font-bold text-white tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400">Minutes</span>
                </div>
                <div className="rounded-lg bg-black/40 p-2.5 sm:p-3 border border-white/5">
                  <span className="block font-display text-2xl sm:text-4xl font-bold text-emerald-400 tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400">Seconds</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 🏆 Homepage Sports Feature Card */}
        <div className="mt-8 max-w-xl mx-auto p-4 sm:p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 backdrop-blur-md text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <span className="text-base">🏆</span>
              <span className="tracking-wide">NIGERIAN SPORTING LEGENDS</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-editorial italic">
              Discover the athletes and footballers who made Nigerian sporting history.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('sports-legends');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-nigeria-primary px-4 py-2.5 text-xs font-bold rounded-lg whitespace-nowrap shadow-md flex items-center gap-1.5 self-stretch sm:self-auto justify-center"
          >
            <span>EXPLORE SPORTS HISTORY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
