import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { logoutUser } from "../../Redux/authSlice";
import webloomLogo from "../../assets/Webloom.png";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "Studio" , to : "/studio"},
    { label: "Pricing" , to : "/pricing"},
];

function Brand() {
    return (
        <Link
            to="/"
            aria-label="Webloom home"
            className="inline-flex items-center justify-self-start rounded-[9px] bg-white px-3 py-2 transition hover:bg-violet-100"
        >
            <img
                src={webloomLogo}
                alt="Webloom"
                className="h-7 w-auto object-contain sm:h-8"
            />
        </Link>
    );
}

function GuestAvatar() {
    return (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600">
            <svg
                viewBox="0 0 24 24"
                width="23"
                height="23"
                fill="currentColor"
                aria-hidden="true"
            >
                <circle cx="12" cy="8" r="4" />
                <path d="M3.5 21c.4-4.6 3.6-7.2 8.5-7.2s8.1 2.6 8.5 7.2H3.5Z" />
            </svg>
        </span>
    );
}

function AccountMenu({ compact = false, onNavigate = () => {} }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    const { user, initialized, loading } = useSelector((state) => state.auth);

    const [open, setOpen] = useState(false);
    const [logoutError, setLogoutError] = useState("");
    const menuRef = useRef(null);

    const displayName = user?.name?.trim() || user?.email?.split("@")[0] || "Account";
    const initial = displayName.charAt(0).toUpperCase();

    useEffect(() => {
        if (!open) return;

        const closeOnOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        const closeOnEscape = (event) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [open]);

    const handleLogout = async () => {
        if (loading) return;

        setLogoutError("");

        try {
            await dispatch(logoutUser()).unwrap();
            setOpen(false);
            onNavigate();
            navigate("/", { replace: true });
        } catch (error) {
            setLogoutError(
                typeof error === "string"
                    ? error
                    : error?.message || "Unable to log out"
            );
        }
    };

    if (!initialized) {
        return <span className="text-xs text-slate-500">Checking session...</span>;
    }

    return (
        <div ref={menuRef} className={`relative ${compact ? "w-full" : ""}`}>
            <button
                type="button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((current) => !current)}
                className={`flex items-center gap-3 rounded-full border border-white/10 bg-white/4.5 py-1.5 pl-1.5 pr-4 text-left transition hover:border-violet-400/35 hover:bg-white/8 ${compact ? "w-full" : ""}`}
            >
                {user ? (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-violet-400 to-indigo-500 text-sm font-semibold text-white">
                        {initial}
                    </span>
                ) : (
                    <GuestAvatar />
                )}

                <span className="max-w-36.25 truncate text-sm font-semibold text-slate-100">
                    {user ? displayName : "Guest"}
                </span>

                <motion.svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="ml-auto text-slate-400"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18 }}
                    aria-hidden="true"
                >
                    <path d="m6 9 6 6 6-6" />
                </motion.svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: -7, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduceMotion ? {} : { opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className={`z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-violet-300/15 bg-[#191629] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${compact ? "relative" : "absolute right-0"}`}
                    >
                        {user ? (
                            <>
                                <div className="border-b border-white/10 px-3 py-3">
                                    <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                                    <p className="mt-1 truncate text-xs text-slate-400">{user.email}</p>
                                </div>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={handleLogout}
                                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-rose-300 transition hover:bg-rose-400/10 disabled:opacity-50"
                                >
                                    {loading ? "Logging out..." : "Logout"}
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="px-3 pb-2 pt-2 text-xs font-medium text-slate-400">
                                    Welcome to Webloom
                                </p>
                                <Link
                                    to="/login"
                                    onClick={() => {
                                        setOpen(false);
                                        onNavigate();
                                    }}
                                    className="block rounded-xl bg-violet-200 px-2 py-2 text-sm font-semibold text-[#171126] transition hover:bg-violet-100"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => {
                                        setOpen(false);
                                        onNavigate();
                                    }}
                                    className="mt-1 block rounded-xl px-2 py-2 text-sm font-medium text-violet-200 transition hover:bg-white/6"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {logoutError && (
                <p role="alert" className="mt-2 max-w-56 text-xs text-rose-300">
                    {logoutError}
                </p>
            )}
        </div>
    );
}

// Motion-powered Webloom credit counter. This stays in sync when Studio completes a generation.

function CreditCoin({ compact = false }) {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const reduceMotion = useReducedMotion();

    const [credits, setCredits] = useState(
        typeof user?.credits === "number" ? user.credits : null
    );

    const [flips, setFlips] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const coinTravel = compact ? 78 : 88;

    // Sync credits with Redux
    useEffect(() => {
        setCredits(
            typeof user?.credits === "number" ? user.credits : null
        );
    }, [user?.credits]);

    // Fetch latest credits from backend
    useEffect(() => {
        if (!user) return;

        const controller = new AbortController();

        const apiUrl = (
            import.meta.env.VITE_API_URL || "http://localhost:4000"
        ).replace(/\/$/, "");

        async function refreshCredits() {
            try {
                const response = await fetch(`${apiUrl}/api/auth/me`, {
                    credentials: "include",
                    signal: controller.signal,
                });

                if (!response.ok) return;

                const data = await response.json();

                const account =
                    data.user ||
                    data.data?.user ||
                    data.data ||
                    data;

                if (
                    typeof account.credits === "number" &&
                    !controller.signal.aborted
                ) {
                    setCredits(account.credits);
                }
            } catch {
                // Keep the Redux credits if refresh fails.
            }
        }

        refreshCredits();

        return () => controller.abort();
    }, [user?._id, user?.id]);

    // Listen for credit updates after AI generation
    useEffect(() => {
        const updateCredits = (event) => {
            if (typeof event.detail?.credits === "number") {
                setCredits(event.detail.credits);

                if (!reduceMotion) {
                    setFlips((current) => current + 1);
                }
            }
        };

        window.addEventListener(
            "webloom:credits-updated",
            updateCredits
        );

        return () => {
            window.removeEventListener(
                "webloom:credits-updated",
                updateCredits
            );
        };
    }, [reduceMotion]);

    const startAnimation = () => {
        if (isActive) return;

        setIsActive(true);

        if (!reduceMotion) {
            setFlips((current) => current + 1);
        }
    };

    const resetAnimation = () => {
        setIsActive(false);
    };

    if (!user) return null;

    return (
        <motion.button
            type="button"
            onClick={() => navigate("/pricing")}
            onHoverStart={startAnimation}
            onHoverEnd={resetAnimation}
            onFocus={startAnimation}
            onBlur={resetAnimation}
            initial={
                reduceMotion
                    ? false
                    : { opacity: 0, y: -7 }
            }
            animate={{ opacity: 1, y: 0 }}
            whileHover={
                reduceMotion
                    ? {}
                    : { scale: 1.045, y: -2 }
            }
            whileTap={{ scale: 0.97 }}
            className={`group relative inline-flex h-13 shrink-0 cursor-pointer items-center overflow-hidden rounded-full border border-amber-300/35 bg-[#241c29] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_22px_rgba(217,167,72,0.09)] transition-colors hover:border-amber-300/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                compact ? "w-34" : "w-36"
            }`}
            title="View Webloom pricing"
            aria-label={`${credits ?? "Unknown"} Webloom credits remaining. View pricing. Each AI generation costs 50 credits.`}
        >
            {/* Background glow */}
            <span className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-amber-200/5 via-transparent to-amber-300/5" />

            {/* Animated shine */}
            <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-transparent via-amber-200/15 to-transparent"
                initial={false}
                animate={{
                    x: isActive ? "110%" : "-110%",
                }}
                transition={{
                    duration: reduceMotion ? 0 : 0.85,
                    ease: "easeInOut",
                }}
            />

            {/* Credits label - moves to left on hover */}
            <motion.span
                className="pointer-events-none absolute left-13.5 flex flex-col items-start justify-center leading-none"
                initial={false}
                animate={{
                    x: isActive && !reduceMotion ? -38 : 0,
                }}
                transition={{
                    duration: reduceMotion ? 0 : 0.65,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-amber-100">
                    Credits
                </span>

                {/* Balance displayed before hovering */}
                <motion.span
                    initial={false}
                    animate={{
                        opacity: isActive ? 0 : 1,
                        y: isActive ? -4 : 0,
                    }}
                    transition={{
                        duration: reduceMotion ? 0 : 0.2,
                    }}
                    className="mt-1 text-[12px] font-bold tabular-nums text-amber-50"
                >
                    {credits ?? "—"}
                </motion.span>

                {/* Subtitle appears when the coin moves */}
                <motion.span
                    initial={false}
                    animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 4,
                    }}
                    transition={{
                        delay: isActive && !reduceMotion ? 0.3 : 0,
                        duration: reduceMotion ? 0 : 0.2,
                    }}
                    className="absolute top-4 whitespace-nowrap text-[8px] font-medium text-amber-200/50"
                >
                    50 / generation
                </motion.span>
            </motion.span>

            {/* Coin positioning */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2"
                style={{ perspective: "600px" }}
            >
                {/* Coin travels left to right */}
                <motion.span
                    className="block"
                    initial={false}
                    animate={{
                        x: isActive && !reduceMotion
                            ? coinTravel
                            : 0,
                    }}
                    transition={{
                        duration: reduceMotion ? 0 : 0.85,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {/* Coin rotates independently */}
                    <motion.span
                        className="relative grid h-9 w-9 place-items-center rounded-full border-2 border-amber-200/80 bg-linear-to-br from-[#fff4b0] via-[#e8b852] to-[#a76822] shadow-[0_0_16px_rgba(244,193,87,0.45),inset_0_1px_3px_rgba(255,255,255,0.65)]"
                        initial={false}
                        animate={{
                            rotate: reduceMotion ? 0 : flips * 720,
                            rotateY: reduceMotion ? 0 : flips * 360,
                        }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.85,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Inner gold ring */}
                        <span className="absolute inset-1 rounded-full border border-amber-900/35" />

                        {/* Star visible before hover */}
                        <motion.span
                            initial={false}
                            animate={{
                                opacity: isActive ? 0 : 1,
                                scale: isActive ? 0.3 : 1,
                            }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.2,
                            }}
                            className="absolute text-lg font-black text-[#794515]"
                        >
                            ✦
                        </motion.span>

                        {/* Credit balance revealed inside coin */}
                        <motion.span
                            key={credits ?? "unknown"}
                            initial={false}
                            animate={{
                                opacity: isActive ? 1 : 0,
                                scale: isActive ? 1 : 0.4,
                            }}
                            transition={{
                                delay: isActive && !reduceMotion ? 0.65 : 0,
                                duration: reduceMotion ? 0 : 0.2,
                                ease: "easeOut",
                            }}
                            className="relative z-10 text-[11px] font-black tabular-nums text-[#794515]"
                        >
                            {credits ?? "—"}
                        </motion.span>
                    </motion.span>
                </motion.span>
            </span>
        </motion.button>
    );
}


function Navbar({ variant = "default" }) {
    const reduceMotion = useReducedMotion();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (variant === "minimal") {
        return (
            <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
                <Brand />
                <Link
                    to="/"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-violet-400/25 bg-violet-500/[0.07] px-5 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/60 hover:bg-violet-500/15 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.18)]"
                >
                    <span className="relative z-10">
                        Back to home
                    </span>

                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/6 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
            </header>
        );
    }

    return (
        <header className="relative z-40 border-b border-violet-300/10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.10),transparent_70%),linear-gradient(180deg,#100d20_0%,#0b0a18_100%)] text-white backdrop-blur-xl">            <nav
                className="mx-auto flex h-20 max-w-330 items-center justify-between gap-4 px-5 sm:px-8 lg:px-10 md:grid md:grid-cols-[1fr_auto_1fr]"
                aria-label="Main navigation"
            >
                <Brand />

                <div aria-current="page" className="hidden items-center gap-8 text-sm md:flex font-semibold text-violet-200 hover:text-violet-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="transition-colors hover:text-violet-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                    {/* <span
                        aria-disabled="true"
                        title="Pricing page coming soon"
                        className="cursor-not-allowed text-slate-600"
                    >
                        Pricing <span className="ml-1 text-[10px] text-violet-400/70">Soon</span>
                    </span> */}
                </div>

                <div className="hidden items-center justify-self-end gap-3 md:flex">
                    <CreditCoin />
                    <AccountMenu />
                </div>

                <div className="ml-auto md:hidden">
                    <CreditCoin compact />
                </div>

                <button
                    type="button"
                    aria-expanded={mobileMenuOpen}
                    aria-controls="webloom-mobile-menu"
                    onClick={() => setMobileMenuOpen((open) => !open)}
                    className="rounded-lg border border-white/15 px-4 py-2 text-sm md:hidden"
                >
                    {mobileMenuOpen ? "Close" : "Menu"}
                </button>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="webloom-mobile-menu"
                        initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduceMotion ? {} : { opacity: 0, height: 0 }}
                        className="overflow-hidden border-t border-white/10 md:hidden"
                    >
                        <div className="flex flex-col gap-5 px-6 py-6 text-sm text-slate-300">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="transition hover:text-violet-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <span aria-disabled="true" className="text-slate-600">
                                Pricing <span className="text-xs text-violet-400/70">Coming soon</span>
                            </span>
                            <div className="border-t border-white/10 pt-5">
                                <AccountMenu
                                    compact
                                    onNavigate={() => setMobileMenuOpen(false)}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Navbar;
