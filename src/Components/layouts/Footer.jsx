import webloomLogo from "../../assets/Webloom.png";
import { Link } from "react-router";

function Footer() {
    return (
            <footer className="relative z-10 border-t border-white/9">
                <div className="mx-auto flex max-w-330 flex-col gap-7 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
                    <a href="/#top" aria-label="Back to Webloom home" className="w-fit rounded-lg bg-white px-2.5 py-1.5"><img src={webloomLogo} alt="Webloom" className="h-7 w-auto" /></a>
                    <p className="text-xs text-slate-500">© {new Date().getFullYear()} Webloom. The web begins with an idea.</p>
                    <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
                        <Link
                                to="/explore"
                                className="transition hover:text-white"
                            >
                                Explore
                            </Link>

                            <Link
                                to="/why-webloom"
                                className="transition hover:text-white"
                            >
                                Why Webloom
                            </Link>
                        <a className="transition hover:text-white" href="/#top">Back to top ↑</a></div>
                </div>
            </footer>
    );
}

export default Footer;
