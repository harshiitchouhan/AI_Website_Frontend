import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/authSlice";

import Navbar from "../Components/layouts/Navbar";
import LoginHero from "../Components/LoginHero";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

const fieldClassName =
    "h-12 w-full rounded-xl border border-white/10 bg-[#0b0c18] px-4 text-sm text-white " +
    "outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 " +
    "focus:ring-2 focus:ring-violet-400/15";

export default function Login() {
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    // current user fetch /me
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
    });


    const onSubmit = async (values) => {
        setServerError("");

        try {
            await dispatch(loginUser(values)).unwrap();
            navigate("/studio", { replace: true });
        } catch (error) {
            setServerError(
                typeof error === "string"
                    ? error
                    : error?.message || "Login failed"
            );
        }
    };

    const reveal = reduceMotion
        ? {}
        : {
              initial: { opacity: 0, y: 22 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.65 },
          };

    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-[#090914] text-white selection:bg-violet-400/30">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                
                <div className="absolute -left-48 -top-12 h-h-152 w-h-152 rounded-full bg-[#5d3b9a]/15 blur-[110px]" />
                <div className="absolute -right-48 -botom-60  h-160 w-160 rounded-full bg-[#224e90]/15 blur-[130px]" />
                <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] background-size-[64px_64px] mask-[linear-gradient(to_bottom,black,transparent_80%)]" />
            
            </div>

            <Navbar variant="minimal" />

            <div className="mx-auto grid min-h-[calc(100vh-100px)] w-full max-w-7xl items-center gap-12 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:px-10">
                <LoginHero reveal={reveal} />

                <motion.section {...reveal} className="mx-auto w-full max-w-117.5">
                    <div className="rounded-[28px] border border-white/10 bg-[#131322]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-10">
                        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.27em] text-[#c4a9fa]">
                            WELCOME BACK
                        </p>
                        <h2 className="text-4xl font-semibold tracking-[-0.065em] sm:text-[44px]">
                            Sign in to Webloom.
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-slate-400">
                            Your next great idea is right where you left it.
                        </p>

                        <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-9 space-y-5">
                            <div>
                                <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-200">
                                    Email address
                                </label>
                                <input
                                    id="login-email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={errors.email ? "login-email-error" : undefined}
                                    className={`${fieldClassName} ${errors.email ? "border-rose-400/60" : ""}`}
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p id="login-email-error" role="alert" className="mt-2 text-xs text-rose-300">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-slate-200">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        aria-invalid={Boolean(errors.password)}
                                        aria-describedby={errors.password ? "login-password-error" : undefined}
                                        className={`${fieldClassName} pr-20 ${errors.password ? "border-rose-400/60" : ""}`}
                                        {...register("password")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((current) => !current)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        aria-pressed={showPassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p id="login-password-error" role="alert" className="mt-2 text-xs text-rose-300">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {serverError && (
                                <p role="alert" className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm leading-6 text-rose-200">
                                    {serverError}
                                </p>
                            )}

                            <motion.button
                                type="submit"
                                disabled={isSubmitting || loading}
                                whileHover={reduceMotion || isSubmitting || loading ? {} : { y: -2 }}
                                whileTap={reduceMotion || isSubmitting || loading ? {} : { scale: 0.985 }}
                                className="flex h-12 w-full items-center justify-center rounded-xl bg-linear-to-r from-[#b08afb] to-[#da8cf6] px-5 text-sm font-semibold text-[#171126] shadow-[0_12px_36px_rgba(153,100,236,0.16)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting || loading ? "Signing in..." : "Sign in"}
                            </motion.button>
                        </form>

                        <p className="mt-7 text-center text-sm text-slate-400">
                            New to Webloom?{" "}
                            <Link to="/register" className="font-medium text-[#c4a9fa] transition hover:text-white">
                                Create an account
                            </Link>
                        </p>
                    </div>
                    <p className="mt-6 text-center text-xs text-slate-500">
                        A space for your next idea to take shape.
                    </p>
                </motion.section>
            </div>
        </main>
    );
}
