import React, { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Link } from "react-router";
import { WebloomCTA, WebloomFooter, WebloomNavbar } from "./WebloomChrome";

const concepts = [
    {
        id: "portfolio",
        number: "01",
        name: "Portfolio",
        brand: "alex.design",
        label: "DESIGNER & DEVELOPER",
        heading: "Building digital things that feel different.",
        caption: "For people who make things worth showing.",
        description: "A personal space where your work, personality, and point of view come together.",
        gradient: "from-[#3B2869] via-[#30203C] to-[#171226]",
        accent: "from-[#A779FA] to-[#DF6BEE]",
        highlight: "#C6A5FF",
        prompt: "Create a modern designer portfolio with bold typography, a rich violet dark theme, a project showcase, and a thoughtful about section.",
    },
    {
        id: "startup",
        number: "02",
        name: "Startup",
        brand: "flowstate.",
        label: "A BETTER WAY TO WORK",
        heading: "Less busywork. More brilliant ideas.",
        caption: "For products with something new to say.",
        description: "Put your product story first with a confident, energetic digital presence.",
        gradient: "from-[#133D57] via-[#222E50] to-[#161827]",
        accent: "from-[#45DBE7] to-[#538CFC]",
        highlight: "#67DFF3",
        prompt: "Create an energetic SaaS startup landing page with a navy and cyan color palette, clear value proposition, feature highlights, and a strong call to action.",
    },
    {
        id: "studio",
        number: "03",
        name: "Creative studio",
        brand: "STUDIO / FORM",
        label: "INDEPENDENT CREATIVE STUDIO",
        heading: "We make the unfamiliar unforgettable.",
        caption: "For ideas that refuse to blend in.",
        description: "An expressive home for your creative work, services, and collaborators.",
        gradient: "from-[#512034] via-[#382832] to-[#181525]",
        accent: "from-[#FFB26E] to-[#FF668B]",
        highlight: "#FFB38A",
        prompt: "Create a bold creative agency website with editorial typography, a warm coral-and-burgundy palette, an engaging portfolio, and an original studio introduction.",
    },
];

const reveal = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

function ConceptCard({ concept, selected, onSelect }) {
    return (
        <motion.button
            type="button"
            onClick={onSelect}
            aria-pressed={selected}
            whileHover={{ y: -7 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 240, damping: 23 }}
            className={`group w-full overflow-hidden rounded-[26px] border p-4 text-left transition-colors sm:p-5 ${
                selected
                    ? "border-violet-300/45 bg-[#18162B]"
                    : "border-white/10 bg-[#141422] hover:border-violet-300/30"
            }`}
        >
            <div className={`relative h-63.75 overflow-hidden rounded-[18px] border border-white/10 bg-linear-to-br ${concept.gradient} sm:h-67.5`}>
                <div className="pointer-events-none absolute -right-8 top-16 h-52 w-52 rounded-full border border-white/12" />
                <div className="pointer-events-none absolute -right-2 top-24 h-36 w-36 rounded-full border border-white/7" />

                <div className="relative z-10 flex h-14 items-center justify-between border-b border-white/10 px-5">
                    <span className="text-sm font-extrabold tracking-[-0.04em] text-white">{concept.brand}</span>
                    <span className="text-[10px] text-white/55">Home&nbsp;&nbsp; About&nbsp;&nbsp; Work</span>
                </div>
                <div className="relative z-10 px-5 pt-9">
                    <p className="text-[9px] font-bold tracking-[0.23em] text-white/60">{concept.label}</p>
                    <h3 className="mt-5 max-w-65 text-[24px] font-semibold leading-[1.13] tracking-[-0.055em] text-white sm:text-[27px]">
                        {concept.heading}
                    </h3>
                    <div className={`mt-6 h-9 w-28 rounded-md bg-linear-to-r ${concept.accent} transition-all duration-300 group-hover:w-32`} />
                </div>
                <div className="absolute inset-x-5 bottom-4 flex gap-2.5">
                    {[0, 1, 2].map((item) => (
                        <div key={item} className="h-8 flex-1 rounded-md border border-white/10 bg-white/4" />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between gap-3 px-1 pb-1 pt-7">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.07em] text-slate-500">
                        {concept.number} / WEBLOOM CONCEPT
                    </p>
                    <h4 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white">{concept.name}</h4>
                </div>
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-lg transition-all group-hover:-translate-y-1 group-hover:translate-x-1 ${
                    selected ? "border-violet-300/50 text-violet-200" : "border-white/15 text-white/65"
                }`} aria-hidden="true">↗</span>
            </div>
        </motion.button>
    );
}

export default function Explore() {
    const [selectedId, setSelectedId] = useState("portfolio");
    const [copyStatus, setCopyStatus] = useState("");
    const selected = concepts.find((concept) => concept.id === selectedId);

    async function copyPrompt() {
        try {
            await navigator.clipboard.writeText(selected.prompt);
            setCopyStatus("Copied to clipboard");
        } catch {
            setCopyStatus("Could not copy. Select the prompt below instead.");
        }
    }

    function selectConcept(id) {
        setSelectedId(id);
        setCopyStatus("");
    }

    return (
        <MotionConfig reducedMotion="user">
            <div className="min-h-screen bg-[#090914] font-sans text-white selection:bg-violet-400/30">
                <WebloomNavbar />

                <main>
                    <section className="relative isolate overflow-hidden pb-20 pt-20 sm:pb-24 sm:pt-28">
                        <div className="pointer-events-none absolute left-1/2 -top-72.5 -z-10 h-142 w-175 -translate-x-1/2 rounded-full bg-violet-900/15 blur-[115px]" />
                        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                transition={{ staggerChildren: 0.12 }}
                                className="mb-14 grid items-end gap-8 md:grid-cols-[1.8fr_1fr] md:gap-16"
                            >
                                <div>
                                    <motion.p variants={reveal} className="mb-7 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C6ADF8]">
                                        Explore the possibilities
                                    </motion.p>
                                    <motion.h1 variants={reveal} className="max-w-212 text-5xl font-semibold leading-[1.06] tracking-[-0.07em] sm:text-6xl lg:text-[72px]">
                                        Every idea has a <span className="font-serif font-normal italic text-[#C1A8FA]">different look.</span>
                                    </motion.h1>
                                </div>
                                <motion.p variants={reveal} className="max-w-sm text-sm leading-8 text-slate-400 md:pb-3 sm:text-base">
                                    A few starting points. Countless ways to make them yours. Explore a direction, then shape it into your own.
                                </motion.p>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ staggerChildren: 0.11 }}
                                className="grid gap-5 lg:grid-cols-3"
                            >
                                {concepts.map((concept) => (
                                    <motion.div key={concept.id} variants={reveal}>
                                        <ConceptCard
                                            concept={concept}
                                            selected={selectedId === concept.id}
                                            onSelect={() => selectConcept(concept.id)}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
                        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.26em] text-[#C6ADF8]">Make it yours</p>
                                <h2 className="text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">A direction, not a limit.</h2>
                            </div>
                            <span className="text-xs text-slate-500">Select a concept above to explore its prompt.</span>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selected.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="grid overflow-hidden rounded-[26px] border border-white/10 bg-[#131322] md:grid-cols-[1fr_1.05fr]"
                            >
                                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                                    <span className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: selected.highlight }}>
                                        Selected concept / {selected.number}
                                    </span>
                                    <h3 className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{selected.name}</h3>
                                    <p className="mt-3 text-lg font-medium text-slate-300">{selected.caption}</p>
                                    <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">{selected.description}</p>
                                    <div className="mt-8 flex flex-wrap items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={copyPrompt}
                                            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#141320] transition-colors hover:bg-violet-100"
                                        >
                                            Copy sample prompt ↗
                                        </button>
                                    </div>
                                    <p aria-live="polite" className="mt-3 min-h-5 text-xs text-violet-200">{copyStatus}</p>
                                </div>
                                <div className="flex min-h-72.5 items-center justify-center border-t border-white/10 bg-[#0D0E1A] p-6 md:border-l md:border-t-0 sm:p-9">
                                    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#171725] shadow-2xl shadow-black/25">
                                        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                                            <span className="h-2 w-2 rounded-full bg-[#ED6686]" />
                                            <span className="h-2 w-2 rounded-full bg-[#E6B74F]" />
                                            <span className="h-2 w-2 rounded-full bg-[#4BBF9A]" />
                                            <span className="ml-auto text-[10px] text-slate-500">YOUR STARTING PROMPT</span>
                                        </div>
                                        <div className="p-6">
                                            <span className="mb-4 block text-[11px] font-semibold text-violet-300">Try this prompt</span>
                                            <p className="select-text text-base leading-8 text-white/85">“{selected.prompt}”</p>
                                            <div className="mt-8 flex items-center gap-2 border-t border-white/10 pt-4">
                                                <motion.span
                                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="h-2 w-2 rounded-full bg-violet-300"
                                                />
                                                <span className="text-xs text-slate-500">Ready to make it your own</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </section>

                    <WebloomCTA
                        eyebrow="A BLANK CANVAS, WITHOUT THE BLANK STARE"
                        title="Your idea. Your aesthetic."
                        description="Start with a concept or ignore the rules entirely. Webloom is a place to explore what your website could be."
                    />
                </main>

                <WebloomFooter />
            </div>
        </MotionConfig>
    );
}
