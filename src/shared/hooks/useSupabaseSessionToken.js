import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient.js";
import {data} from "autoprefixer";

export default function useSupabaseSessionToken() {
    const [token, setToken] = useState(() => sessionStorage.getItem("sb-access-token"));

    useEffect(() => {
        // Get current session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.access_token) {
                sessionStorage.setItem("sb-access-token", session.access_token);
                setToken(session.access_token);
            }
        });

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token) {
                sessionStorage.setItem("sb-access-token", session.access_token);
                setToken(session.access_token);
            } else {
                sessionStorage.removeItem("sb-access-token");
                setToken(null);
            }
        });

        return () => authListener.subscription.unsubscribe();
    }, []);

    return token;
}
