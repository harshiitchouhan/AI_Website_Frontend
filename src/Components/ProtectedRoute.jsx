import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function ProtectedRoute({ children }) {
    const location = useLocation();

    const { user, loading } = useSelector((state) => state.auth);

    // Show loader while checking authentication
    // loader
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#090711]">
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        className="h-12 w-12 rounded-2xl border border-violet-400/40 bg-violet-500/10"
                        animate={{
                            rotate: [0, 90, 180, 270, 360],
                            scale: [1, 1.15, 1, 1.15, 1],
                            borderRadius: ["25%", "50%", "25%"],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <motion.p
                        className="text-sm tracking-[0.25em] text-violet-300"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                    >
                        WEBLOOM
                    </motion.p>
                </div>
            </div>
        );
    }

    // Redirect unauthenticated users
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
}