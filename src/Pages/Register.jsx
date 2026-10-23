
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../Redux/authSlice";

import Navbar from "../Components/layouts/Navbar";
import LoginHero from "../Components/LoginHero";

// Validation Schema
const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(60, "Name cannot exceed 60 characters"),

        email: z
            .string()
            .trim()
            .min(1, "Email is required")
            .email("Enter a valid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine(
        (values) => values.password === values.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

// Existing Login Input Styling
const fieldClassName =
    "h-12 w-full rounded-xl border border-white/10 bg-[#0b0c18] px-4 text-sm text-white " +
    "outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 " +
    "focus:ring-2 focus:ring-violet-400/15";

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:4000"
).replace(/\/$/, "");

export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const reduceMotion = useReducedMotion();

    const { loading } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [serverError, setServerError] = useState("");
    const [accountCreated, setAccountCreated] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onSubmit",
    });

    const isBusy = isSubmitting || loading;

    const from = location.state?.from;

    const redirectTo =
        from?.pathname &&
        from.pathname.startsWith("/") &&
        !from.pathname.startsWith("//") &&
        !from.pathname.startsWith("/\\")
            ? `${from.pathname}${from.search || ""}${from.hash || ""}`
            : "/studio";

    // Register User + Automatic Login
    const onSubmit = async (values) => {
        if (accountCreated) return;

        setServerError("");

        const credentials = {
            email: values.email.trim().toLowerCase(),
            password: values.password,
        };

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name.trim(),
                    ...credentials,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to create your account"
                );
            }

            setAccountCreated(true);
        } catch (error) {
            setServerError(
                error?.message || "Registration failed. Please try again."
            );

            return;
        }

        // Existing Redux Authentication
        try {
            await dispatch(loginUser(credentials)).unwrap();

            navigate(redirectTo, {
                replace: true,
            });
        } catch (error) {
            setServerError(
                "Your account was created successfully, but automatic login failed. Please sign in."
            );
        }
    };

    const reveal = reduceMotion
        ? {}
        : {
              initial: { opacity: 0, y: 22 },
              animate: { opacity: 1, y: 0 },
              transition: {
                  duration: 0.65,
                  ease: "easeOut",
              },
          };

    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-[#090914] text-white selection:bg-violet-400/30">

            {/* Animated Background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <motion.div
                    className="absolute -left-48 -top-12 h-152 w-152 rounded-full bg-[#5d3b9a]/15 blur-[110px]"
                    animate={
                        reduceMotion
                            ? {}
                            : {
                                  x: [0, 75, 25, 0],
                                  y: [0, 45, -25, 0],
                                  scale: [1, 1.15, 1.05, 1],
                              }
                    }
                    transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute -right-48 -bottom-60 h-160 w-160 rounded-full bg-[#224e90]/15 blur-[130px]"
                    animate={
                        reduceMotion
                            ? {}
                            : {
                                  x: [0, -65, -20, 0],
                                  y: [0, -55, 20, 0],
                                  scale: [1, 1.2, 1.05, 1],
                              }
                    }
                    transition={{
                        duration: 19,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(to_bottom,black,transparent_80%)]" />
            </div>

            {/* Navbar */}
            <Navbar variant="minimal" />

            {/* Main Layout */}
            <div className="mx-auto grid min-h-[calc(100vh-100px)] w-full max-w-7xl items-center gap-12 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:px-10">

                {/* Existing Hero */}
                <LoginHero reveal={reveal} />

                {/* Register Card */}
                <motion.section
                    {...reveal}
                    className="mx-auto w-full max-w-117.5"
                >
                    <div className="group relative rounded-[28px] border border-white/10 bg-[#131322]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-colors duration-500 hover:border-violet-400/20 sm:p-10">

                        {/* Card Shine */}
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
                            <motion.div
                                className="absolute -top-1/2 left-0 h-[200%] w-20 rotate-25 bg-linear-to-r from-transparent via-white/5 to-transparent blur-xl"
                                animate={
                                    reduceMotion
                                        ? {}
                                        : { x: [-180, 650] }
                                }
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatDelay: 4,
                                    ease: "easeInOut",
                                }}
                            />

                            <div className="absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-violet-300/50 to-transparent" />
                        </div>

                        {/* Header */}
                        <div className="relative">
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.27em] text-[#c4a9fa]">
                                START YOUR JOURNEY
                            </p>

                            <h2 className="text-4xl font-semibold tracking-[-0.065em] sm:text-[44px]">
                                Join Webloom.
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-slate-400">
                                One account. Endless possibilities. Start
                                building something extraordinary.
                            </p>
                        </div>

                        {/* Register Form */}
                        <form
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            className="relative mt-9 space-y-5"
                        >

                            {/* Full Name */}
                            <div>
                                <label
                                    htmlFor="register-name"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Full name
                                </label>

                                <input
                                    id="register-name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Enter your full name"
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={
                                        errors.name
                                            ? "register-name-error"
                                            : undefined
                                    }
                                    className={`${fieldClassName} ${
                                        errors.name
                                            ? "border-rose-400/60"
                                            : ""
                                    }`}
                                    {...register("name")}
                                />

                                {errors.name && (
                                    <p
                                        id="register-name-error"
                                        role="alert"
                                        className="mt-2 text-xs text-rose-300"
                                    >
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="register-email"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Email address
                                </label>

                                <input
                                    id="register-email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={
                                        errors.email
                                            ? "register-email-error"
                                            : undefined
                                    }
                                    className={`${fieldClassName} ${
                                        errors.email
                                            ? "border-rose-400/60"
                                            : ""
                                    }`}
                                    {...register("email")}
                                />

                                {errors.email && (
                                    <p
                                        id="register-email-error"
                                        role="alert"
                                        className="mt-2 text-xs text-rose-300"
                                    >
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="register-password"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        id="register-password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        autoComplete="new-password"
                                        placeholder="At least 8 characters"
                                        aria-invalid={Boolean(errors.password)}
                                        aria-describedby={
                                            errors.password
                                                ? "register-password-error"
                                                : undefined
                                        }
                                        className={`${fieldClassName} pr-20 ${
                                            errors.password
                                                ? "border-rose-400/60"
                                                : ""
                                        }`}
                                        {...register("password")}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (current) => !current
                                            )
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        aria-pressed={showPassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p
                                        id="register-password-error"
                                        role="alert"
                                        className="mt-2 text-xs text-rose-300"
                                    >
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="register-confirm-password"
                                    className="mb-2 block text-sm font-medium text-slate-200"
                                >
                                    Confirm password
                                </label>

                                <div className="relative">
                                    <input
                                        id="register-confirm-password"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        autoComplete="new-password"
                                        placeholder="Re-enter your password"
                                        aria-invalid={Boolean(
                                            errors.confirmPassword
                                        )}
                                        aria-describedby={
                                            errors.confirmPassword
                                                ? "register-confirm-password-error"
                                                : undefined
                                        }
                                        className={`${fieldClassName} pr-20 ${
                                            errors.confirmPassword
                                                ? "border-rose-400/60"
                                                : ""
                                        }`}
                                        {...register("confirmPassword")}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (current) => !current
                                            )
                                        }
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        aria-pressed={showConfirmPassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
                                    >
                                        {showConfirmPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>
                                </div>

                                {errors.confirmPassword && (
                                    <p
                                        id="register-confirm-password-error"
                                        role="alert"
                                        className="mt-2 text-xs text-rose-300"
                                    >
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Server Error */}
                            {serverError && (
                                <motion.p
                                    initial={
                                        reduceMotion
                                            ? false
                                            : { opacity: 0, y: -8 }
                                    }
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    role="alert"
                                    className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm leading-6 text-rose-200"
                                >
                                    {serverError}
                                </motion.p>
                            )}

                            {/* Submit Button */}
                            {accountCreated ? (
                                <Link
                                    to="/login"
                                    state={location.state}
                                    className="flex h-12 w-full items-center justify-center rounded-xl bg-linear-to-r from-[#b08afb] to-[#da8cf6] px-5 text-sm font-semibold text-[#171126] transition hover:brightness-110"
                                >
                                    Continue to login
                                </Link>
                            ) : (
                                <motion.button
                                    type="submit"
                                    disabled={isBusy}
                                    whileHover={
                                        reduceMotion || isBusy
                                            ? {}
                                            : {
                                                  y: -2,
                                                  scale: 1.01,
                                              }
                                    }
                                    whileTap={
                                        reduceMotion || isBusy
                                            ? {}
                                            : { scale: 0.985 }
                                    }
                                    className="relative flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-linear-to-r from-[#b08afb] to-[#da8cf6] px-5 text-sm font-semibold text-[#171126] shadow-[0_12px_36px_rgba(153,100,236,0.16)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {!reduceMotion && !isBusy && (
                                        <motion.span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-y-0 -left-20 w-20 skew-x-[-25deg] bg-white/30 blur-md"
                                            animate={{
                                                x: [0, 650],
                                            }}
                                            transition={{
                                                duration: 1.8,
                                                repeat: Infinity,
                                                repeatDelay: 4,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    )}

                                    {isBusy ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#171126]/30 border-t-[#171126]" />
                                            Creating account...
                                        </>
                                    ) : (
                                        <span className="relative z-10">
                                            Create account
                                        </span>
                                    )}
                                </motion.button>
                            )}
                        </form>

                        {/* Login Navigation */}
                        <p className="relative mt-7 text-center text-sm text-slate-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                state={location.state}
                                className="font-medium text-[#c4a9fa] transition hover:text-white"
                            >
                                Sign in
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
