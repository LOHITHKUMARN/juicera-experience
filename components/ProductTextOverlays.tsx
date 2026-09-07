"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

interface ProductTextOverlaysProps {
  progress: MotionValue<number>;
  price: string;
  features: string[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  section3: { title: string; subtitle: string };
  section4: { title: string; subtitle: string };
}

const TextBlock = ({
  title,
  subtitle,
  price,
  features,
  progress,
  range,
  type,
}: {
  title: string;
  subtitle: string;
  price?: string;
  features?: string[];
  progress: MotionValue<number>;
  range: [number, number, number, number];
  type: "hero" | "left" | "right" | "conclusion";
}) => {
  const isHero = type === "hero";
  const isConclusion = type === "conclusion";

  // Ensure strictly increasing values
  const r0 = range[0];
  const r1 = Math.max(r0 + 0.001, range[1]);
  const r2 = Math.max(r1 + 0.001, range[2]);
  const r3 = Math.max(r2 + 0.001, range[3]);
  const safeRange = [r0, r1, r2, r3];

  const heroVisibility = useTransform(progress, (p) => {
    if (isHero && p > range[3]) return "hidden";
    return "visible";
  });

  const opacityValues = isHero
    ? [1, 1, 1, 0]
    : isConclusion
      ? [0, 1, 1, 1]
      : [0, 1, 1, 0];

  const opacity = useTransform(progress, safeRange, opacityValues, { clamp: true });

  const yStart = isHero ? 0 : 40;
  const yEnd = isConclusion ? 0 : -40;
  const yValues = isHero ? [0, 0, 0, -40] : [yStart, 0, 0, yEnd];
  const y = useTransform(progress, safeRange, yValues, { clamp: true });

  const scaleValues = isHero ? [1, 1, 1, 0.95] : [1.04, 1, 1, 0.96];
  const scale = useTransform(progress, safeRange, scaleValues, { clamp: true });

  const layoutStyles: Record<string, string> = {
    hero: "items-center text-center left-0 right-0 max-w-6xl mx-auto px-6",
    left: "items-start text-left left-[8%] w-auto max-w-[45%] px-6",
    right: "items-end text-right right-[8%] w-auto max-w-[45%] px-6",
    conclusion: "items-center text-center left-0 right-0 max-w-6xl mx-auto px-6",
  };

  const titleSizes: Record<string, string> = {
    hero: "text-5xl md:text-[7.5rem] font-headline font-black leading-[0.92] tracking-[-0.03em]",
    left: "text-4xl md:text-[4.5rem] font-headline font-black leading-[0.95] tracking-[-0.02em]",
    right: "text-4xl md:text-[4.5rem] font-headline font-black leading-[0.95] tracking-[-0.02em]",
    conclusion: "text-5xl md:text-[6rem] font-headline font-black leading-[0.92] tracking-[-0.02em]",
  };

  const subtitleAlign: Record<string, string> = {
    hero: "text-center",
    left: "text-left",
    right: "text-right",
    conclusion: "text-center",
  };

  return (
    <motion.div
      initial={{ opacity: isHero ? 1 : 0, y: isHero ? 0 : 40 }}
      style={{ opacity, y, scale, visibility: heroVisibility }}
      className={`absolute top-1/2 -translate-y-1/2 flex flex-col pointer-events-none ${layoutStyles[type]}`}
    >
      <h2
        className={`${titleSizes[type]} text-[#F5F5F5] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] uppercase`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-lg md:text-xl text-[#F5F5F5]/80 font-sans font-medium mt-6 max-w-xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] leading-relaxed ${subtitleAlign[type]}`}
        >
          {subtitle}
        </p>
      )}

      {/* HERO PRICE & SPECS */}
      {isHero && price && (
        <div className="flex items-center gap-10 mt-14 drop-shadow-2xl">
          <div className="text-6xl md:text-8xl font-headline font-black tracking-[-0.03em] text-[#F5F5F5] drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            {price}
          </div>
          <div className="h-20 w-px bg-white/20 hidden md:block" />
          <ul className="text-left space-y-3 hidden md:block mt-2">
            {features?.map((f, i) => (
              <li
                key={i}
                className="text-xs md:text-sm uppercase tracking-[0.3em] font-headline font-black text-[#F5F5F5]/60"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export const ProductTextOverlays: React.FC<ProductTextOverlaysProps> = ({
  progress,
  price,
  features,
  section1,
  section2,
  section3,
  section4,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full h-[500vh]">
      <div className="sticky top-0 h-screen w-full relative overflow-hidden">

        {/* SECTION 1: HERO — 0.0 → 0.20 */}
        <TextBlock
          title={section1.title}
          subtitle={section1.subtitle}
          price={price}
          features={features}
          progress={progress}
          range={[0.0, 0.05, 0.15, 0.20]}
          type="hero"
        />

        {/* SECTION 2: LEFT — 0.22 → 0.45 */}
        <TextBlock
          title={section2.title}
          subtitle={section2.subtitle}
          progress={progress}
          range={[0.22, 0.27, 0.40, 0.45]}
          type="left"
        />

        {/* SECTION 3: RIGHT — 0.48 → 0.75 */}
        <TextBlock
          title={section3.title}
          subtitle={section3.subtitle}
          progress={progress}
          range={[0.48, 0.53, 0.70, 0.75]}
          type="right"
        />

        {/* SECTION 4: CONCLUSION — 0.80 → 1.0 */}
        <TextBlock
          title={section4.title}
          subtitle={section4.subtitle}
          progress={progress}
          range={[0.80, 0.85, 0.99, 1.0]}
          type="conclusion"
        />
      </div>
    </div>
  );
};
