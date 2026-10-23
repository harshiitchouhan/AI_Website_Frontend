
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";

const API_URL = import.meta.env.PROD
    ? ""
    : (import.meta.env.VITE_API_URL || "http://localhost:4000")
          .replace(/\/+$/, "");

export default function DeployedSite() {
    const { slug } = useParams();
    const reduceMotion = useReducedMotion();

    const [html, setHtml] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState("loading");
    const [progress, setProgress] = useState(0);
    const [retryCount, setRetryCount] = useState(0);

    // Fetch the published website.
    useEffect(() => {
        const controller = new AbortController();

        const loadWebsite = async () => {
            setStatus("loading");
            setHtml("");
            setError("");
            setProgress(0);

            try {
                if (!slug) {
                    throw new Error("Website URL is invalid");
                }

                const response = await fetch(
                    `${API_URL}/api/public/${encodeURIComponent(slug)}`,
                    {
                        method: "GET",
                        signal: controller.signal,
                    }
                );

                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                            `Unable to load website (${response.status})`
                    );
                }

                if (
                    typeof data.code !== "string" ||
                    !data.code.trim()
                ) {
                    throw new Error(
                        "This website does not contain any published content."
                    );
                }

                if (controller.signal.aborted) return;

                setHtml(data.code);
                setStatus("rendering");
            } catch (err) {
                if (controller.signal.aborted) return;

                setError(
                    err.message || "Unable to load the published website."
                );

                setStatus("error");
            }
        };

        loadWebsite();

        return () => {
            controller.abort();
        };
    }, [slug, retryCount]);

    // Animated visual progress.
    // This is an estimated loading indicator, not a server percentage.
    useEffect(() => {
        if (status === "ready") {
            setProgress(100);
            return;
        }

        if (status === "error") return;

        const interval = setInterval(() => {
            setProgress((current) => {
                const limit = status === "rendering" ? 95 : 82;

                if (current >= limit) return limit;

                const step = Math.max(
                    0.6,
                    (limit - current) * 0.08
                );

                return Math.min(limit, current + step);
            });
        }, 250);

        return () => clearInterval(interval);
    }, [status]);

    const handleRetry = () => {
        setRetryCount((current) => current + 1);
    };

    const handleIframeLoad = () => {
        setProgress(100);
        setStatus("ready");
    };

    const isLoading =
        status === "loading" || status === "rendering";

    const loadingMessage =
        progress < 30
            ? "Finding your creation..."
            : progress < 70
              ? "Preparing your experience..."
              : "Bringing your website to life...";

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#090914] text-white">

            {/* Published Website */}
            {html && (
                <motion.iframe
                    key={`${slug}-${retryCount}`}
                    title="Published Webloom Website"
                    srcDoc={html}
                    sandbox="allow-scripts"
                    referrerPolicy="no-referrer"
                    onLoad={handleIframeLoad}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: status === "ready" ? 1 : 0,
                    }}
                    transition={{
                        duration: reduceMotion ? 0 : 0.7,
                        ease: "easeOut",
                    }}
                    className="fixed inset-0 h-full w-full border-0 bg-white"
                />
            )}

            <AnimatePresence mode="wait">

                {/* Loading Screen */}
                {isLoading && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: reduceMotion ? 1 : 1.04,
                            filter: reduceMotion
                                ? "none"
                                : "blur(12px)",
                        }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.65,
                        }}
                        className="fixed inset-0 z-20 flex min-h-screen items-center justify-center overflow-hidden bg-[#090914] px-5"
                    >

                        {/* Background Effects */}
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">

                            {/* Purple Glow */}
                            <motion.div
                                className="absolute -left-48 -top-48 h-150 w-150 rounded-full bg-violet-600/15 blur-[120px]"
                                animate={
                                    reduceMotion
                                        ? {}
                                        : {
                                              x: [0, 100, 30, 0],
                                              y: [0, 80, 30, 0],
                                              scale: [1, 1.2, 1.1, 1],
                                          }
                                }
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Blue Glow */}
                            <motion.div
                                className="absolute -bottom-60 -right-48 h-160 w-160 rounded-full bg-blue-600/15 blur-[130px]"
                                animate={
                                    reduceMotion
                                        ? {}
                                        : {
                                              x: [0, -100, -40, 0],
                                              y: [0, -70, 30, 0],
                                              scale: [1, 1.15, 1.05, 1],
                                          }
                                }
                                transition={{
                                    duration: 18,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[60px_60px] opacity-30 mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />

                            {/* Center Glow */}
                            <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[110px]" />
                        </div>

                        {/* Main Loading Content */}
                        <motion.div
                            initial={
                                reduceMotion
                                    ? false
                                    : { opacity: 0, y: 25 }
                            }
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{ duration: 0.7 }}
                            className="relative z-10 flex w-full max-w-xl flex-col items-center text-center"
                        >

                            {/* Brand */}
                            <motion.div
                                initial={
                                    reduceMotion
                                        ? false
                                        : { opacity: 0, y: -15 }
                                }
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{ duration: 0.6 }}
                                className="mb-14 flex items-center gap-3"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-400/10 shadow-[0_0_35px_rgba(167,139,250,0.15)]">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-6 w-6 text-violet-300"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path
                                            d="M3 6L7 18L12 8L17 18L21 6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>

                                <span className="text-xl font-semibold tracking-tight text-white">
                                    Webloom
                                </span>
                            </motion.div>

                            {/* Animated Orb */}
                            <div className="relative mb-12 flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">

                                {/* Outer Ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-violet-400/20"
                                    animate={
                                        reduceMotion
                                            ? {}
                                            : { rotate: 360 }
                                    }
                                    transition={{
                                        duration: 14,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_20px_rgba(196,169,250,0.9)]" />
                                </motion.div>

                                {/* Middle Ring */}
                                <motion.div
                                    className="absolute inset-5 rounded-full border border-dashed border-violet-300/30"
                                    animate={
                                        reduceMotion
                                            ? {}
                                            : { rotate: -360 }
                                    }
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />

                                {/* Inner Ring */}
                                <motion.div
                                    className="absolute inset-10 rounded-full border border-violet-400/20 bg-violet-400/5"
                                    animate={
                                        reduceMotion
                                            ? {}
                                            : {
                                                  scale: [1, 1.08, 1],
                                                  opacity: [0.6, 1, 0.6],
                                              }
                                    }
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />

                                {/* Center Icon */}
                                <motion.div
                                    animate={
                                        reduceMotion
                                            ? {}
                                            : {
                                                  y: [0, -6, 0],
                                              }
                                    }
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="relative flex h-17 w-17 items-center justify-center rounded-2xl border border-violet-300/30 bg-[#20172f] shadow-[0_0_55px_rgba(139,92,246,0.25)]"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-9 w-9 text-violet-300"
                                    >
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M3 12h18" />
                                        <path d="M12 3a15 15 0 0 1 0 18" />
                                        <path d="M12 3a15 15 0 0 0 0 18" />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Status Label */}
                            <motion.div
                                animate={
                                    reduceMotion
                                        ? {}
                                        : { opacity: [0.55, 1, 0.55] }
                                }
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="mb-5 flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,169,250,0.8)]" />

                                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                                    Opening your website
                                </span>
                            </motion.div>

                            {/* Heading */}
                            <h1 className="max-w-lg text-3xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">
                                Your creation is{" "}
                                <span className="bg-linear-to-r from-[#b08afb] via-[#d2adff] to-[#da8cf6] bg-clip-text text-transparent">
                                    coming to life.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
                                Every great idea deserves a beautiful
                                experience. We're getting yours ready.
                            </p>

                            {/* Progress Section */}
                            <div className="mt-12 w-full max-w-md">

                                <div className="mb-3 flex items-center justify-between gap-4">
                                    <motion.span
                                        key={loadingMessage}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="text-xs font-medium text-slate-400"
                                    >
                                        {loadingMessage}
                                    </motion.span>

                                    <span className="text-xs font-semibold tabular-nums text-violet-300">
                                        {Math.round(progress)}%
                                    </span>
                                </div>

                                {/* Progress Track */}
                                <div
                                    role="progressbar"
                                    aria-label="Website loading progress"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={Math.round(progress)}
                                    className="relative h-2 w-full overflow-hidden rounded-full bg-white/10"
                                >
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{
                                            width: `${progress}%`,
                                        }}
                                        transition={{
                                            duration: reduceMotion ? 0 : 0.4,
                                            ease: "easeOut",
                                        }}
                                        className="relative h-full rounded-full bg-linear-to-r from-[#8563e8] via-[#b08afb] to-[#da8cf6]"
                                    >
                                        {/* Moving Shine */}
                                        {!reduceMotion && (
                                            <motion.div
                                                className="absolute inset-y-0 w-20 bg-linear-to-r from-transparent via-white/50 to-transparent blur-sm"
                                                animate={{
                                                    x: [-80, 450],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Progress Steps */}
                                <div className="mt-5 flex justify-between gap-2 text-[10px] tracking-wide text-slate-500">
                                    <span
                                        className={
                                            progress >= 20
                                                ? "text-violet-300"
                                                : ""
                                        }
                                    >
                                        Connecting
                                    </span>

                                    <span
                                        className={
                                            progress >= 50
                                                ? "text-violet-300"
                                                : ""
                                        }
                                    >
                                        Preparing
                                    </span>

                                    <span
                                        className={
                                            status === "rendering"
                                                ? "text-violet-300"
                                                : ""
                                        }
                                    >
                                        Rendering
                                    </span>
                                </div>
                            </div>

                            <p className="mt-10 text-xs text-slate-600">
                                Crafted with Webloom
                            </p>
                        </motion.div>
                    </motion.div>
                )}

                {/* Error Screen */}
                {status === "error" && (
                    <motion.div
                        key="error"
                        initial={{
                            opacity: 0,
                            y: reduceMotion ? 0 : 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        className="fixed inset-0 z-20 flex min-h-screen items-center justify-center bg-[#090914] px-5"
                    >
                        <div className="relative w-full max-w-md text-center">

                            {/* Error Icon */}
                            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-rose-400/20 bg-rose-400/10 shadow-[0_0_60px_rgba(251,113,133,0.08)]">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-10 w-10 text-rose-300"
                                >
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 7v6" />
                                    <path d="M12 17h.01" />
                                </svg>
                            </div>

                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-rose-300">
                                SOMETHING WENT WRONG
                            </p>

                            <h1 className="text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                                We couldn't open your website.
                            </h1>

                            <p className="mt-5 text-sm leading-7 text-slate-400">
                                The website couldn't be loaded right now.
                                Please try again.
                            </p>

                            {/* Actual Error */}
                            <div
                                role="alert"
                                className="mt-7 rounded-xl border border-rose-400/20 bg-rose-400/5 px-5 py-4 text-sm wrap-break-word text-rose-200"
                            >
                                {error}
                            </div>

                            {/* Actions */}
                            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                <motion.button
                                    type="button"
                                    onClick={handleRetry}
                                    whileHover={
                                        reduceMotion
                                            ? {}
                                            : { y: -2 }
                                    }
                                    whileTap={
                                        reduceMotion
                                            ? {}
                                            : { scale: 0.98 }
                                    }
                                    className="inline-flex h-12 items-center justify-center rounded-xl bg-linear-to-r from-[#b08afb] to-[#da8cf6] px-7 text-sm font-semibold text-[#171126] transition hover:brightness-110"
                                >
                                    Try again
                                </motion.button>

                                <Link
                                    to="/"
                                    className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 text-sm font-medium text-white transition hover:bg-white/10"
                                >
                                    Back to Webloom
                                </Link>
                            </div>

                            <p className="mt-10 text-xs text-slate-600">
                                Webloom — Where ideas become websites.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
