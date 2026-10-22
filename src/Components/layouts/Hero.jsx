import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useScroll,
    useTransform
} from "framer-motion";

const stages = ["typing", "transferring", "assembling", "designing", "ready"];

// This is a decorative landing-page demo, not the real website-generation API.
function useBuildStory(concept, replay, reduceMotion) {
    const [typed, setTyped] = useState("");
    const [stage, setStage] = useState("typing");

    useEffect(() => {
        if (reduceMotion) {
            setTyped(concept.prompt);
            setStage("ready");
            return;
        }

        let character = 0;
        let interval;
        const timeouts = [];
        let cancelled = false;

        setTyped("");
        setStage("typing");

        const start = () => {
            interval = window.setInterval(() => {
                if (cancelled) return;
                character += 1;
                setTyped(concept.prompt.slice(0, character));

                if (character >= concept.prompt.length) {
                    window.clearInterval(interval);
                    timeouts.push(window.setTimeout(() => setStage("transferring"), 280));
                    timeouts.push(window.setTimeout(() => setStage("assembling"), 900));
                    timeouts.push(window.setTimeout(() => setStage("designing"), 2150));
                    timeouts.push(window.setTimeout(() => setStage("ready"), 3350));
                }
            }, 29);
        };

        // A short pause gives the hero headline time to enter first.
        const initial = window.setTimeout(start, 700);
        timeouts.push(initial);

        return () => {
            cancelled = true;
            window.clearInterval(interval);
            timeouts.forEach(window.clearTimeout);
        };
    }, [concept, replay, reduceMotion]);

    return { typed, stage };
}
function Hero({ concepts, reveal, sequence, reduceMotion }) {
    const [heroConcept, setHeroConcept] = useState(concepts[0]);
    const [heroReplay, setHeroReplay] = useState(0);
    const heroRef = useRef(null);

    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroShift = useTransform(
        heroScroll,
        [0, 1],
        [0, reduceMotion ? 0 : 95]
    );

    const { typed, stage } = useBuildStory(heroConcept, heroReplay, reduceMotion);
    const stepNumber = Math.max(1, stages.indexOf(stage) + 1);

    return (
                <section ref={heroRef} className="relative overflow-hidden pb-20 pt-20 sm:pb-28 sm:pt-28 lg:pt-20">
                    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                        <motion.div className="absolute -left-42.5 top-7.5 h-105 w-105 rounded-full bg-violet-600/13 blur-[115px]" animate={reduceMotion ? {} : { x: [0, 65, 0], y: [0, -30, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }} />
                        <motion.div className="absolute -right-40 top-35h-112.5 w-112.5 rounded-full bg-blue-600/12 blur-[125px]" animate={reduceMotion ? {} : { x: [0, -65, 0], y: [0, 36, 0] }} transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }} />
                        <div className="absolute inset-x-0 top-30 mx-auto h-165 max-w-6xl opacity-[0.14] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] background-size-[65px_65px] mask-[radial-gradient(ellipse_at_center,black,transparent_72%)]" />
                    </div>

                    <div className="mx-auto max-w-330 px-5 sm:px-8 lg:px-10">
                        <motion.div initial="hidden" animate="visible" variants={sequence} className="relative z-10 mx-auto max-w-250 text-center">
                            <motion.div variants={reveal} className="mb-4 inline-flex items-center gap-3 rounded-full border border-violet-300/15 bg-white/[0.035] px-4 py-2 text-[10px] font-semibold tracking-[0.19em] text-violet-200 sm:text-xs">
                                <span className="relative flex h-1.5 w-1.5 items-center justify-center rounded-full bg-violet-300">
                                    <span className="absolute h-3 w-3 animate-ping rounded-full bg-violet-300/25 motion-reduce:animate-none" /></span>
                                INTRODUCING WEBLOOM
                            </motion.div>

                            <motion.h1 variants={sequence} className="text-[clamp(3.25rem,7.5vw,7.25rem)] font-semibold leading-[1.03] tracking-[-0.065em]">
                                <motion.span variants={reveal} className="block">Describe it.</motion.span>
                                <motion.span variants={reveal} className="block bg-linear-to-r from-[#c6b5ff] via-[#f5efff] to-[#91c4ff] bg-clip-text text-transparent">Watch it become</motion.span>
                                <motion.span variants={reveal} className="block">a website.</motion.span>
                            </motion.h1>

                            <motion.p variants={reveal} className="mx-auto mt-7 max-w-142.5 text-base leading-8 text-slate-400 sm:text-lg">
                                One thought. One prompt. A beautiful starting point for your next site. Webloom turns the way you describe your ideas into something you can actually see.
                            </motion.p>

                            <motion.div variants={reveal} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                <a href="#studio" className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0d0e1b] transition hover:bg-violet-100">Try Webloom Studio <span className="transition group-hover:translate-x-1" aria-hidden="true">↗</span></a>
                                <a href="#how-it-works" className="rounded-full border border-white/15 bg-white/[0.035] px-7 py-3.5 text-sm text-slate-200 transition-colors hover:border-white/30 hover:bg-white/[0.07]">See the process</a>
                            </motion.div>
                            
                        </motion.div>

                        
                    </div>
                </section>
    );
}

export default Hero;

