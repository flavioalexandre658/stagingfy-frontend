"use client";
import { motion } from "framer-motion";

const logos = [
  "https://cdn.homedesigns.ai/web/images/gs-offer-logos1.svg",
  "https://cdn.homedesigns.ai/web/images/gs-offer-logos2.png",
  "https://cdn.homedesigns.ai/web/images/gs-offer-logos3.svg",
  "https://cdn.homedesigns.ai/web/images/gs-offer-logos4.png",
  "https://cdn.homedesigns.ai/web/images/gs-offer-logos5.svg",
  "https://cdn.homedesigns.ai/web/images/gs-offer-logos6.svg",
  "https://cdn.homedesigns.ai/web/images/gs-offer-logos7.svg",
  "https://cdn.homedesigns.ai/web/images/gs-offer-logos8.svg",
];

export function OfferLogosMarquee() {
  const seq = [...logos, ...logos];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 py-6">
        <motion.div
          className="flex gap-8"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {seq.map((src, i) => (
            <img key={i} src={src} alt="logo" className="h-8 sm:h-10 opacity-80" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}