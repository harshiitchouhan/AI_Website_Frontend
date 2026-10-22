import { Link, NavLink } from "react-router";
import { motion } from "framer-motion";
import webloomLogo from "../assets/Webloom.png";

const navigation = [
    { label: "Home", path: "/" },
    { label: "Explore", path: "/explore" },
    { label: "Why Webloom", path: "/why-webloom" },
];

export function WebloomNavbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#090914]/85 backdrop-blur-2xl">
            <nav className="mx-auto flex h-19 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
                <Link
                    to="/"
                    className="group inline-flex shrink-0 items-center"
                    aria-label="Webloom home"
                >
                    <motion.span
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 280, damping: 17 }}
                        className="relative flex items-center overflow-hidden rounded-xl bg-white/95 px-3 py-1.5 shadow-[0_0_24px_rgba(167,139,250,0.25)]"
                    >
                        <img
                            src={webloomLogo}
                            alt="Webloom"
                            className="h-8 w-auto object-contain sm:h-10"
                        />
                    </motion.span>
                </Link>

                <div className="flex items-center gap-3 sm:gap-7">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `relative py-2 text-xs transition-colors sm:text-sm ${
                                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {item.label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="webloom-nav-underline"
                                            className="absolute inset-x-0 -bottom-1 h-px bg-[#BFA6FF]"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

            </nav>
        </header>
    );
}

export function WebloomCTA({
    eyebrow = "YOUR NEXT IDEA STARTS HERE",
    title = "It starts with a thought.",
    description = "Give your idea a direction, explore the possibilities, and make something that feels entirely yours.",
}) {
    return (
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 lg:px-10 lg:pb-24">
            <div className="relative isolate overflow-hidden rounded-[30px] border border-violet-300/15 bg-[#131126] px-7 py-16 text-center sm:px-12 sm:py-24">
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-40 left-1/2 h-80 w-xl -translate-x-1/2 rounded-full bg-violet-600/25 blur-[110px]"
                    animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.15, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative z-10">
                    <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C0A9F4] sm:text-xs">
                        {eyebrow}
                    </p>
                    <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                        {title}
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}

export function WebloomFooter() {
    return (
        <footer className="border-t border-white/[0.07] bg-[#090914]">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:px-8 lg:px-10">
                <p>
                    <span className="font-semibold text-white">Webloom </span> © {new Date().getFullYear()}
                </p>
                <div className="flex items-center gap-6">
                    <Link className="transition-colors hover:text-white" to="/explore">Explore</Link>
                    <Link className="transition-colors hover:text-white" to="/why-webloom">Why Webloom</Link>                </div>
            </div>
        </footer>
    );
}
