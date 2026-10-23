import { useState } from "react";
import { Link , useNavigate} from "react-router";
import { useSelector } from "react-redux";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import webloomLogo from "../assets/Webloom.png";

const PLANS = [
    {
        id: "free",
        name: "Free",
        eyebrow: "THE FIRST SPARK",
        description: "For the idea you can't stop thinking about.",
        monthlyPrice: 0,
        yearlyPrice: 0,
        credits: "100 starter credits",
        generations: "2 AI generations",
        features: [
            "100 starter credits",
            "Up to 2 AI generations",
            "Live website preview and code view",
            "Save and manage projects",
            "Publish and share your websites",
        ],
        button: "Start creating for free",
        popular: false,
        accent: "violet",
    },
    {
        id: "pro",
        name: "Pro",
        eyebrow: "FOR THE MAKERS",
        description: "For ideas that deserve another iteration. And another.",
        monthlyPrice: 499,
        yearlyPrice: 399,
        credits: "1,000 credits / month",
        generations: "20 AI generations / month",
        features: [
            "1,000 credits each month (planned)",
            "Up to 20 AI generations / month",
            "Everything in Free",
            "Early access to new tools (planned)",
            "More room to experiment",
        ],
        button: "Get Pro",
        popular: true,
        accent: "violet",
    },
    {
        id: "premium",
        name: "Premium",
        eyebrow: "THE BIG LEAGUE",
        description: "For bold visions and a constant flow of new ideas.",
        monthlyPrice: 999,
        yearlyPrice: 799,
        credits: "3,000 credits / month",
        generations: "60 AI generations / month",
        features: [
            "3,000 credits each month (planned)",
            "Up to 60 AI generations / month",
            "Everything in Pro",
            "Priority support (planned)",
            "Advanced publishing tools (planned)",
        ],
        button: "Get Premium",
        popular: false,
        accent: "amber",
    },
];

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:4000"
).replace(/\/$/, "");

const QUESTIONS = [
    {
        question: "How do Webloom credits work?",
        answer: "Every successful AI website generation uses 50 credits. Your Free account starts with 100 credits, enough for two generations. Manually renaming or viewing an existing project does not consume generation credits.",
    },
    {
        question: "Can I publish websites on the Free plan?",
        answer: "Yes. You can publish your generated website and share its live link using Webloom's existing deployment feature.",
    },
    {
    question: "Are Pro and Premium available to purchase?",
    answer: "Yes. You can purchase Pro or Premium securely through Razorpay Checkout.",
    },
    {
        question: "What's the difference between monthly and yearly?",
        answer: "Monthly plans cover one month, while yearly plans cover 12 months at a discounted price. Payments are currently one-time purchases without automatic renewal. Yearly credits are provided upfront.",
    },
];

function ArrowIcon({ className = "h-4 w-4" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-violet-300" aria-hidden="true">
            <path d="m5 12 4 4L19 6" />
        </svg>
    );
}

function SparkIcon({ className = "h-4 w-4" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
            <path d="m12 2 2.1 7.9L22 12l-7.9 2.1L12 22l-2.1-7.9L2 12l7.9-2.1L12 2Z" />
        </svg>
    );
}

function RupeeUniverse({ reduceMotion }) {
    const floatingRupees = [
        { className: "left-[3%] top-[20%] h-12 w-12 text-xl sm:left-[8%]", delay: 0.3 },
        { className: "right-[4%] top-[12%] h-16 w-16 text-3xl sm:right-[12%]", delay: 1.1 },
        { className: "bottom-[16%] left-[11%] h-10 w-10 text-lg", delay: 1.8 },
        { className: "bottom-[12%] right-[7%] h-12 w-12 text-2xl", delay: 0.8 },
    ];

    return (
        <div className="relative mx-auto grid h-87.5 w-full max-w-127 place-items-center sm:h-110" aria-hidden="true">
            <div className="absolute inset-[14%] rounded-full bg-violet-500/15 blur-[85px]" />
            <motion.div
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                className="absolute h-[82%] w-[82%] rounded-full border border-dashed border-violet-300/20"
            />
            <motion.div
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                className="absolute h-[66%] w-[66%] rounded-full border border-violet-300/20"
            >
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-violet-300 shadow-[0_0_22px_rgba(196,181,253,0.9)]" />
                <span className="absolute bottom-[13%] right-[6%] h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_18px_rgba(240,171,252,0.9)]" />
            </motion.div>

            <motion.div
                animate={reduceMotion ? undefined : { y: [0, -16, 0], rotate: [-5, 4, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 grid h-48 w-48 place-items-center rounded-full border border-white/30 bg-[radial-gradient(circle_at_30%_25%,#f3e8ff_0%,#c4b5fd_30%,#7656bf_69%,#35204e_100%)] shadow-[0_0_0_10px_rgba(196,181,253,0.06),0_28px_90px_rgba(139,92,246,0.35),inset_-12px_-16px_25px_rgba(30,10,55,0.5)] sm:h-60 sm:w-60"
            >
                <div className="absolute inset-4 rounded-full border border-white/25" />
                <div className="absolute inset-7 rounded-full border border-white/10" />
                <motion.span
                    animate={reduceMotion ? undefined : { textShadow: ["0 0 10px rgba(255,255,255,.15)", "0 0 34px rgba(255,255,255,.65)", "0 0 10px rgba(255,255,255,.15)"] }}
                    transition={{ duration: 3.4, repeat: Infinity }}
                    className="relative -mt-2 font-serif text-[116px] leading-none font-bold text-white drop-shadow-[0_6px_7px_rgba(41,19,70,0.4)] sm:text-[148px]"
                >
                    ₹
                </motion.span>
                <div className="absolute left-[24%] top-[13%] h-9 w-16 rotate-[-25deg] rounded-full bg-white/40 blur-xl" />
            </motion.div>

            {floatingRupees.map((coin, index) => (
                <motion.span
                    key={index}
                    animate={reduceMotion ? undefined : { y: [0, -14, 0], rotate: [-10, 10, -10] }}
                    transition={{ duration: 4.5 + index * 0.6, delay: coin.delay, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute z-10 grid place-items-center rounded-full border border-violet-200/25 bg-[#281d43]/90 font-serif font-semibold text-violet-200 shadow-[0_12px_28px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md ${coin.className}`}
                >
                    ₹
                </motion.span>
            ))}

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, y: reduceMotion ? 0 : [0, -8, 0] }}
                transition={{ opacity: { duration: 0.8, delay: 0.5 }, x: { duration: 0.8, delay: 0.5 }, y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" } }}
                className="absolute bottom-[2%] left-[2%] z-20 rounded-2xl border border-white/10 bg-[#171326]/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:bottom-[5%]"
            >
                <p className="text-[10px] font-bold tracking-[0.16em] text-slate-400">START BUILDING AT</p>
                <p className="mt-1 font-serif text-2xl font-semibold text-white">₹0 <span className="font-sans text-xs font-normal text-slate-400">today</span></p>
            </motion.div>

            <motion.div
                animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute right-0 top-[3%] z-20 rounded-xl border border-amber-200/15 bg-[#201a2a]/90 px-3 py-2 text-[11px] font-medium text-amber-100 backdrop-blur-xl sm:right-[2%]"
            >
                <span className="mr-1 text-amber-300">✦</span> Made for makers
            </motion.div>
        </div>
    );
}

function Price({ amount, isFree, reduceMotion }) {
    return (
        <div className="mt-7 flex min-h-18 items-baseline gap-1 text-white">
            <motion.span
                animate={reduceMotion ? undefined : { y: [0, -5, 0], rotate: [-7, 0, -7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative mr-1 inline-block font-serif text-3xl font-semibold text-violet-200"
            >
                ₹
            </motion.span>
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={amount}
                    initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -14, filter: "blur(6px)" }}
                    transition={{ duration: 0.26 }}
                    className="text-5xl font-semibold tracking-[-0.07em] sm:text-[56px]"
                >
                    {amount.toLocaleString("en-IN")}
                </motion.span>
            </AnimatePresence>
            <span className="ml-1 text-sm text-slate-400">{isFree ? "/ to start" : "/ month"}</span>
        </div>
    );
}

function PlanCard({ plan, billing, index, onSelect, reduceMotion }) {
    const isYearly = billing === "yearly";
    const isFree = plan.id === "free";
    const isPremium = plan.id === "premium";
    const amount = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

    return (
        <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 44, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { y: -10, transition: { duration: 0.25 } }}
            className={`group relative flex h-full flex-col rounded-[28px] border p-6 transition-colors sm:p-7 ${
                plan.popular
                    ? "border-violet-300/50 bg-[linear-gradient(155deg,rgba(98,69,160,.30),rgba(24,20,42,.98)_42%)] shadow-[0_18px_85px_rgba(113,76,204,.17)]"
                    : isPremium
                      ? "border-amber-200/20 bg-[linear-gradient(155deg,rgba(94,65,59,.23),rgba(19,17,31,.98)_48%)] hover:border-amber-200/40"
                      : "border-white/10 bg-[#141323]/85 hover:border-violet-300/30"
            }`}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
                <div className={`absolute -right-22 -top-22 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${isPremium ? "bg-amber-400/10 opacity-50" : "bg-violet-500/15 opacity-40"}`} />
            </div>

            {plan.popular && (
                <motion.div
                    animate={reduceMotion ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 100%" }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-linear-to-r from-violet-300 via-fuchsia-200 to-violet-300 px-4 py-1.5 text-[10px] font-black tracking-[0.14em] text-[#231332] shadow-[0_9px_25px_rgba(167,139,250,.24)]"
                >
                    ✦ MOST POPULAR
                </motion.div>
            )}

            <div className="relative flex items-center justify-between gap-3">
                <span className={`text-[10px] font-bold tracking-[0.19em] ${isPremium ? "text-amber-200" : "text-violet-300"}`}>
                    {plan.eyebrow}
                </span>
                <div className={`grid h-10 w-10 place-items-center rounded-xl border ${isPremium ? "border-amber-300/20 bg-amber-300/10 text-amber-200" : "border-violet-300/20 bg-violet-300/10 text-violet-200"}`}>
                    {isFree ? <SparkIcon /> : <span className="font-serif text-xl font-bold">₹</span>}
                </div>
            </div>

            <h3 className="relative mt-5 text-3xl font-semibold tracking-tighter text-white">{plan.name}</h3>
            <p className="relative mt-2 min-h-12 text-sm leading-6 text-slate-400">{plan.description}</p>

            <Price amount={amount} isFree={isFree} reduceMotion={reduceMotion} />

            <div className="min-h-12">
                {isFree ? (
                    <p className="mt-2 text-xs text-slate-400">No payment required · starter credits</p>
                ) : isYearly ? (
                    <p className="mt-2 text-xs text-violet-200/85">
                       ₹{(amount * 12).toLocaleString("en-IN")} paid once for 12 months
                    </p>
                ) : (
                    <p className="mt-2 text-xs text-slate-400">One-time payment for 1 month</p>                )}
            </div>

            {/* <button
                type="button"
                onClick={testPayment}
                className="rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white"
            >
                Test Pro Payment
            </button> */}

            {isFree ? (
                <Link
                    to="/studio"
                    className="relative mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/15"
                >
                    {plan.button} <ArrowIcon />
                </Link>
            ) : (
                <button
                    type="button"
                    onClick={() => onSelect(plan)}
                    className={`relative mt-4 inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition hover:-translate-y-0.5 ${
                        plan.popular
                            ? "bg-violet-300 text-[#201330] shadow-[0_8px_26px_rgba(167,139,250,0.2)] hover:bg-violet-200"
                            : "bg-[#ecdbc0] text-[#322116] hover:bg-[#fff0d5]"
                    }`}
                >
                    {plan.button} <ArrowIcon />
                </button>
            )}

            <div className="relative my-7 h-px bg-white/10" />

            <p className="relative mb-5 text-[11px] font-bold tracking-[0.12em] text-slate-300">WHAT'S INCLUDED</p>
            <ul className="relative flex flex-1 flex-col gap-4">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-5.5 text-slate-300">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet-300/10"><CheckIcon /></span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="relative mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5 text-xs text-slate-500">
                <span>{plan.credits}</span>
                <span>{isFree ? "2 builds" : plan.generations.split(" ")[0] + " builds"}</span>
            </div>
        </motion.article>
    );
}

// const testPayment = async () => {
//     try {
//         // 1. Create Razorpay order
//         const response = await fetch(
//             "http://localhost:4000/api/payment/create-order",
//             {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     planId: "pro",
//                     billingCycle: "monthly",
//                 }),
//             }
//         );

//         const order = await response.json();

//         if (!response.ok) {
//             throw new Error(order.message || "Order creation failed");
//         }

//         if (!window.Razorpay) {
//             throw new Error("Razorpay Checkout is not loaded");
//         }

//         // 2. Open Razorpay Checkout
//         const options = {
//             key: order.keyId,
//             amount: order.amount,
//             currency: order.currency,
//             order_id: order.orderId,
//             name: "Webloom",
//             description: "Pro Plan - Test Payment",

//             handler: async (paymentResponse) => {
//                 try {
//                     // 3. Verify payment through backend
//                     const verifyResponse = await fetch(
//                         "http://localhost:4000/api/payment/verify",
//                         {
//                             method: "POST",
//                             credentials: "include",
//                             headers: {
//                                 "Content-Type": "application/json",
//                             },
//                             body: JSON.stringify(paymentResponse),
//                         }
//                     );

//                     const result = await verifyResponse.json();

//                     console.log("Verification result:", result);

//                     if (!verifyResponse.ok) {
//                         throw new Error(result.message || "Verification failed");
//                     }

//                     alert("Payment verified! Credits added successfully.");

//                 } catch (error) {
//                     console.error("Verification Error:", error);
//                     alert(error.message);
//                 }
//             },

//             theme: {
//                 color: "#8B5CF6",
//             },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open();

//     } catch (error) {
//         console.error("Payment Error:", error);
//         alert(error.message);
//     }
// };


export default function Pricing() {
    const [billing, setBilling] = useState("monthly");
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState("");

    const reduceMotion = useReducedMotion();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth?.user);

    //Payment Logic
    const handlePayment = async () => {
        if (!selectedPlan || paymentLoading) return;

        if (!user) {
            navigate("/login");
            return;
        }

        if (!window.Razorpay) {
            setPaymentError("Razorpay Checkout is not loaded.");
            return;
        }

        setPaymentLoading(true);
        setPaymentError("");
        setPaymentSuccess("");

        try {
            const response = await fetch(
                `${API_URL}/api/payment/create-order`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        planId: selectedPlan.id,
                        billingCycle: billing,
                    }),
                }
            );

            const order = await response.json();

            if (!response.ok || !order.success) {
                throw new Error(order.message || "Unable to create order.");
            }

            const options = {
                key: order.keyId,
                amount: order.amount,
                currency: order.currency,
                order_id: order.orderId,

                name: "Webloom",
                description: `${selectedPlan.name} - ${billing} plan`,

                prefill: {
                    name: user.name || "",
                    email: user.email || "",
                },

                theme: {
                    color: "#8B5CF6",
                },

                handler: async (paymentResponse) => {
                    try {
                        const verifyResponse = await fetch(
                            `${API_URL}/api/payment/verify`,
                            {
                                method: "POST",
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(paymentResponse),
                            }
                        );

                        const result = await verifyResponse.json();

                        if (!verifyResponse.ok || !result.success) {
                            throw new Error(
                                result.message || "Payment verification failed."
                            );
                        }

                        setPaymentSuccess(
                            `${selectedPlan.name} activated successfully!`
                        );

                        window.dispatchEvent(
                            new CustomEvent("webloom:credits-updated", {
                                detail: { credits: result.credits },
                            })
                        );

                        setSelectedPlan(null);

                    } catch (error) {
                        console.error("Payment Verification Error:", error);
                        setPaymentError(
                            `${error.message} If you were charged, do not pay again. Contact support.`
                        );
                    } finally {
                        setPaymentLoading(false);
                    }
                },

                modal: {
                    ondismiss: () => {
                        setPaymentLoading(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error("Payment Error:", error);
            setPaymentError(error.message || "Payment could not be started.");
            setPaymentLoading(false);
        }
    };


    return (
        <div className="relative min-h-screen overflow-hidden bg-[#090914] font-sans text-white selection:bg-violet-400/30">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-187.5 w-275 -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(102,57,176,0.2),transparent_66%)]" />
                <motion.div
                    animate={reduceMotion ? undefined : { x: [0, 90, 0], y: [0, 65, 0] }}
                    transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-44 top-120 h-105 w-105 rounded-full bg-violet-700/10 blur-[120px]"
                />
                <motion.div
                    animate={reduceMotion ? undefined : { x: [0, -75, 0], y: [0, -55, 0] }}
                    transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-36 top-225 h-115 w-115 rounded-full bg-fuchsia-600/10 blur-[120px]"
                />
            </div>

            <header className="relative z-30 border-b border-white/8 bg-[#090914]/75 backdrop-blur-xl">
                <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
                    <Link to="/" aria-label="Webloom home" className="rounded-xl bg-white px-3 py-2">
                        <img src={webloomLogo} alt="Webloom" className="h-7 w-auto object-contain" />
                    </Link>
                    <div className="hidden items-center gap-8 text-sm text-slate-400 sm:flex">
                        <Link to="/" aria-current="page" className="font-semibold text-violet-200">Home</Link>
                        <Link to="/explore"aria-current="page" className="font-semibold text-violet-200">Explore</Link>
                        <Link to="/projects" aria-current="page" className="font-semibold text-violet-200">Projects</Link>
                        <Link to="/pricing" aria-current="page" className="font-semibold text-violet-200">Pricing</Link>
                    </div>
                    <Link to={user ? "/studio" : "/login"} className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/10 px-4 py-2.5 text-xs font-bold text-violet-100 transition hover:bg-violet-300/20 sm:text-sm">
                        {user ? "Open Studio" : "Get started"} <ArrowIcon />
                    </Link>
                </nav>
            </header>

            
            <main className="relative z-10">

            {/* Payment Success Notification */}
            <AnimatePresence>
                {paymentSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        role="status"
                        className="mx-auto mt-6 max-w-xl rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-6 py-4 text-center text-sm font-semibold text-emerald-200"
                    >
                        {paymentSuccess}

                        <Link
                            to="/studio"
                            className="ml-3 underline underline-offset-4"
                        >
                            Open Studio
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

        <section className="mx-auto grid max-w-7xl items-center gap-6 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:pb-28 lg:pt-22">

                    <div className="relative z-10">
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                            className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/8 px-4 py-2 text-[10px] font-bold tracking-[0.19em] text-violet-200"
                        >
                            <SparkIcon className="h-3.5 w-3.5" /> THE PRICE OF POSSIBILITY
                        </motion.div>
                        <motion.h1
                            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.12 }}
                            className="mt-7 max-w-177.5 text-[clamp(3.4rem,6.7vw,6.5rem)] leading-[0.99] font-semibold tracking-[-0.075em]"
                        >
                            Big ideas.
                            <span className="block bg-linear-to-r from-[#e9d5ff] via-[#b7a7ff] to-[#efc5ff] bg-clip-text text-transparent">Little ₹ signs.</span>
                        </motion.h1>
                        <motion.p
                            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.26 }}
                            className="mt-7 max-w-lg text-base leading-8 text-slate-400 sm:text-lg"
                        >
                            From a spark of inspiration to a website you can share. Start free, dream bigger, and find a plan for every stage of your creative journey.
                        </motion.p>
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.38 }}
                            className="mt-9 flex flex-wrap items-center gap-3"
                        >
                            <a href="#plans" className="inline-flex items-center gap-3 rounded-xl bg-violet-300 px-6 py-3.5 text-sm font-bold text-[#211432] transition hover:-translate-y-0.5 hover:bg-violet-200">
                                Explore the plans <ArrowIcon />
                            </a>
                            <span className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-xs text-slate-300">50 credits = 1 generation</span>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <RupeeUniverse reduceMotion={reduceMotion} />
                    </motion.div>
                </section>

                <section id="plans" className="relative mx-auto max-w-7xl scroll-mt-14 px-5 pb-24 sm:px-8 lg:px-10">
                    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="mx-auto max-w-2xl text-center">
                        <div className="mx-auto mb-4 h-px w-12 bg-violet-300/65" />
                        <p className="text-[11px] font-bold tracking-[0.24em] text-violet-300">THREE WAYS TO CREATE</p>
                        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">A plan for every <span className="font-serif italic font-normal text-violet-300">possibility.</span></h2>
                        <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">No unnecessary complexity. Just space to bring your next idea to life.</p>
                    </motion.div>

                    <div className="mt-9 flex flex-col items-center gap-3">
                        <div className="relative flex items-center rounded-full border border-white/10 bg-[#181426] p-1.5" role="group" aria-label="Billing frequency">
                            {[
                                { id: "monthly", label: "Monthly" },
                                { id: "yearly", label: "Yearly" },
                            ].map((option) => (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => setBilling(option.id)}
                                    aria-pressed={billing === option.id}
                                    className={`relative z-0 flex min-w-28 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${billing === option.id ? "text-[#201430]" : "text-slate-400 hover:text-white"}`}
                                >
                                    {billing === option.id && (
                                        <motion.span layoutId="webloom-billing-pill" transition={{ type: "spring", stiffness: 330, damping: 29 }} className="absolute inset-0 -z-10 rounded-full bg-violet-200" />
                                    )}
                                    {option.label}
                                    {option.id === "yearly" && <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${billing === "yearly" ? "bg-violet-900/15 text-[#45266d]" : "bg-emerald-300/10 text-emerald-300"}`}>-20%</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
                        {PLANS.map((plan, index) => (
                            <PlanCard key={plan.id} plan={plan} billing={billing} index={index} onSelect={setSelectedPlan} reduceMotion={reduceMotion} />
                        ))}
                    </div>

                </section>

                <section className="relative border-y border-white/[0.07] bg-white/[0.018] px-5 py-16 sm:px-8 lg:py-20">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-9 md:flex-row">
                        <div className="max-w-xl text-center md:text-left">
                            <p className="text-[11px] font-bold tracking-[0.2em] text-violet-300">BUILT FOR CURIOUS MINDS</p>
                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">One little prompt. <span className="font-serif italic font-normal text-violet-300">A whole new world.</span></h2>
                            <p className="mt-4 text-sm leading-7 text-slate-400">Every generation turns your idea into editable HTML, CSS and JavaScript. Preview, refine, save, and share what you've made.</p>
                        </div>
                        <motion.div whileHover={reduceMotion ? undefined : { rotate: -7, scale: 1.08 }} className="relative grid h-36 w-36 shrink-0 place-items-center rounded-[30px] border border-violet-300/25 bg-linear-to-br from-violet-300/20 via-fuchsia-300/10 to-transparent shadow-[0_25px_80px_rgba(139,92,246,0.14)]">
                            <motion.span animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="font-serif text-7xl font-bold text-violet-200">₹</motion.span>
                            <span className="absolute -right-5 -top-4 rounded-full border border-violet-300/20 bg-[#171324] px-3 py-1.5 text-[10px] font-semibold text-violet-200">YOUR NEXT IDEA</span>
                        </motion.div>
                    </div>
                </section>

                <section className="mx-auto max-w-4xl px-5 py-22 sm:px-8 lg:py-28">
                    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
                        <p className="text-[11px] font-bold tracking-[0.2em] text-violet-300">GOOD TO KNOW</p>
                        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Questions? <span className="font-serif italic font-normal text-violet-300">Answered.</span></h2>
                    </motion.div>
                    <div className="space-y-3">
                        {QUESTIONS.map((item, index) => (
                            <motion.details
                                key={item.question}
                                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.06 }}
                                className="group rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-1 open:border-violet-300/25 open:bg-violet-300/5.5 sm:px-6"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-slate-100 marker:hidden [&::-webkit-details-marker]:hidden sm:text-base">
                                    {item.question}
                                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-xl font-light text-violet-200 transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <p className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-slate-400">{item.answer}</p>
                            </motion.details>
                        ))}
                    </div>
                </section>

                <section className="px-5 pb-22 sm:px-8">
                    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl border border-violet-300/20 bg-[linear-gradient(120deg,#241940,#121021_70%)] px-6 py-16 text-center shadow-[0_20px_100px_rgba(78,47,133,0.2)] sm:px-12">
                        <div className="pointer-events-none absolute -right-16 -top-25 font-serif text-[240px] leading-none text-violet-200/4.5" aria-hidden="true">₹</div>
                        <SparkIcon className="relative mx-auto h-8 w-8 text-violet-200" />
                        <h2 className="relative mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.055em] sm:text-5xl">The best time to build it? <span className="font-serif italic font-normal text-violet-200">Right now.</span></h2>
                        <p className="relative mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-300">Your next big thing can start with a single prompt. And a ₹0 price tag.</p>
                        <Link to="/studio" className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-200 px-6 py-3.5 text-sm font-bold text-[#211432] transition hover:-translate-y-0.5 hover:bg-white">
                            Launch Webloom Studio <ArrowIcon />
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="relative z-10 border-t border-white/8 px-5 py-7 sm:px-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
                    <span>© {new Date().getFullYear()} Webloom. Make something extraordinary.</span>
                    <div className="flex items-center gap-5">
                        <Link to="/" className="transition hover:text-white">Home</Link>
                        <Link to="/explore" className="transition hover:text-white">Explore</Link>
                        <Link to="/projects" className="transition hover:text-white">Projects</Link>
                    </div>
                </div>
            </footer>

            
            <AnimatePresence>
                {selectedPlan && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-5 backdrop-blur-md"
                        onMouseDown={(event) => {
                            if (
                                event.target === event.currentTarget &&
                                !paymentLoading
                            ) {
                                setSelectedPlan(null);
                                setPaymentError("");
                            }
                        }}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="payment-title"
                            initial={
                                reduceMotion
                                    ? false
                                    : { opacity: 0, y: 22, scale: 0.94 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={
                                reduceMotion
                                    ? undefined
                                    : { opacity: 0, y: 12, scale: 0.96 }
                            }
                            className="w-full max-w-md rounded-[26px] border border-violet-300/25 bg-[#1c172d] p-7 text-center shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
                        >
                            <motion.div
                                animate={
                                    reduceMotion
                                        ? undefined
                                        : { rotate: [0, 12, -12, 0] }
                                }
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                }}
                                className="mx-auto grid h-18 w-18 place-items-center rounded-2xl border border-violet-300/25 bg-violet-300/10 font-serif text-5xl font-semibold text-violet-200"
                            >
                                ₹
                            </motion.div>

                            <h2
                                id="payment-title"
                                className="mt-6 text-2xl font-semibold tracking-tight"
                            >
                                Upgrade to {selectedPlan.name}
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                Unlock more possibilities with Webloom.
                                Confirm your plan to continue to secure checkout.
                            </p>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                                <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">
                                    {billing} plan
                                </p>

                                <p className="mt-3 text-4xl font-bold text-white">
                                    ₹
                                    {(
                                        billing === "yearly"
                                            ? selectedPlan.yearlyPrice * 12
                                            : selectedPlan.monthlyPrice
                                    ).toLocaleString("en-IN")}
                                </p>

                                <p className="mt-2 text-xs text-slate-400">
                                    {billing === "yearly"
                                        ? "One-time payment for 12 months"
                                        : "One-time payment for 1 month"}
                                </p>
                            </div>

                            {paymentError && (
                                <p
                                    role="alert"
                                    className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-300"
                                >
                                    {paymentError}
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={handlePayment}
                                disabled={paymentLoading}
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-300 px-5 py-3 text-sm font-bold text-[#231532] transition hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {paymentLoading
                                    ? "Processing..."
                                    : "Proceed to Payment"}

                                {!paymentLoading && <ArrowIcon />}
                            </button>

                            <button
                                type="button"
                                disabled={paymentLoading}
                                onClick={() => {
                                    setSelectedPlan(null);
                                    setPaymentError("");
                                }}
                                className="mt-3 w-full rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
                            >
                                Back to plans
                            </button>

                            <p className="mt-5 text-xs text-slate-500">
                                Secure checkout powered by Razorpay
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
