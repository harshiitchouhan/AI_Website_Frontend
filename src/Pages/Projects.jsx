import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate , useLocation , Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/authSlice";
import { motion } from "framer-motion";
import webloomLogo from "../assets/Webloom.png";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

function Icon({ type, className = "h-5 w-5" }) {
    const common = {
        className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true
    };

    if (type === "plus") {
        return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
    }
    if (type === "arrow") {
        return <svg {...common}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
    }
    if (type === "search") {
        return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
    }
    if (type === "trash") {
        return <svg {...common}><path d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3" /></svg>;
    }
    if (type === "layers") {
        return <svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" /></svg>;
    }
    if (type === "share") {
        return (
            <svg {...common}>
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="m8.7 13.6 6.6 3.8M15.3 6.6l-6.6 3.8" />
            </svg>
        );
    }
    return <svg {...common}><path d="M4 5h16v14H4zM4 9h16" /></svg>;
}

function readableDate(value) {
    if (!value) return "Recently created";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recently created";
    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric", month: "short", year: "numeric"
    }).format(date);
}

function getId(project) {
    return project._id || project.id;
}

function ProjectsHeader({ displayName, email }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState("");

    async function handleLogout() {
        if (loggingOut) return;
        setLoggingOut(true);
        setLogoutError("");
        try {
            await dispatch(logoutUser()).unwrap();
            navigate("/", { replace: true });
        } catch (err) {
            setLogoutError(err?.message || "Could not log out.");
        } finally {
            setLoggingOut(false);
        }
    }



    return (
        <header className="relative z-20 border-b border-white/8 bg-[#090914]/80 backdrop-blur-xl">
            <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
                <Link to="/" aria-label="Webloom home" className="rounded-xl bg-white px-3 py-2">
                    <img src={webloomLogo} alt="Webloom" className="h-7 w-auto object-contain" />
                </Link>
                <div className="hidden items-center gap-8 text-sm text-slate-400 sm:flex">
                    <Link to="/" aria-current="page" className="font-semibold text-violet-200">Home</Link>
                    <Link to="/explore" aria-current="page" className="font-semibold text-violet-200">Explore</Link>
                    <Link to="/projects" aria-current="page" className="font-semibold text-violet-200">Projects</Link>
                    <Link to="/pricing" aria-current="page" className="font-semibold text-violet-200">Pricing</Link>

                </div>
                <details className="group relative">
                    <summary className="flex h-10 cursor-pointer list-none items-center gap-3 rounded-full border border-white/10 bg-white/4.5 pl-1.5 pr-4 [&::-webkit-details-marker]:hidden">
                        
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/30 text-xs font-bold text-violet-100">
                            {displayName.charAt(0).toUpperCase()}
                        </span>

                        <span className="max-w-24 truncate text-xs font-semibold text-slate-200 sm:max-w-40 sm:text-sm">{displayName}</span>
                        
                    </summary>

                    <div className="absolute right-0 z-40 mt-3 w-60 rounded-2xl border border-violet-300/15 bg-[#1b1729] p-2 shadow-[0_22px_60px_rgba(0,0,0,0.5)]">
                        
                        <div className="border-b border-white/10 px-3 py-3">
                            <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                            <p className="mt-1 truncate text-xs text-slate-400">{email}</p>
                        
                        </div>

                        <button type="button" onClick={handleLogout} disabled={loggingOut} className="mt-1 w-full rounded-xl px-3 py-3 text-left text-sm text-rose-300 transition hover:bg-rose-400/10 disabled:opacity-50">
                            {loggingOut ? "Logging out..." : "Logout"}
                        </button>

                        {logoutError && <p role="alert" className="px-3 pb-2 text-xs text-rose-300">{logoutError}</p>}
                    
                    </div>
                    
                </details>
            </nav>
        </header>
    );
}


function PreviewArtwork({ project }) {
    const projectId = getId(project);
    const containerRef = useRef(null);

    const [html, setHtml] = useState("");
    const [shouldLoad, setShouldLoad] = useState(false);
    const [previewWidth, setPreviewWidth] = useState(400);
    const [previewError, setPreviewError] = useState(false);

    const image = project.thumbnailUrl || project.thumbnail || project.previewImage;

    useEffect(() => {
        if (image) return;

        const element = containerRef.current;
        if (!element) return;

        const resizeObserver = new ResizeObserver(([entry]) => {
            setPreviewWidth(entry.contentRect.width);
        });

        resizeObserver.observe(element);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "250px" }
        );

        observer.observe(element);

        return () => {
            resizeObserver.disconnect();
            observer.disconnect();
        };
    }, [projectId, image]);

    useEffect(() => {
        if (!shouldLoad || !projectId || image) return;

        const controller = new AbortController();

        async function loadPreview() {
            try {
                const response = await fetch(
                    `${API_URL}/api/projects/${encodeURIComponent(projectId)}`,
                    {
                        credentials: "include",
                        signal: controller.signal,
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Failed to load preview");
                }

                const generatedHTML = data.project?.latestCode;

                if (
                    typeof generatedHTML !== "string" ||
                    !/^\s*(<!doctype html|<html\b)/i.test(generatedHTML)
                ) {
                    throw new Error("Invalid website HTML");
                }

                setHtml(generatedHTML);

            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Preview Error:", error);
                    setPreviewError(true);
                }
            }
        }

        loadPreview();

        return () => controller.abort();
    }, [projectId, shouldLoad, image]);

    if (image) {
        return (
            <img
                src={image}
                alt={`Preview of ${project.title || "website"}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                loading="lazy"
            />
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full overflow-hidden bg-white"
        >
            {html ? (
                <iframe
                    title={`Preview of ${project.title || "website"}`}
                    srcDoc={html}
                    sandbox="allow-scripts"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    scrolling="no"
                    tabIndex={-1}
                    className="pointer-events-none absolute left-0 top-0 border-0"
                    style={{
                        width: 1200,
                        height: 750,
                        transform: `scale(${previewWidth / 1200})`,
                        transformOrigin: "top left",
                    }}
                />
            ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 bg-linear-to-br from-[#211936] to-[#11111f]">
                    {previewError ? (
                        <p className="text-xs text-slate-400">
                            Preview unavailable
                        </p>
                    ) : (
                        <>
                            <div className="h-7 w-7 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-300" />
                            <p className="text-xs text-slate-400">
                                Loading website preview...
                            </p>
                        </>
                    )}
                </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
        </div>
    );
}


export default function Projects() {
    const { user, initialized } = useSelector((state) => state.auth);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [reloadCount, setReloadCount] = useState(0);
    const [copiedId, setCopiedId] = useState(null);
    const location = useLocation();

    const displayName = user?.name?.trim() || user?.email?.split("@")[0] || "Account";

    useEffect(() => {
        if (!initialized) return;
        if (!user) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        async function fetchProjects() {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(`${API_URL}/api/projects`, {
                    credentials: "include",
                    signal: controller.signal
                });
                const data = await response.json().catch(() => ({}));
                if (!response.ok) {
                    throw new Error(data.message || `Unable to load projects (${response.status}).`);
                }

                // Supports either GET response: { projects: [...] } or [...].
                const items = Array.isArray(data) ? data : data.projects;
                if (!Array.isArray(items)) throw new Error("Unexpected projects API response.");
                setProjects(items);
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message || "Could not fetch projects.");
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        fetchProjects();
        return () => controller.abort();
    }, [initialized, user, reloadCount]);

    const filteredProjects = useMemo(() => {
        return [...projects]
            .filter((project) => (project.title || "Untitled website").toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
    }, [projects, search]);

    
    async function shareProject(project) {
        if (!project.deployed) return;

        const shareURL =
            project.deployURL ||
            (project.slug
                ? `${window.location.origin}/site/${encodeURIComponent(project.slug)}`
                : "");

        let validURL;

        try {
            validURL = new URL(shareURL);

            if (!["http:", "https:"].includes(validURL.protocol)) {
                throw new Error("Invalid deployment URL");
            }
        } catch {
            setError("No valid deployment URL found.");
            return;
        }

        if (navigator.share) {
            try {
                await navigator.share({
                    title: project.title || "Webloom Website",
                    text: "Check out my website built with Webloom!",
                    url: validURL.href,
                });

                return;
            } catch (error) {
                if (error.name === "AbortError") return;
            }
        }

        try {
            await navigator.clipboard.writeText(validURL.href);

            const id = getId(project);
            setCopiedId(id);

            window.setTimeout(() => {
                setCopiedId((current) => current === id ? null : current);
            }, 2000);

        } catch (error) {
            console.error("Share Error:", error);
            setError("Unable to copy website link.");
        }
    }


    async function deleteProject(project) {
        const id = getId(project);
        if (!id || deletingId) return;
        if (!window.confirm(`Delete "${project.title || "Untitled website"}"? This cannot be undone.`)) return;

        setDeletingId(id);
        setError("");
        try {
            const response = await fetch(`${API_URL}/api/projects/${encodeURIComponent(id)}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || "Unable to delete this project.");
            }
            setProjects((items) => items.filter((item) => getId(item) !== id));
        } catch (err) {
            setError(err.message || "Unable to delete this project.");
        } finally {
            setDeletingId(null);
        }
    }

    if (!initialized) {
        return <div className="grid min-h-screen place-items-center bg-[#090914] text-sm text-slate-400">Checking your session...</div>;
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

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#090914] font-sans text-white selection:bg-violet-500/30">
            <div className="pointer-events-none absolute left-1/2 top-0 h-142.5 w-212.5 -translate-x-1/2 rounded-full bg-violet-600/9 blur-[110px]" />
            <ProjectsHeader displayName={displayName} email={user.email} />

            <main className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:px-10 lg:pt-16">
                <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/[0.07] px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] text-violet-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-300" /> YOUR WORKSPACE
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl">Your projects<span className="text-violet-400">.</span></h1>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">Every idea you turn into a website, in one place. Pick up right where you left off.</p>
                    </div>
                    <Link
                        to="/studio"
                        className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-xl bg-violet-300 px-5 py-3.5 text-sm font-bold text-[#170f27] shadow-[0_12px_40px_rgba(139,92,246,0.15)] transition hover:bg-violet-200"
                    >
                        <Icon type="plus" className="h-4 w-4" /> Create new project
                    </Link>
                </div>

                {error && (
                    <div role="alert" className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-400/25 bg-rose-500/10 p-4 text-sm text-rose-200">
                        <span>{error}</span>
                        <button onClick={() => setReloadCount((count) => count + 1)} className="underline underline-offset-4">Try again</button>
                    </div>
                )}

                {loading ? (
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading projects">
                        {[1, 2, 3].map((item) => <div key={item} className="h-83.75 animate-pulse rounded-2xl border border-white/10 bg-white/4.5" />)}
                    </div>
                ) : projects.length === 0 && !error ? (
                    <motion.section
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto mt-14 flex max-w-3xl flex-col items-center rounded-[28px] border border-dashed border-violet-300/20 bg-white/2.5 px-6 py-20 text-center"
                    >
                        <div className="mb-7 grid h-20 w-20 place-items-center rounded-3xl border border-violet-300/20 bg-violet-300/8 text-violet-200">
                            <Icon type="layers" className="h-9 w-9" />
                        </div>
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">No projects yet</h2>
                        <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">Your workspace is a blank canvas. Describe what you want to build, and Webloom will help you make it real.</p>
                        <Link to="/studio" className="mt-8 inline-flex items-center gap-2 rounded-xl border border-violet-200/30 bg-violet-400/15 px-5 py-3 text-sm font-semibold text-violet-100 transition hover:bg-violet-400/25">
                            Start your first project <Icon type="arrow" className="h-4 w-4" />
                        </Link>
                    </motion.section>
                ) : (
                    <>
                        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
                            <p className="text-sm text-slate-400">{projects.length} {projects.length === 1 ? "project" : "projects"}</p>
                            <label className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-slate-400 focus-within:border-violet-300/50 sm:w-72">
                                <Icon type="search" className="h-4 w-4" />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search your projects"
                                    className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                                />
                            </label>
                        </div>
                        {filteredProjects.length === 0 ? (
                            <p className="mt-16 text-center text-sm text-slate-400">No projects match your search.</p>
                        ) : (
                            <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Saved websites">
                                {filteredProjects.map((project, index) => {
                                    const id = getId(project);
                                    return (
                                        <motion.article
                                            key={id || index}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: Math.min(index * 0.045, 0.25) }}
                                            className="group overflow-hidden rounded-2xl border border-white/9 bg-[#11111f] transition hover:-translate-y-1 hover:border-violet-300/25 hover:shadow-[0_20px_55px_rgba(0,0,0,0.3)]"
                                        >
                                            <Link to={id ? `/studio/${id}` : "/studio"} aria-label={`Open ${project.title || "Untitled website"}`} className="block h-48 overflow-hidden border-b border-white/8]">
                                                <PreviewArtwork project={project} />
                                            </Link>
                                            <div className="p-5">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="min-w-0">
                                                        <h2 className="truncate text-base font-semibold tracking-tight">{project.title || "Untitled website"}</h2>
                                                        <p className="mt-1.5 text-xs text-slate-500">Updated {readableDate(project.updatedAt || project.createdAt)}</p>
                                                    </div>
                                                    {project.deployed && <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">Live</span>}
                                                </div>
                                                
                                                <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
                                                    <Link
                                                        to={id ? `/studio/${id}` : "/studio"}
                                                        className="inline-flex items-center gap-2 text-sm font-medium text-violet-200 transition group-hover:text-violet-100"
                                                    >
                                                        Open project
                                                        <Icon type="arrow" className="h-4 w-4" />
                                                    </Link>

                                                    <div className="flex items-center gap-2">
                                                        {project.deployed && (project.deployURL || project.slug) && (
                                                            <button
                                                                type="button"
                                                                onClick={() => shareProject(project)}
                                                                title="Share website"
                                                                className="inline-flex items-center gap-1.5 rounded-lg border border-violet-300/15 bg-violet-300/10 px-3 py-2 text-xs font-medium text-violet-200 transition hover:bg-violet-300/20"
                                                            >
                                                                <Icon type="share" className="h-4 w-4" />
                                                                {copiedId === id ? "Copied!" : "Share"}
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            title="Delete project"
                                                            aria-label={`Delete ${project.title || "Untitled website"}`}
                                                            disabled={deletingId === id}
                                                            onClick={() => deleteProject(project)}
                                                            className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-400/10 hover:text-rose-300 disabled:opacity-50"
                                                        >
                                                            <Icon type="trash" className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
