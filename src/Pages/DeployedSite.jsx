
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function DeployedSite() {
    const { slug } = useParams();
    const [html, setHtml] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const loadWebsite = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/public/${encodeURIComponent(slug)}`,
                    { signal: controller.signal }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Website not found");
                }

                setHtml(data.code);

            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error.message);
                }
            }
        };

        loadWebsite();

        return () => controller.abort();
    }, [slug]);

    if (error) {
        return <div className="p-10 text-center">{error}</div>;
    }

    if (!html) {
        return <div className="p-10 text-center">Loading website...</div>;
    }

    return (
        <iframe
            title="Published website"
            srcDoc={html}
            sandbox="allow-scripts"
            referrerPolicy="no-referrer"
            className="h-screen w-full border-0"
        />
    );
}
