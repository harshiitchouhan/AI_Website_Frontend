import { motion } from "framer-motion";

function LoginHero({ reveal }) {
    return (
                <motion.section {...reveal} className="relative hidden lg:block">
                    <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c4a9fa]">
                        YOUR CREATIVE SPACE AWAITS
                    </p>
                    <h1 className="max-w-xl text-[clamp(3.6rem,5.4vw,5.8rem)] font-semibold leading-[1.04] tracking-[-0.075em]">
                        Pick up where your{" "}
                        <span className="font-serif font-normal italic text-[#c4a9fa]">
                            ideas bloom.
                        </span>
                    </h1>
                    <p className="mt-7 max-w-md text-base leading-8 text-slate-400">
                        Return to your workspace, revisit your concepts, and keep shaping
                        the web you imagined.
                    </p>
                    <div className="mt-12 flex flex-wrap gap-3">
                        {["Your ideas", "Your designs", "Your next launch"].map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-violet-200/15 bg-violet-200/5 px-4 py-2 text-xs text-violet-100/80"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                    
                </motion.section>
    );
}

export default LoginHero;
