
export async function logEvent({ type, message, context, sessionId }) {
    const token = sessionStorage.getItem("sb-access-token");
    if (!token) {
        console.warn("Skipping log, user not authenticated");
        return;
    }
    console.log(type+" "+message+" "+context+" "+sessionId+" "+new Date().toISOString());

    const response = await fetch("https://ilipqefuuyynujzrolzq.functions.supabase.co/portfolio-log-events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            type,
            message,
            context,
            sessionId,
            timestamp: new Date().toISOString(),
        }),
    });
    console.log(type+" "+message+" "+context+" "+sessionId+" "+new Date().toISOString());

    if (!response.ok) {
        const errorText = await response.text();  // Read actual error message
        console.error("Logging failed", response.status, errorText);
    }
}

export function getClientContext() {
    return {
        device: navigator.platform,
        browser: navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer,
        language: navigator.language,
    };
}
