"use client"

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "Solidity",
  "TailwindCSS",
  "Machine Learning",
  "LSTM",
  "Node.js",
  "Ethereum",
  "Java",
  "C++",
  "Git",
]

export const TechStack = () => {
  // Duplicated once so the marquee can loop seamlessly (translateX -50%).
  const items = [...stack, ...stack]

  return (
    <section className="relative z-10 py-12">
      <p className="text-center font-kalam text-lg text-gray-500 dark:text-gray-400 mb-6">
        tools I build with
      </p>

      <div className="marquee-track relative overflow-hidden">
        {/* Fade edges so pills dissolve in/out */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-soft-lavender dark:from-[#0d0d18] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-soft-lavender dark:from-[#0d0d18] to-transparent" />

        <div className="animate-marquee flex w-max gap-4">
          {items.map((tech, i) => (
            <span
              key={i}
              aria-hidden={i >= stack.length}
              className="whitespace-nowrap rounded-xl border border-deep-violet/20 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm"
              style={{ clipPath: "polygon(4% 0%, 96% 4%, 100% 96%, 0% 100%)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
