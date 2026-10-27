import { useState } from "react";
import {
    AnimatePresence,
    MotionConfig,
    motion,
    useReducedMotion,
    useScroll,
    useSpring
} from "framer-motion";

import Navbar from "../Components/layouts/Navbar";
import Footer from "../Components/layouts/Footer";
import Hero from "../Components/layouts/Hero";

// Replace the sample concepts with API results when website generation is connected.
const concepts = [
    {
        id: "portfolio",
        label: "Portfolio",
        keywords: ["portfolio", "developer", "designer", "personal"],
        prompt: "Create a modern developer portfolio with bold typography, a dark theme, and an elegant project showcase.",
        brand: "alex.design",
        eyebrow: "DESIGNER & DEVELOPER",
        title: "Building digital things that feel different.",
        description: "Thoughtful design. Clean code. Experiences made to connect.",
        button: "Explore my work",
        gradient: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
        accent: "from-violet-400 to-fuchsia-400",
        details: ["Selected work", "Creative process", "Get in touch"]
    },
    {
        id: "startup",
        label: "Startup",
        keywords: ["startup", "saas", "business", "product", "app"],
        prompt: "Build a beautiful SaaS landing page for a productivity app with a clean hero and feature highlights.",
        brand: "flowstate.",
        eyebrow: "A BETTER WAY TO WORK",
        title: "Less busywork. More brilliant ideas.",
        description: "Your projects, notes, and people, in one calm place.",
        button: "Discover Flowstate",
        gradient: "from-cyan-500/25 via-blue-500/15 to-transparent",
        accent: "from-cyan-300 to-blue-400",
        details: ["One workspace", "More focus", "Better together"]
    },
    {
        id: "studio",
        label: "Creative studio",
        keywords: ["agency", "studio", "creative", "brand"],
        prompt: "Design an expressive creative studio website with oversized headlines and a warm modern color palette.",
        brand: "STUDIO / FORM",
        eyebrow: "INDEPENDENT CREATIVE STUDIO",
        title: "We make the unfamiliar unforgettable.",
        description: "Identity, direction, and digital design for what's next.",
        button: "See our projects",
        gradient: "from-rose-500/25 via-orange-500/10 to-transparent",
        accent: "from-orange-300 to-rose-400",
        details: ["Brand identity", "Digital experiences", "Art direction"]
    }
];


const reveal = {
    hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const sequence = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
};

// Preserved Webloom Studio preview design from the version you selected.
function WebsitePreview({ concept }) {
    return (
        <div className="relative flex min-h-88.75 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c1120] sm:min-h-106.25">
            <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${concept.gradient}`} />
            <div className="pointer-events-none absolute -right-12 top-12 h-60 w-60 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-4 top-20 h-44 w-44 rounded-full border border-white/10" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={concept.id}
                    initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(5px)" }}
                    transition={{ duration: 0.35 }}
                    className="relative z-10 flex flex-1 flex-col"
                >
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
                        <span className="text-sm font-bold tracking-tight text-white">
                            {concept.brand}
                        </span>
                        <div className="hidden gap-5 text-[10px] text-white/55 sm:flex">
                            <span>About</span>
                            <span>Projects</span>
                            <span>Contact</span>
                        </div>
                        <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] text-white/80">
                            Let's talk
                        </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-9">
                        <div className="mb-5 flex items-center gap-2 text-[10px] font-medium tracking-[0.22em] text-white/65">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                            {concept.eyebrow}
                        </div>
                        <h3 className="max-97.5 text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-[43px]">
                            {concept.title}
                        </h3>
                        <p className="mt-4 max-w-82.5 text-xs leading-6 text-white/60 sm:text-sm">
                            {concept.description}
                        </p>
                        <div className="mt-7">
                            <span className={`inline-flex rounded-lg bg-linear-to-r ${concept.accent} px-4 py-2.5 text-xs font-semibold text-[#0b0d18]`}>
                                {concept.button}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 px-4 pb-4 sm:gap-3 sm:px-6 sm:pb-6">
                        {concept.details.map((detail, index) => (
                            <div
                                key={detail}
                                className="relative flex h-16.5 items-end overflow-hidden rounded-lg border border-white/10 bg-white/4 p-3 sm:h-21.5"
                            >
                                <div className={`absolute -right-5 -top-8 h-20 w-20 rounded-full bg-linear-to-br ${concept.accent} ${index === 1 ? "opacity-20" : "opacity-10"} blur-2xl`} />
                                <span className="relative text-[10px] leading-4 text-white/75 sm:text-xs">
                                    {detail}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}


function TemplateArt({ concept }) {
    return (
        <div className={`relative h-59.5 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br ${concept.gradient} bg-[#171627] sm:h-66.25`}>
            
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(255,255,255,0.08),transparent_55%)]" />
            <div className="absolute -right-10 top-16 h-44 w-44 rounded-full border border-white/10" />
            
            <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-[12px] font-bold">{concept.brand}</span>
                <span className="text-[9px] text-white/50">Home &nbsp; About &nbsp; Work</span>
            </div>

            <div className="relative px-5 pt-7">
                <span className="text-[9px] font-semibold tracking-[0.2em] text-violet-200/85">{concept.eyebrow}</span>
                <h3 className="mt-4 max-w-61.25 text-[23px] font-semibold leading-[1.13] tracking-tight">{concept.title}</h3>
                <div className={`mt-5 h-7 w-24 rounded-md bg-linear-to-r ${concept.accent}`} />
            </div>

            <div className="absolute bottom-3 left-5 right-5 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((item) => (
                    <div key={item} className="h-8 rounded-md border border-white/10 bg-white/4" />
                ))}
            </div>

            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/5.5 to-transparent"
                initial={{ x: "-120%" }}
                whileHover={{ x: "120%" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
            />
            
        </div>
    );
}

function Home() {
    const [prompt, setPrompt] = useState("");
    const [selectedConcept, setSelectedConcept] = useState(concepts[0]);
    const [hasPreviewed, setHasPreviewed] = useState(false);
    const [colorway, setColorway] = useState("violet");
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const chooseExample = (concept) => {
        setPrompt(concept.prompt);
        setSelectedConcept(concept);
        setHasPreviewed(true);
    };

    const handlePreview = (event) => {
        event.preventDefault();
        if (!prompt.trim()) return;

        const search = prompt.toLowerCase();
        const match = concepts.find((concept) =>
            concept.keywords.some((keyword) => search.includes(keyword))
        );

        setSelectedConcept(match || concepts[0]);
        setHasPreviewed(true);
    };

    const exploreTemplate = (concept) => {
        chooseExample(concept);
        document.getElementById("studio")?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start"
        });
    };

    return (
        <MotionConfig reducedMotion="user">
        <div id="top" className="relative isolate min-h-screen overflow-hidden bg-[#080914] font-sans text-white antialiased selection:bg-violet-500/35">
            <motion.div className="fixed left-0 top-0 z-70 h-0.5 origin-left bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400" style={{ scaleX: progress, width: "100%" }} aria-hidden="true" />

            {/* Subtle background depth. The main lighting belongs to the hero. */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-237.5 bg-[radial-gradient(ellipse_at_50%_0%,rgba(93,58,168,0.1),transparent_68%)]" />
                <div className="absolute inset-x-0 top-250 h-225 bg-[radial-gradient(ellipse_at_0%_50%,rgba(50,64,150,0.055),transparent_55%)]" />
            </div>

            <Navbar />

            <main className="relative z-10">
                <Hero concepts={concepts} reveal={reveal} sequence={sequence} reduceMotion={reduceMotion} />

                {/* Interactive studio */}
                <section id="studio" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-28 sm:px-8 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 65, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        className="relative rounded-[27px] border border-violet-300/15 bg-[#101321] p-1.5 shadow-[0_25px_110px_rgba(0,0,0,0.55),0_0_90px_rgba(124,58,237,0.09)]"
                    >
                        <div className="flex h-12 items-center justify-between gap-2 border-b border-white/[0.07] px-4 sm:px-6">
                            
                            <div className="flex items-center gap-2" aria-hidden="true">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#fb7185]/80" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]/80" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]/80" />
                            </div>

                            <span className="text-xs font-medium tracking-wide text-white/50">Webloom Studio</span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] tracking-wider text-white/50">DEMO</span>
                        </div>

                        <div className="grid gap-5 p-3 sm:p-5 lg:grid-cols-[0.88fr_1.12fr] lg:gap-6 lg:p-6">
                            <div className="flex flex-col justify-center px-2 py-5 sm:px-3 lg:py-10">
                                <div className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-violet-300">YOUR CREATIVE SPACE</div>
                                <h2 className="max-w-sm text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                                    What are we <span className="text-violet-300">building?</span>
                                </h2>
                                <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
                                    Write a few words about your idea, or choose a sample to explore the preview.
                                </p>

                                <form onSubmit={handlePreview} className="mt-8 rounded-2xl border border-white/15 bg-[#090c17] p-4 transition-colors focus-within:border-violet-400/50">
                                    
                                    <label htmlFor="website-prompt" className="mb-3 block text-xs font-medium text-slate-300">
                                        Describe your dream website
                                    </label>

                                    <textarea
                                        id="website-prompt"
                                        value={prompt}
                                        onChange={(event) => setPrompt(event.target.value)}
                                        placeholder="A modern portfolio with expressive typography, subtle animation, and a gallery of my work..."
                                        className="h-32 w-full resize-none bg-transparent text-sm leading-6 text-white outline-none placeholder:text-slate-600"
                                    />

                                    <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                                        <span className="text-[11px] text-slate-500">Your idea, your style.</span>
                                        
                                        <button
                                            type="submit"
                                            disabled={!prompt.trim()}
                                            className="rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-[#0a0c17] transition enabled:hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Preview concept
                                        </button>

                                    </div>
                                </form>

                                {/* <div className="mt-6">
                                    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.13em] text-slate-500">Try an example</p>
                                    <div className="flex flex-wrap gap-2">
                                        {concepts.map((concept) => (
                                            <button
                                                key={concept.id}
                                                type="button"
                                                onClick={() => chooseExample(concept)}
                                                className={`rounded-full border px-3.5 py-2 text-xs transition ${
                                                    selectedConcept.id === concept.id && hasPreviewed
                                                        ? "border-violet-400/50 bg-violet-400/10 text-violet-200"
                                                        : "border-white/10 bg-white/4 text-slate-400 hover:border-white/25 hover:text-white"
                                                }`}
                                            >
                                                {concept.label}
                                            </button>
                                        ))}
                                    </div>
                                </div> */}
                            </div>

                            <div className="min-w-0 rounded-[20px] border border-white/10 bg-[#090c17] p-3 sm:p-4">
                                <div className="mb-3 flex items-center justify-between gap-3 px-1 text-xs text-slate-400">
                                    <span>Sample website preview</span>
                                    <span className="flex items-center gap-2 text-[11px] text-emerald-300/80">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        Concept ready
                                    </span>
                                </div>
                                <WebsitePreview concept={selectedConcept} />
                            </div>
                        </div>
                    </motion.div>
                </section>


                {/* Creative capabilities: editorial layout, not three identical feature cards. */}
                <section id="capabilities" className="mx-auto max-w-330 scroll-mt-24 px-5 pb-28 sm:px-8 lg:px-10 lg:pb-36">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sequence} className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                        <div>
                            <motion.p variants={reveal} className="text-xs font-semibold tracking-[0.23em] text-violet-300">THINK IT. SEE IT. SHAPE IT.</motion.p>
                            <motion.h2 variants={reveal} className="mt-5 max-w-182.5 text-4xl font-semibold leading-[1.12] tracking-[-0.045em] sm:text-6xl">A creative process that <span className="font-serif italic font-normal text-violet-300">feels different.</span></motion.h2>
                        </div>
                        <motion.p variants={reveal} className="max-w-77.5 text-sm leading-7 text-slate-400">Less time staring at an empty canvas. More time getting closer to what you had in mind.</motion.p>
                    </motion.div>

                    <div className="grid gap-4 lg:grid-cols-12">
                        
                        <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative min-h-93.75 overflow-hidden rounded-[25px] border border-white/10 bg-[#111321] p-7 sm:p-9 lg:col-span-7">
                            
                            <div className="relative z-10 max-w-87.5"><p className="text-[11px] font-semibold tracking-[0.22em] text-violet-300">01 / PROMPT TO STRUCTURE</p><h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Your words become the blueprint.</h3><p className="mt-4 text-sm leading-7 text-slate-400">Write what you imagine. See it translated into the sections, layout, and rhythm of a website.</p></div>
                            
                            <div className="absolute -bottom-6.25 left-7 -right-16.25 top-55 -rotate-65 rounded-2xl border border-violet-400/20 bg-[#090c1a] p-5 shadow-[0_10px_80px_rgba(0,0,0,.5)] sm:left-16 sm:top-51.25">
                                <div className="flex gap-2"><span className="h-2 w-14 rounded-full bg-violet-400/50"/><span className="h-2 w-10 rounded-full bg-white/10"/><span className="h-2 w-10 rounded-full bg-white/10"/></div>
                                <div className="mt-5 h-10 w-[57%] rounded-lg bg-white/11" />
                                <div className="mt-3 h-3 w-[74%] rounded bg-white/[0.07]" /><div className="mt-2 h-3 w-[52%] rounded bg-white/[0.07]" />
                                <motion.div initial={{ width: "0%" }} whileInView={{ width: "37%" }} viewport={{ once: true }} transition={{ delay: 0.45, duration: 1.2 }} className="mt-5 h-9 rounded-md bg-linear-to-r from-violet-400/60 to-cyan-400/40" />
                            </div>
                            <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 bg-violet-600/11 blur-[70px]"/>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }} className="relative min-h-93.75 overflow-hidden rounded-[25px] border border-white/10 bg-[#0d1420] p-7 sm:p-9 lg:col-span-5">
                            <p className="text-[11px] font-semibold tracking-[0.22em] text-cyan-300">02 / RESPONSIVE BY DESIGN</p><h3 className="mt-5 max-w-72.5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">One idea. Every screen.</h3><p className="mt-4 max-w-70text-sm leading-7 text-slate-400">Design with flexible layouts that belong on desktop, tablet, and mobile.</p>
                            <div className="absolute -bottom-26 -right--36 h-44.5 w-70 rotate-[-8deg] rounded-2xl border border-white/15 bg-[#1d2440] p-4 shadow-[0_15px_80px_rgba(0,0,0,.4)] sm:h-50 sm:w-87.5">
                                <div className="h-2 w-24 rounded-full bg-cyan-200/35"/><div className="mt-6 h-5 w-44 rounded bg-white/25"/><div className="mt-3 h-2 w-36 rounded bg-white/10"/><div className="mt-5 grid grid-cols-3 gap-2"><div className="h-14 rounded-md bg-cyan-400/20"/><div className="h-14 rounded-md bg-violet-400/20"/><div className="h-14 rounded-md bg-white/10"/></div>
                            </div>
                           
                            <motion.div initial={{ y: 35, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }} className="absolute -bottom-15 left-7 h-46.25 w-26.25 rotate-[8deg] rounded-[19px] border-4 border-[#414964] bg-[#141b2d] p-2 shadow-2xl sm:left-16">
                                <div className="mx-auto h-1 w-9 rounded-full bg-white/25"/><div className="mt-6 h-3 w-14 rounded bg-cyan-400/35"/><div className="mt-4 h-10 rounded-md bg-white/10"/><div className="mt-3 h-2 w-11 rounded bg-white/15"/>
                            </motion.div>
                            
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative flex min-h-125 flex-col overflow-hidden rounded-[25px] border border-white/10 bg-[#131225] p-7 sm:p-9 lg:col-span-12 lg:min-h-70 lg:flex-row lg:items-center lg:justify-between">
                            
                            <div className="relative z-10 max-w-127.5"><p className="text-[11px] font-semibold tracking-[0.22em] text-violet-300">03 / MAKE IT YOURS</p>
                            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">A direction worth exploring.</h3>
                            <p className="mt-4 max-w-420 text-sm leading-7 text-slate-400">
                                Explore different moods and visual treatments without losing the idea that started it all.</p>
                                </div>
                            
                            <div className="relative z-10 mt-8 flex items-center gap-4 sm:gap-6 lg:mt-0">
                                {[{ id: "violet", label: "Violet", classes: "from-[#35235b] via-[#6f4c9c] to-[#9b7ae0]" }, { id: "blue", label: "Electric", classes: "from-[#12345b] via-[#256ca0] to-[#7ac7e7]" }, { id: "rose", label: "Editorial", classes: "from-[#59304d] via-[#a06582] to-[#e3a7ac]" }].map((item) => (
                                    <button type="button" key={item.id} onClick={() => setColorway(item.id)} aria-label={`Select ${item.label} visual style`} aria-pressed={colorway === item.id} className={`group relative h-27.5 w-18.25 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:h-35 sm:w-25 ${colorway === item.id ? "-translate-y-3 border-white/55" : "border-white/15 hover:-translate-y-1"}`}>
                                        <div className={`absolute inset-0 bg-linear-to-br ${item.classes}`} />
                                        <div className="absolute inset-x-2 top-2 h-1 rounded bg-white/50"/><div className="absolute left-2 top-9 h-2 w-[65%] rounded bg-white/65"/><div className="absolute left-2 top-13 h-1 w-[75%] rounded bg-white/35"/>
                                        <span className="absolute bottom-2 left-2 text-[9px] font-medium text-white">{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="pointer-events-none absolute -bottom-28 right-[5%] h-72 w-72 rounded-full bg-violet-500/12 blur-[80px]" />
                        </motion.div>
                    </div>
                </section>

                {/* Templates: three real-looking editorial previews, each opens the studio. */}
                {/* <section id="templates" className="relative scroll-mt-24 border-y border-white/[0.07] bg-[#0d0e1a]/80 py-24 sm:py-28">
                    
                    <div className="mx-auto max-w-[330 px-5 sm:px-8 lg:px-10">
                        
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sequence} className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                            <div>
                                <motion.p variants={reveal} className="text-xs font-semibold tracking-[0.22em] text-violet-300">EXPLORE THE POSSIBILITIES</motion.p>
                                <motion.h2 variants={reveal} className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Every idea has a different look.</motion.h2>
                                </div>
                            <motion.p variants={reveal} className="max-w-76.25 text-sm leading-7 text-slate-400">A few starting points. Countless ways to make them yours.</motion.p>
                        </motion.div>
                        <div className="mt-12 grid gap-5 md:grid-cols-3">
                            {concepts.map((concept, index) => (
                                <motion.button type="button" key={concept.id} onClick={() => exploreTemplate(concept)} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.13, duration: 0.7 }} whileHover={reduceMotion ? {} : { y: -7 }} className="group min-w-0 rounded-[22px] border border-white/10 bg-[#141525] p-3 text-left transition-colors hover:border-violet-400/35 sm:p-4">
                                    <TemplateArt concept={concept} />
                                    <div className="flex items-center justify-between px-2 pb-1 pt-5"><div>
                                        <span className="text-xs text-slate-500">0{index + 1} / WEBLOOM CONCEPT</span>
                                        <h3 className="mt-2 text-xl font-semibold">{concept.label}</h3>
                                    </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* The three-step timeline is a continuous track, not feature cards. */}
                <section id="how-it-works" className="mx-auto max-w-330 scroll-mt-24 px-5 py-28 sm:px-8 lg:px-10 lg:py-12">
                    
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sequence} className="mx-auto max-w-175 text-center">
                        <motion.p variants={reveal} className="text-xs font-semibold tracking-[0.22em] text-violet-300">THE CREATIVE FLOW</motion.p><motion.h2 variants={reveal} className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">From a blank page to <span className="font-serif italic font-normal text-violet-300">your page.</span></motion.h2><motion.p variants={reveal} className="mx-auto mt-5 max-w-130 text-sm leading-7 text-slate-400 sm:text-base">No complicated brief. No starting from scratch. Just describe, explore, and refine.</motion.p>
                    </motion.div>

                    <div className="relative mt-18 grid gap-12 md:grid-cols-3 md:gap-10">
                        <div className="pointer-events-none absolute left-[16%] right-[16%] top-6.75 hidden h-px bg-white/10 md:block" aria-hidden="true">
                        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 2.1, ease: "easeInOut" }} className="h-full origin-left bg-linear-to-r from-violet-500 via-blue-400 to-cyan-400" /></div>
                        
                        {[{ n: "01", title: "Describe the idea", caption: "Write it like you're telling a friend what you want to build." }, 
                            { n: "02", title: "Watch it take shape", caption: "Follow the structure as it becomes a visual concept." }, { n: "03", title: "Make it yours", caption: "Choose a direction and keep shaping the experience." }]
                            .map((item, index) => (

                            <motion.div key={item.n} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.65 }} className="relative text-center">
                                <span className="relative z-10 mx-auto flex h-13.5 w-13.5 items-center justify-center rounded-full border border-violet-400/35 bg-[#17152a] font-mono text-sm text-violet-200 shadow-[0_0_25px_rgba(139,92,246,.07)]">{item.n}</span>
                                <h3 className="mt-7 text-xl font-semibold">{item.title}</h3>
                                <p className="mx-auto mt-3 max-w-66.25 text-sm leading-7 text-slate-400">{item.caption}</p>
                            </motion.div>

                        ))}

                    </div>
                </section>
            </main>

            <Footer />
        </div>
        </MotionConfig>
    );
}

export default Home;
