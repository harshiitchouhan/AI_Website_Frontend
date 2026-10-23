import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams , useLocation , Navigate } from "react-router";
import { useSelector } from "react-redux";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import webloomLogo from "../assets/Webloom.png";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");
const GENERATION_COST = 50;
// This is a display estimate, not a server-provided ETA.
// Keep this copy aligned with the backend's request timeout.
const GENERATION_ESTIMATE = "5–10 minutes for detailed websites";


const CREATIVE_STAGES = [
    {
        title: "Analyzing your idea",
        description: "Considering the purpose, audience and visual direction.",
    },
    {
        title: "Designing the experience",
        description: "Exploring typography, color, imagery and layout.",
    },
    {
        title: "Crafting the website",
        description: "Bringing the sections and interactions together.",
    },
    {
        title: "Refining the details",
        description: "Thinking through responsiveness, spacing and polish.",
    },
];

function formatElapsed(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

// An illustrative, rotating journey -- not progress reported by OpenRouter.
// Normal JSON generation does not expose live model progress.
function GenerationExperience({ elapsedSeconds, isUpdate, reduceMotion, compact = false }) {
    const stageIndex = Math.min(Math.floor(elapsedSeconds / 14), CREATIVE_STAGES.length - 1);
    const stage = CREATIVE_STAGES[stageIndex];

    if (compact) {
        return (
            <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                role="status"
                aria-live="polite"
                className="rounded-2xl border border-violet-300/20 bg-linear-to-br from-violet-400/10 via-[#19152d] to-indigo-500/10 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.15)]"
            >
                <div className="flex items-center gap-3">
                    <motion.span
                        animate={reduceMotion ? undefined : { rotate: 360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-violet-300/30 bg-violet-300/10 text-violet-200"
                    >
                        <Icon name="sparkle" className="h-4 w-4" />
                    </motion.span>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-violet-100">
                            {isUpdate ? "Refining your website" : "Creating your website"}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                            {stage.title} · {formatElapsed(elapsedSeconds)} elapsed
                        </p>
                    </div>
                    <span className="flex gap-1" aria-hidden="true">
                        {[0, 1, 2].map((dot) => (
                            <motion.span
                                key={dot}
                                className="h-1.5 w-1.5 rounded-full bg-violet-300"
                                animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                                transition={{ duration: 1.1, repeat: Infinity, delay: dot * 0.16 }}
                            />
                        ))}
                    </span>
                </div>
                <p className="mt-3 text-[11px] leading-5 text-slate-400">
                    {isUpdate ? "Your current website remains saved while the new version is prepared." : "Your website will appear automatically once it is ready."}
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            key="webloom-generation-overlay"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
            transition={{ duration: 0.52, ease: "easeOut" }}
            className="absolute inset-x-0 bottom-0 top-11 z-20 flex items-center justify-center overflow-y-auto bg-[#090a19]/60 px-4 py-6 backdrop-blur-md sm:px-8"
        >
            <div
                role="status"
                aria-live="polite"
                className="relative my-auto w-full max-w-lg overflow-hidden rounded-[30px] border border-violet-300/25 bg-[#131227]/95 p-5 text-center shadow-[0_30px_100px_rgba(5,4,20,0.7),0_0_65px_rgba(139,92,246,0.14)] sm:p-8"
            >
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-violet-500/15 blur-3xl"
                    animate={reduceMotion ? undefined : { x: [0, 60, 0], y: [0, 20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-fuchsia-500/15 blur-3xl"
                    animate={reduceMotion ? undefined : { x: [0, -45, 0], y: [0, -20, 0] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative mx-auto mb-6 grid h-28 w-28 place-items-center sm:h-32 sm:w-32" aria-hidden="true">
                    <motion.div
                        className="absolute inset-0 rounded-full border border-dashed border-violet-300/45"
                        animate={reduceMotion ? undefined : { rotate: 360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-3 rounded-full border border-fuchsia-300/30"
                        animate={reduceMotion ? undefined : { rotate: -360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-violet-200 shadow-[0_0_15px_rgba(196,181,253,0.9)]" />
                    </motion.div>
                    <motion.div
                        className="relative grid h-18 w-18 place-items-center rounded-3xl border border-white/15 bg-linear-to-br from-violet-500/35 via-[#292044] to-indigo-500/30 text-violet-100 shadow-[0_0_40px_rgba(139,92,246,0.22)]"
                        animate={reduceMotion ? undefined : { rotate: [0, -4, 4, 0], scale: [1, 1.055, 1] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Icon name="sparkle" className="h-9 w-9" />
                    </motion.div>
                </div>

                <span className="relative inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300" />
                    WEBLOOM AI AT WORK
                </span>
                <h2 className="relative mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {isUpdate ? "Your next version is taking shape" : "Something remarkable is taking shape"}
                </h2>
                <p className="relative mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
                    {isUpdate
                        ? "We're preparing your requested changes. Your previous design stays safe until the update is ready."
                        : "A thoughtful website takes a little time. We'll reveal your design as soon as generation finishes."}
                </p>

                <div className="relative mt-7 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Design journey</span>
                        <span className="font-mono text-xs text-violet-200">{formatElapsed(elapsedSeconds)} elapsed</span>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2" aria-hidden="true">
                        {CREATIVE_STAGES.map((item, index) => (
                            <div key={item.title} className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                <motion.div
                                    className="h-full rounded-full bg-linear-to-r from-violet-400 to-fuchsia-300"
                                    initial={false}
                                    animate={{ width: index <= stageIndex ? "100%" : "0%" }}
                                    transition={{ duration: reduceMotion ? 0 : 0.6 }}
                                />
                            </div>
                        ))}
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={stage.title}
                            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="mt-4"
                        >
                            <p className="text-sm font-semibold text-violet-100">{stage.title}</p>
                            <p className="mt-1 text-xs leading-5 text-slate-400">{stage.description}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="relative mt-5 flex flex-col items-center gap-1.5 text-xs text-slate-400 sm:flex-row sm:justify-center sm:gap-2">
                    <Icon name="sparkle" className="h-4 w-4 text-amber-200" />
                    <span>Estimated: {GENERATION_ESTIMATE}</span>
                </div>
                {elapsedSeconds >= 180 && (
                    <p className="relative mt-3 rounded-xl border border-amber-300/15 bg-amber-300/5 px-3 py-2 text-xs leading-5 text-amber-100/80">
                        Still waiting for the final response. Keep Studio open; your current saved project is unaffected.
                    </p>
                )}
                <p className="relative mt-2 text-[10px] leading-4 text-slate-500">
                    Timing varies. These steps are visual guidance, not live server progress.
                </p>
            </div>
        </motion.div>
    );
}


const SUGGESTIONS = [
    "Create a premium pizza restaurant with beautiful food photography and a responsive menu.",
    "Design a modern personal portfolio for a full-stack developer.",
    "Build a travel agency website with destinations, packages, and a contact form.",
];

const iconPaths = {
    arrow: <path d="m15 18-6-6 6-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    send: <><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></>,
    sparkle: <><path d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z" /><path d="m19 17 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z" /></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-13-2 18" />,
    rocket: <><path d="M4 13c1-5 6-9 15-9 0 9-4 14-9 15l-5-5Z" /><path d="m12 12-4 4M4 20l2-5M4 20l5-2" /><circle cx="15" cy="9" r="1" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    save: <><path d="M5 3h12l4 4v14H3V3h2Z" /><path d="M7 3v6h10V3M7 21v-8h10v8" /></>,
    external: <><path d="M14 3h7v7m0-7-9 9" /><path d="M21 13v8H3V3h8" /></>,
};

function Icon({ name, className = "h-4 w-4" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {iconPaths[name] || iconPaths.sparkle}
        </svg>
    );
}

function getWebsiteHtml(value) {
    // Current backend saves a raw HTML string in latestCode.
    // Also tolerate older JSON-wrapped saved websites.
    if (typeof value !== "string") return "";
    const raw = value.trim();
    if (/^<!doctype html/i.test(raw) || /^<html\b/i.test(raw)) return raw;

    try {
        const parsed = JSON.parse(raw);
        const html = parsed?.html || parsed?.code || parsed?.latestCode;
        return typeof html === "string" && /^\s*(<!doctype html|<html\b)/i.test(html)
            ? html.trim()
            : "";
    } catch {
        return "";
    }
}

function getVisibleMessages(conversation) {
    if (!Array.isArray(conversation)) return [];
    return conversation
        .filter((item) => ["user", "ai", "assistant"].includes(item.role))
        .map((item) => ({
            role: item.role === "user" ? "user" : "ai",
            // Never show 25KB of generated HTML in the chat bubbles.
            content: item.role === "user" ? item.content : "Website generated and saved successfully.",
        }));
}

function useCredits(user) {
    const [credits, setCredits] = useState(
        typeof user?.credits === "number" ? user.credits : null
    );

    useEffect(() => {
        setCredits(typeof user?.credits === "number" ? user.credits : null);
    }, [user?.credits]);

    useEffect(() => {
        if (!user) return;
        const controller = new AbortController();
        fetch(`${API_URL}/api/auth/me`, {
            credentials: "include",
            signal: controller.signal,
        })
            .then((response) => response.ok ? response.json() : null)
            .then((data) => {
                const account = data?.user || data?.data?.user || data?.data || data;
                if (typeof account?.credits === "number" && !controller.signal.aborted) {
                    setCredits(account.credits);
                }
            })
            .catch(() => {});
        return () => controller.abort();
    }, [user?._id, user?.id]);

    useEffect(() => {
        const update = (event) => {
            if (typeof event.detail?.credits === "number") {
                setCredits(event.detail.credits);
            }
        };
        window.addEventListener("webloom:credits-updated", update);
        return () => window.removeEventListener("webloom:credits-updated", update);
    }, []);

    return [credits, setCredits];
}

export default function Studio() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    const { user, initialized } = useSelector((state) => state.auth);
    const [credits, setCredits] = useCredits(user);
    const location = useLocation();

    const [prompt, setPrompt] = useState("");
    const [title, setTitle] = useState("Untitled website");
    const [savedTitle, setSavedTitle] = useState("Untitled website");
    const [messages, setMessages] = useState([]);
    const [code, setCode] = useState("");
    const [formattedCode, setFormattedCode] = useState("");
    const [formattingCode, setFormattingCode] = useState(false);
    const [wrapCode, setWrapCode] = useState(false);
    const [loadingProject, setLoadingProject] = useState(Boolean(projectId));
    const [generating, setGenerating] = useState(false);
    const [generationElapsed, setGenerationElapsed] = useState(0);
    const generationStartedAt = useRef(null);
    const skipNextProjectLoadRef = useRef("");
    const [saving, setSaving] = useState(false);
    const [tab, setTab] = useState("preview");
    const [device, setDevice] = useState("desktop");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [showDeploy, setShowDeploy] = useState(false);
    const [deployURL, setDeployURL] = useState("");
    const [deployed, setDeployed] = useState(false);
    const [deploying, setDeploying] = useState(false);

    const abortRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, [messages, generating]);

    useEffect(() => () => abortRef.current?.abort(), []);

    // Warn before closing or refreshing while a paid AI generation is in flight.
    useEffect(() => {
        if (!generating) return;
        const warnOnLeave = (event) => {
            event.preventDefault();
            event.returnValue = "";
        };
        window.addEventListener("beforeunload", warnOnLeave);
        return () => window.removeEventListener("beforeunload", warnOnLeave);
    }, [generating]);

    useEffect(() => {
        if (!generating || generationStartedAt.current === null) return;

        const updateElapsed = () => {
            setGenerationElapsed(Math.floor((Date.now() - generationStartedAt.current) / 1000));
        };

        updateElapsed();
        const interval = window.setInterval(updateElapsed, 1000);
        return () => window.clearInterval(interval);
    }, [generating]);

    // Format only the Code tab. Preview always renders the original HTML.
    // Prettier is lazy-loaded, keeping the initial Studio bundle smaller.
    useEffect(() => {
        if (tab !== "code" || !code) {
            setFormattedCode("");
            setFormattingCode(false);
            return;
        }

        let cancelled = false;
        setFormattingCode(true);

        const formatWebsite = async () => {
            try {
                const [prettier, htmlModule, babelModule, estreeModule, cssModule] = await Promise.all([
                    import("prettier/standalone"),
                    import("prettier/plugins/html"),
                    import("prettier/plugins/babel"),
                    import("prettier/plugins/estree"),
                    import("prettier/plugins/postcss"),
                ]);

                const pretty = await prettier.format(code, {
                    parser: "html",
                    plugins: [
                        htmlModule.default ?? htmlModule,
                        babelModule.default ?? babelModule,
                        estreeModule.default ?? estreeModule,
                        cssModule.default ?? cssModule,
                    ],
                    tabWidth: 4,
                    useTabs: false,
                    printWidth: 100,
                    htmlWhitespaceSensitivity: "css",
                });

                if (!cancelled) setFormattedCode(pretty);
            } catch (error) {
                // Invalid AI HTML should still be inspectable in the Code tab.
                console.warn("Could not format website HTML:", error);
                if (!cancelled) setFormattedCode(code);
            } finally {
                if (!cancelled) setFormattingCode(false);
            }
        };

        formatWebsite();
        return () => { cancelled = true; };
    }, [tab, code]);



    useEffect(() => {
        if (!initialized || !user) return;

        // The backend has already returned and saved this freshly generated project.
        // Keep the new preview visible instead of briefly clearing it and refetching.
        if (projectId && skipNextProjectLoadRef.current === projectId) {
            skipNextProjectLoadRef.current = "";
            setLoadingProject(false);
            return;
        }

        abortRef.current?.abort();

        if (!projectId) {
            setPrompt("");
            setTitle("Untitled website");
            setSavedTitle("Untitled website");
            setMessages([]);
            setCode("");
            setTab("preview");
            setError("");
            setNotice("");
            setDeployed(false);
            setDeployURL("");
            setLoadingProject(false);
            return;
        }

        const controller = new AbortController();
        setLoadingProject(true);
        setError("");
        setPrompt("");
        setMessages([]);
        setCode("");
        setTitle("Opening project...");

        async function loadProject() {
            try {
                const response = await fetch(
                    `${API_URL}/api/projects/${encodeURIComponent(projectId)}`,
                    { credentials: "include", signal: controller.signal }
                );
                const data = await response.json().catch(() => ({}));
                if (!response.ok) throw new Error(data.message || "Unable to load project.");

                const project = data.project;
                if (!project) throw new Error("Project data was missing from the response.");

                const html = getWebsiteHtml(project.latestCode);
                if (project.latestCode && !html) {
                    throw new Error("This project's saved code is not a valid HTML website.");
                }

                const nextTitle = project.title || "Untitled website";
                setTitle(nextTitle);
                setSavedTitle(nextTitle);
                setCode(html);
                setMessages(getVisibleMessages(project.conversation));
                setDeployURL(project.deployURL || "");
                setDeployed(Boolean(project.deployed));
                setTab("preview");
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message || "Unable to open project.");
            } finally {
                if (!controller.signal.aborted) setLoadingProject(false);
            }
        }

        loadProject();
        return () => controller.abort();
    }, [projectId, initialized, user?._id, user?.id]);

    async function handleGenerate(event) {
        event?.preventDefault();
        const request = prompt.trim();
        if (!request || generating || loadingProject || saving) return;

        if (credits !== null && credits < GENERATION_COST) {
            setError(`Insufficient credits. A generation requires ${GENERATION_COST} credits.`);
            return;
        }

        const controller = new AbortController();
        const pendingId = `generation-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        abortRef.current = controller;
        generationStartedAt.current = Date.now();
        setGenerationElapsed(0);
        setGenerating(true);
        setError("");
        setNotice("");
        // Show the user's request immediately, even though the backend returns one final JSON response.
        setMessages((current) => [
            ...current,
            { role: "user", content: request, pendingId },
        ]);

        try {
            const response = await fetch(`${API_URL}/api/ai/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                signal: controller.signal,
                body: JSON.stringify({
                    prompt: request,
                    ...(projectId ? { projectId } : {}),
                }),
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.message || "Website generation failed.");

            const html = getWebsiteHtml(data.code);
            if (!html) throw new Error("The backend returned an invalid HTML website.");

            setCode(html);
            setTitle(data.title || title);
            setSavedTitle(data.title || title);
            setMessages((current) => [
                ...current.map((message) =>
                    message.pendingId === pendingId
                        ? { role: "user", content: message.content }
                        : message
                ),
                { role: "ai", content: data.message || "Website generated and saved successfully." },
            ]);
            setPrompt("");
            setTab("preview");
            setNotice("Website generated and saved to your projects.");

            if (typeof data.remainingCredits === "number") {
                setCredits(data.remainingCredits);
                window.dispatchEvent(new CustomEvent("webloom:credits-updated", {
                    detail: { credits: data.remainingCredits },
                }));
            }

            if (!projectId && data.projectId) {
                skipNextProjectLoadRef.current = String(data.projectId);
                navigate(`/studio/${data.projectId}`, { replace: true });
            }
        } catch (err) {
            // Failed generations leave the last saved website untouched.
            setMessages((current) => current.filter((message) => message.pendingId !== pendingId));
            if (err.name !== "AbortError") setError(err.message || "Unable to generate website.");
        } finally {
            abortRef.current = null;
            generationStartedAt.current = null;
            setGenerating(false);
        }
    }

    async function handleSaveTitle() {
        if (!projectId || saving || generating || !title.trim()) return;
        setSaving(true);
        setError("");
        setNotice("");
        try {
            const response = await fetch(
                `${API_URL}/api/projects/${encodeURIComponent(projectId)}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: title.trim() }),
                }
            );
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.message || "Could not rename project.");
            setTitle(data.project?.title || title.trim());
            setSavedTitle(data.project?.title || title.trim());
            setNotice("Project name saved.");
        } catch (err) {
            setError(err.message || "Unable to save project name.");
        } finally {
            setSaving(false);
        }
    }

    
    const handleDeploy = async () => {
        if (!projectId || !code || deploying || generating) return;

        try {
            setDeploying(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/${projectId}/deploy`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Deployment failed");
            }

            setDeployed(true);
            setDeployURL(data.deployURL);
            setShowDeploy(true);
            setNotice("Website deployed successfully!");

        } catch (error) {
            setError(error.message || "Failed to deploy website");
        } finally {
            setDeploying(false);
        }
    };


    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(formattedCode || code);
            setNotice("HTML copied to clipboard.");
        } catch {
            setError("Could not copy HTML. You can select it from the Code tab.");
        }
    }

    if (!initialized) {
        return <div className="grid min-h-screen place-items-center bg-[#090914] text-slate-400">Checking your session...</div>;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    const sourceLines = (formattedCode || code).split("\n");

    const canGenerate = Boolean(prompt.trim()) && !loadingProject && !generating && !saving && (credits === null || credits >= GENERATION_COST);

    return (
        <div className="flex min-h-screen flex-col bg-[#090914] text-white">
            <header className="relative z-30 flex min-h-18 flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0d0d1b] px-4 py-3 sm:px-7">
                <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                    <Link to="/projects" aria-label="Back to projects" aria-disabled={generating} onClick={(event) => { if (generating) event.preventDefault(); }} title={generating ? "Wait until website generation finishes" : undefined} className={`rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white ${generating ? "pointer-events-none opacity-40" : ""}`} ><Icon name="arrow" className="h-5 w-5" /></Link>
                    <Link to="/" onClick={(event) => { if (generating) event.preventDefault(); }} aria-disabled={generating} className={`hidden rounded-lg bg-white px-2.5 py-1.5 sm:block ${generating ? "pointer-events-none opacity-40" : ""}`} aria-label="Webloom home"><img src={webloomLogo} alt="Webloom" className="h-6 w-auto" /></Link>
                    <span className="hidden h-6 w-px bg-white/10 sm:block" />
                    <div className="min-w-0 flex-1">
                        <input
                            aria-label="Project name"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            disabled={!projectId || loadingProject}
                            maxLength={120}
                            className="w-full max-w-72 truncate rounded-md bg-transparent px-1 py-1 text-sm font-semibold text-slate-100 outline-none focus:bg-white/5 disabled:cursor-default sm:max-w-96"
                        />
                        <span className="ml-38 text-[11px] text-slate-500">{projectId ? "Saved project" : "New project"}</span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-2 text-xs font-semibold text-amber-100" title="Every AI generation costs 50 credits">
                        <span className="text-base text-amber-300">◈</span> {credits ?? "—"} <span className="hidden text-amber-200/70 sm:inline">credits</span>
                    </div>
                    {projectId && title.trim() !== savedTitle && (
                        <button onClick={handleSaveTitle} disabled={saving || generating || !title.trim()} className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 disabled:opacity-50"><Icon name="save" /> {saving ? "Saving..." : "Save name"}</button>
                    )}
                    <Link to="/studio" onClick={(event) => { if (generating) event.preventDefault(); }} aria-disabled={generating} className={`inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 ${generating ? "pointer-events-none opacity-40" : ""}`}><Icon name="plus" /> New</Link>
                    <button
                        type="button"
                        onClick={handleDeploy}
                        disabled={!projectId || !code || generating || loadingProject || deploying}
                        className="inline-flex items-center gap-2 rounded-xl bg-violet-300 px-4 py-2 text-xs font-bold text-[#1c112c] transition hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                    >
                        <Icon name="rocket" />
                        {deploying ? "Deploying..." : deployed ? "Redeploy" : "Deploy"}

                    </button>
                </div>
            </header>

            <main className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[390px_minmax(0,1fr)] xl:grid-cols-[430px_minmax(0,1fr)]">
                <section className="flex min-h-140 flex-col border-b border-white/10 bg-[#0e0e1e] lg:h-[calc(100vh-76px)] lg:min-h-0 lg:border-b-0 lg:border-r" aria-label="Webloom AI conversation">
                    <div className="border-b border-white/10 px-6 py-5">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-violet-300"><Icon name="sparkle" /> WEBLOOM AI</div>
                        <h1 className="mt-3 text-xl font-semibold tracking-tight">Build something incredible.</h1>
                        <p className="mt-2 text-sm leading-6 text-slate-400">Describe a website or request changes to an existing one.</p>
                    </div>
                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
                        {loadingProject ? (
                            <div className="flex items-center gap-3 text-sm text-slate-400"><span className="h-4 w-4 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-300" /> Opening your project...</div>
                        ) : messages.length === 0 ? (
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Try a prompt</p>
                                <div className="mt-4 space-y-3">
                                    {SUGGESTIONS.map((suggestion) => (
                                        <button key={suggestion} type="button" onClick={() => setPrompt(suggestion)} className="w-full rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left text-sm leading-6 text-slate-300 transition hover:border-violet-300/30 hover:bg-violet-300/10">{suggestion}</button>
                                    ))}
                                </div>
                            </div>
                        ) : messages.map((message, index) => (
                            <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[94%] rounded-2xl p-4 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-violet-400/20 text-violet-50" : "rounded-bl-md border border-white/10 bg-white/5 text-slate-300"}`}>
                                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider opacity-60">{message.role === "user" ? "You" : "Webloom AI"}</p>
                                    <p className="whitespace-pre-wrap wrap-break-word">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        <AnimatePresence mode="wait">
                            {generating && (
                                <GenerationExperience
                                    key="chat-generation-status"
                                    compact
                                    elapsedSeconds={generationElapsed}
                                    isUpdate={Boolean(code)}
                                    reduceMotion={reduceMotion}
                                />
                            )}
                        </AnimatePresence>
                        <div ref={bottomRef} />
                    </div>
                    {(error || notice) && (
                        <div role={error ? "alert" : "status"} className={`mx-5 mb-3 rounded-xl border p-3 text-xs leading-5 ${error ? "border-rose-400/20 bg-rose-500/10 text-rose-200" : "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"}`}>{error || notice}</div>
                    )}
                    <form onSubmit={handleGenerate} className="border-t border-white/10 p-4 sm:p-5">
                        <div className="rounded-2xl border border-violet-300/20 bg-white/5 p-3 focus-within:border-violet-300/60">
                            <label htmlFor="webloom-prompt" className="sr-only">Describe your website</label>
                            <textarea id="webloom-prompt" rows={3} value={prompt} onChange={(event) => setPrompt(event.target.value)} disabled={generating || loadingProject || saving} onKeyDown={(event) => { if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder="Describe your next website or ask for a change..." className="w-full resize-none bg-transparent px-2 py-1 text-sm leading-6 text-white outline-none placeholder:text-slate-500 disabled:opacity-50" />
                            <div className="mt-2 flex items-center justify-between gap-3">
                                <p className="pl-2 text-[11px] text-slate-500">50 credits / generation</p>
                                <button type="submit" disabled={!canGenerate} className="inline-flex items-center gap-2 rounded-xl bg-violet-300 px-4 py-2.5 text-xs font-bold text-[#170e28] transition hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-40"><Icon name="send" /> {generating ? "Generating..." : code ? "Refine website" : "Generate website"}</button>
                            </div>
                        </div>
                        {credits !== null && credits < GENERATION_COST && <p className="mt-2 text-xs text-amber-300">You need at least 50 credits for the next AI generation.</p>}
                    </form>
                </section>

                <section className="flex min-h-162.5 min-w-0 flex-col bg-[#090914] lg:h-[calc(100vh-76px)] lg:min-h-0" aria-label="Website preview and source">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
                        <div className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.035] p-1">
                            <button type="button" onClick={() => setTab("preview")} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${tab === "preview" ? "bg-violet-300/15 text-violet-100" : "text-slate-400 hover:text-white"}`}><Icon name="eye" /> Preview</button>
                            <button type="button" onClick={() => setTab("code")} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${tab === "code" ? "bg-violet-300/15 text-violet-100" : "text-slate-400 hover:text-white"}`}><Icon name="code" /> Code</button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            {tab === "preview" && code && ["desktop", "tablet", "mobile"].map((mode) => (
                                <button key={mode} type="button" onClick={() => setDevice(mode)} className={`rounded-lg px-2.5 py-1.5 capitalize transition ${device === mode ? "bg-violet-300/15 text-violet-100" : "hover:bg-white/10"}`}>{mode}</button>
                            ))}
                            {generating ? <span className="inline-flex items-center gap-2 text-violet-200"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300" />Preparing new version</span> : !code && <span>Waiting for website</span>}
                        </div>
                    </div>
                    <div className="relative m-4 flex min-h-125 flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151527] sm:m-6 lg:min-h-0">
                        <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/10 bg-[#161729] px-4">
                            <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" /></div>
                            <span className="max-w-[65%] truncate text-[11px] text-slate-400">{title || "Webloom website"} · {tab === "preview" ? "Preview" : "index.html"}</span>
                            {code && tab === "code" ? (
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setWrapCode((current) => !current)}
                                        className="text-xs text-slate-300 transition hover:text-white"
                                    >
                                        {wrapCode ? "No wrap" : "Wrap lines"}
                                    </button>
                                    <button type="button" onClick={handleCopy} className="inline-flex items-center gap-1 text-xs text-violet-200 hover:text-white">
                                        <Icon name="copy" /> Copy
                                    </button>
                                </div>
                            ) : <span className="text-[10px] text-slate-500">WEBLOOM</span>}
                        </div>
                        <motion.div
                            animate={{ filter: generating ? "blur(3px)" : "blur(0px)", opacity: generating ? 0.4 : 1 }}
                            transition={{ duration: reduceMotion ? 0 : 0.45 }}
                            className="min-h-0 flex-1 overflow-auto"
                            aria-hidden={generating}
                        >
                            {tab === "preview" ? (
                                code ? (
                                    <div className="flex h-full min-h-118.5 justify-center overflow-auto bg-[#242432] p-0 sm:p-3">
                                        <div className="h-full min-h-118.5 shrink-0 overflow-hidden bg-white shadow-2xl transition-[width] duration-300" style={{ width: device === "mobile" ? "min(390px, 100%)" : device === "tablet" ? "min(768px, 100%)" : "100%" }}>
                                            <iframe key={code} title="Generated website preview" srcDoc={code} sandbox="allow-scripts" referrerPolicy="no-referrer" className="h-full min-h-118.5 w-full border-0 bg-white" />
                                        </div>
                                    </div>
                                ) : generating ? (
                                    <div className="min-h-118.5 bg-[#f7f5fb] p-6 sm:p-10" aria-hidden="true">
                                        <div className="mb-12 flex items-center justify-between">
                                            <div className="h-7 w-28 rounded-lg bg-slate-300/70" />
                                            <div className="flex gap-3"><div className="h-4 w-14 rounded bg-slate-300/70" /><div className="h-4 w-14 rounded bg-slate-300/70" /></div>
                                        </div>
                                        <div className="grid gap-8 lg:grid-cols-2">
                                            <div className="space-y-5 pt-8"><div className="h-5 w-24 rounded bg-violet-300/60" /><div className="h-12 w-full rounded-xl bg-slate-300/80" /><div className="h-12 w-4/5 rounded-xl bg-slate-300/80" /><div className="h-5 w-5/6 rounded bg-slate-200" /><div className="h-10 w-32 rounded-full bg-violet-300/60" /></div>
                                            <div className="min-h-52 rounded-[28px] bg-slate-300/70" />
                                        </div>
                                        <div className="mt-12 grid gap-5 sm:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="h-32 rounded-2xl bg-slate-200" />)}</div>
                                    </div>
                                ) : (
                                    <div className="flex h-full min-h-118.5 flex-col items-center justify-center px-6 text-center">
                                        <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl border border-violet-300/20 bg-violet-300/10 text-violet-200"><Icon name="sparkle" className="h-9 w-9" /></div>
                                        <h2 className="text-xl font-semibold">A blank canvas. Endless possibilities.</h2>
                                        <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">Generate a website or open one of your saved projects to preview it here.</p>
                                    </div>
                                )
                            ) : (
                                <div className="min-h-full bg-[#0b0d19] font-mono text-xs leading-6 text-slate-300">
                                    {!code ? (
                                        <p className="p-6 text-slate-400">Generate a website to view its HTML, CSS and JavaScript here.</p>
                                    ) : (
                                        <>
                                            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#101224] px-4 py-2 text-[11px] text-slate-400">
                                                <span>index.html · {sourceLines.length.toLocaleString()} lines</span>
                                                <span>{formattingCode ? "Formatting HTML, CSS and JavaScript..." : "Formatted source"}</span>
                                            </div>
                                            <div className={`${wrapCode ? "w-full" : "w-max min-w-full"} py-4`}>
                                                {sourceLines.map((line, index) => (
                                                    <div key={index} className="flex min-w-full hover:bg-violet-300/4">
                                                        <span className="sticky left-0 w-14 shrink-0 select-none border-r border-white/6 bg-[#0b0d19] pr-4 text-right text-slate-600">
                                                            {index + 1}
                                                        </span>
                                                        <span className={`min-w-0 px-5 text-slate-200 ${wrapCode ? "whitespace-pre-wrap break-all" : "whitespace-pre"}`}>
                                                            {line || " "}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </motion.div>
                        <AnimatePresence>
                            {generating && (
                                <GenerationExperience
                                    elapsedSeconds={generationElapsed}
                                    isUpdate={Boolean(code)}
                                    reduceMotion={reduceMotion}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-5 text-xs text-slate-500 sm:px-6">
                        <span>HTML, CSS and JavaScript · Sandboxed preview</span>
                        <Link to="/projects" onClick={(event) => { if (generating) event.preventDefault(); }} aria-disabled={generating} className={`font-medium text-violet-200 transition hover:text-white ${generating ? "pointer-events-none opacity-40" : ""}`}>All projects →</Link>
                    </div>
                </section>
            </main>

            <AnimatePresence>
                {showDeploy && (
                    <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm" 
                    onMouseDown={(event) => { if (event.target === event.currentTarget) setShowDeploy(false); }}>
                        <motion.div role="dialog" aria-modal="true" aria-labelledby="deploy-heading" initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} className="w-full max-w-md rounded-3xl border border-violet-300/20 bg-[#191629] p-6 text-white shadow-2xl">

                            <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-300/10 text-violet-200">
                                <Icon name="rocket" className="h-6 w-6" /></span><button type="button" aria-label="Close deployment dialog" onClick={() => setShowDeploy(false)} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                                    <Icon name="close" />
                                </button>
                            </div>
                            <h2 id="deploy-heading" className="mt-5 text-xl font-semibold">"Your website is deployed"</h2>
                            
                            <p className="mt-3 text-sm leading-7 text-slate-400">{deployed && deployURL ? "Your project already has a deployment URL." : "Your project is saved in Webloom. Publishing it to a public URL isn't connected yet; the Deploy action is reserved for that next step."}</p>
                            
                            {deployed && /^https?:\/\//i.test(deployURL) && <a href={deployURL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-300 px-4 py-2.5 text-sm font-semibold text-[#180f2a]">
                                <Icon name="external" /> Open live website</a>}

                            <button type="button" onClick={() => setShowDeploy(false)} className="mt-6 block w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/10">Close</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
