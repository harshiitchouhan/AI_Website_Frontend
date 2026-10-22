import { useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { Link } from "react-router";
import { WebloomCTA, WebloomFooter, WebloomNavbar } from "./WebloomChrome";

const moodOptions = [
    {
        name: "Violet",
        primary: "#9570CF",
        secondary: "#C4A4F6",
        background: "#2D2050",
    },
    {
        name: "Electric",
        primary: "#297EAD",
        secondary: "#58C8EC",
        background: "#153E62",
    },
    {
        name: "Editorial",
        primary: "#AB6B87",
        secondary: "#FFC2C8",
        background: "#533046",
    },
];

const appear = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
};

const inView = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.15 },
};

export default function WhyWebloom() {
    const [selectedMood, setSelectedMood] = useState("Violet");
    const mood = moodOptions.find((option) => option.name === selectedMood);

    return (
        <MotionConfig reducedMotion="user">
            <div className="min-h-screen bg-[#090914] font-sans text-white selection:bg-violet-400/30">
                <WebloomNavbar />

                <main>
                    <section className="relative isolate overflow-hidden pb-24 pt-20 sm:pt-28 lg:pb-32">
                        <div className="pointer-events-none absolute -right-32 -top-25 -z-10 h-122.5 w-130 rounded-full bg-violet-800/15 blur-[110px]" />
                        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10">
                            <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.13 }}>
                                <motion.p variants={appear} className="mb-7 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C2A9F6]">
                                    Think it. See it. Shape it.
                                </motion.p>
                                <motion.h1 variants={appear} className="max-w-2xl text-5xl font-semibold leading-[1.06] tracking-[-0.07em] sm:text-6xl lg:text-[72px]">
                                    A creative process that <span className="font-serif font-normal italic text-[#C4ACF9]">feels different.</span>
                                </motion.h1>
                                <motion.p variants={appear} className="mt-8 max-w-md text-sm leading-8 text-slate-400 sm:text-base">
                                    Less time staring at an empty canvas. More time getting closer to what you had in mind.
                                    Start with your words and discover a direction worth exploring.
                                </motion.p>
                                <motion.div variants={appear} className="mt-8 flex flex-wrap items-center gap-4">
                                    <Link
                                        to="/studio"
                                        className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#161423] transition-all hover:-translate-y-0.5 hover:bg-[#E9DCFF]"
                                    >
                                        Try Webloom <span className="ml-3" aria-hidden="true">↗</span>
                                    </Link>
                                    <a href="#the-process" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                                        Explore the process ↓
                                    </a>
                                </motion.div>
                            </motion.div>

                            {/* A visual concept sequence; no backend or AI API is required. */}
                            <motion.div
                                initial={{ opacity: 0, y: 28, rotate: 1.5 }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                transition={{ duration: 0.75, delay: 0.2 }}
                                className="relative rounded-[26px] border border-white/10 bg-[#121423] p-4 shadow-[0_35px_90px_rgba(0,0,0,0.24)] sm:p-6"
                            >
                                <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-[#C6A5FC]" />
                                        Your idea
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.18em] text-violet-300">01 / Prompt</span>
                                </div>
                                <div className="mt-5 rounded-2xl border border-white/10 bg-[#0B0C17] p-5">
                                    <p className="text-sm leading-7 text-slate-200">
                                        “A beautiful portfolio for a creative developer, with rich colors and expressive typography.”
                                        <motion.span
                                            aria-hidden="true"
                                            className="ml-1 inline-block h-[1.1em] w-0.5 translate-y-1 bg-violet-300"
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ duration: 1.1, repeat: Infinity }}
                                        />
                                    </p>
                                </div>

                                <div className="my-6 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-violet-300">
                                    <span className="h-px flex-1 bg-linear-to-r from-transparent to-violet-500/30" />
                                    <motion.span
                                        animate={{ y: [0, 5, 0] }}
                                        transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        ↓ Your direction takes shape
                                    </motion.span>
                                    <span className="h-px flex-1 bg-linear-to-l from-transparent to-violet-500/30" />
                                </div>

                                <div className="overflow-hidden rounded-2xl border border-violet-200/15 bg-linear-to-br from-[#322153] to-[#151427]">
                                    <div className="flex h-12 items-center justify-between border-b border-white/10 px-5">
                                        <span className="text-sm font-bold tracking-tighter">alex.design</span>
                                        <span className="text-[10px] text-white/50">About&nbsp;&nbsp; Work&nbsp;&nbsp; Contact</span>
                                    </div>
                                    <div className="relative px-6 py-7">
                                        <div className="pointer-events-none absolute -right-6 top-0 h-48 w-48 rounded-full border border-white/10" />
                                        <p className="text-[9px] font-bold tracking-[0.23em] text-[#D1B6F8]">DESIGNER & DEVELOPER</p>
                                        <h3 className="relative mt-5 max-w-72.5 text-3xl font-semibold leading-[1.12] tracking-[-0.055em]">
                                            Ideas made to feel different.
                                        </h3>
                                        <motion.div
                                            className="mt-6 h-9 rounded-md bg-linear-to-r from-[#A57CF9] to-[#E272F2]"
                                            initial={{ width: 0 }}
                                            animate={{ width: 118 }}
                                            transition={{ duration: 0.9, delay: 0.9 }}
                                        />
                                        <div className="mt-8 grid grid-cols-3 gap-3">
                                            {[0, 1, 2].map((item) => (
                                                <motion.div
                                                    key={item}
                                                    className="h-14 rounded-lg border border-white/10 bg-white/[0.07]"
                                                    initial={{ opacity: 0, y: 12 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 1 + item * 0.15 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 text-center text-[11px] text-slate-500">Illustrative preview of the creative process</p>
                            </motion.div>
                        </div>
                    </section>

                    <section id="the-process" className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">
                        <motion.div {...inView} transition={{ staggerChildren: 0.11 }} className="mb-10 grid items-end gap-6 md:grid-cols-[1.4fr_0.8fr]">
                            <div>
                                <motion.p variants={appear} className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C4A9FA]">The Webloom approach</motion.p>
                                <motion.h2 variants={appear} className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.065em] sm:text-5xl">
                                    Your imagination leads. <span className="font-serif font-normal italic text-[#C4A9FA]">The design follows.</span>
                                </motion.h2>
                            </div>
                            <motion.p variants={appear} className="max-w-sm text-sm leading-7 text-slate-400 md:justify-self-end sm:text-base">
                                No need to know exactly how it should look before you start. Experiment, refine, and keep moving.
                            </motion.p>
                        </motion.div>

                        <div className="grid gap-4 lg:grid-cols-5">
                            <motion.article
                                {...inView}
                                variants={appear}
                                transition={{ duration: 0.5 }}
                                className="group relative min-h-108 overflow-hidden rounded-[26px] border border-white/10 bg-linear-to-br from-[#141425] to-[#140E28] p-7 sm:p-9 lg:col-span-3"
                            >
                                <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#C4A9FA]">01 / PROMPT TO STRUCTURE</p>
                                <h3 className="mt-8 max-w-sm text-3xl font-semibold leading-[1.15] tracking-[-0.055em] sm:text-4xl">
                                    Your words become the blueprint.
                                </h3>
                                <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                                    Write what you imagine. See it translated into sections, layout, and rhythm.
                                </p>
                                <div className="absolute -bottom-16 -right-16 left-10 h-60 -rotate-6 rounded-[20px] border border-violet-300/20 bg-[#0B0D1B] p-5 transition-transform duration-500 group-hover:-rotate-2">
                                    <div className="mb-6 flex gap-2">
                                        <span className="h-2 w-14 rounded-full bg-violet-400/65" />
                                        <span className="h-2 w-9 rounded-full bg-white/10" />
                                        <span className="h-2 w-9 rounded-full bg-white/10" />
                                    </div>
                                    <div className="h-11 w-3/4 rounded-lg bg-white/10" />
                                    <div className="mt-4 h-3 w-4/5 rounded-full bg-white/10" />
                                    <div className="mt-3 h-3 w-3/5 rounded-full bg-white/10" />
                                </div>
                            </motion.article>

                            <motion.article
                                {...inView}
                                variants={appear}
                                transition={{ duration: 0.5, delay: 0.08 }}
                                className="group relative min-h-108.5 overflow-hidden rounded-[26px] border border-white/10 bg-[#0E1724] p-7 sm:p-9 lg:col-span-2"
                            >
                                <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#62DFF2]">02 / RESPONSIVE BY DESIGN</p>
                                <h3 className="mt-8 max-w-xs text-3xl font-semibold leading-[1.15] tracking-[-0.055em] sm:text-4xl">
                                    One idea. Every screen.
                                </h3>
                                <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
                                    Shape layouts that feel considered from desktop to mobile.
                                </p>
                                <div className="absolute -bottom-12 left-1/3 h-48 w-85 rotate-[-9deg] rounded-[19px] border border-indigo-300/20 bg-[#232C49] p-4 transition-transform duration-500 group-hover:rotate-[-4deg]">
                                    <div className="mb-4 h-2 w-24 rounded-full bg-sky-300/45" />
                                    <div className="h-9 w-40 rounded-md bg-white/25" />
                                    <div className="mt-3 h-2 w-32 rounded-full bg-white/15" />
                                    <div className="mt-5 flex gap-2">
                                        <div className="h-16 w-20 rounded-md bg-cyan-500/35" />
                                        <div className="h-16 w-20 rounded-md bg-violet-400/25" />
                                        <div className="h-16 w-20 rounded-md bg-white/10" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-10 left-6 h-51.25 w-23.5 rotate-10 rounded-[19px] border-[5px] border-[#46506C] bg-[#131B30] p-2.5 transition-transform duration-500 group-hover:rotate-[4deg]">
                                    <div className="mx-auto mb-5 h-1 w-8 rounded-full bg-white/30" />
                                    <div className="h-3 w-12 rounded bg-cyan-400/40" />
                                    <div className="mt-4 h-12 rounded-md bg-white/10" />
                                    <div className="mt-3 h-2 w-8 rounded-full bg-white/20" />
                                </div>
                            </motion.article>

                            <motion.article
                                {...inView}
                                variants={appear}
                                transition={{ duration: 0.5, delay: 0.12 }}
                                className="relative overflow-hidden rounded-[26px] border border-violet-200/10 bg-[#151326] p-7 sm:p-9 lg:col-span-5"
                            >
                                <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#C4A9FA]">03 / MAKE IT YOURS</p>
                                        <h3 className="mt-7 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">A direction worth exploring.</h3>
                                        <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
                                            Explore different moods and visual treatments without losing the original idea. Select a palette to preview the change.
                                        </p>
                                        <p className="mt-5 text-xs text-violet-200">Selected: {selectedMood}</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {moodOptions.map((option) => (
                                            <button
                                                key={option.name}
                                                type="button"
                                                onClick={() => setSelectedMood(option.name)}
                                                aria-pressed={selectedMood === option.name}
                                                className={`group relative h-38.5 overflow-hidden rounded-[13px] border p-2.5 text-left transition-all duration-300 hover:-translate-y-2 sm:h-46.25 ${
                                                    selectedMood === option.name
                                                        ? "border-white/70 ring-2 ring-violet-300/40"
                                                        : "border-white/15 hover:border-white/40"
                                                }`}
                                                style={{ background: `linear-gradient(155deg, ${option.background}, ${option.primary})` }}
                                            >
                                                <span className="block h-1.5 w-4/5 rounded-full bg-white/50" />
                                                <span className="mt-6 block h-2.5 w-3/5 rounded-full bg-white/70" />
                                                <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-white/35" />
                                                <span className="absolute bottom-3 left-2.5 text-[10px] font-medium text-white sm:text-xs">{option.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ backgroundColor: mood.primary }}
                                    transition={{ duration: 0.35 }}
                                    className="absolute bottom-0 left-0 h-0.5 w-full"
                                    aria-hidden="true"
                                />
                            </motion.article>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
                        <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
                            <div>
                                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#C4A9FA]">Designed around your ideas</p>
                                <h2 className="text-3xl font-semibold leading-[1.15] tracking-[-0.055em] sm:text-4xl">
                                    The best starting point is <span className="font-serif font-normal italic text-[#C4A9FA]">yours.</span>
                                </h2>
                            </div>
                            <div className="space-y-0">
                                {[
                                    ["01", "Start with a thought", "Describe what you want in your own words."],
                                    ["02", "See a direction emerge", "Use visual concepts to make abstract ideas tangible."],
                                    ["03", "Shape what feels right", "Explore styles, refine details, and keep your voice in the design."],
                                ].map(([number, title, description]) => (
                                    <div key={number} className="grid grid-cols-[42px_1fr] gap-4 border-b border-white/10 py-6 first:pt-0">
                                        <span className="pt-1 text-xs font-semibold text-violet-300">{number}</span>
                                        <div>
                                            <h3 className="text-lg font-semibold tracking-[-0.035em]">{title}</h3>
                                            <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <WebloomCTA
                        eyebrow="FROM A THOUGHT TO A DIRECTION"
                        title="Make room for your next idea."
                        description="You bring the imagination. Webloom helps you explore a visual direction to make it real."
                    />
                </main>

                <WebloomFooter />
            </div>
        </MotionConfig>
    );
}
