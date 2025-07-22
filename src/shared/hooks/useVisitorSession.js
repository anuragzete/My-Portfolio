
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function useVisitorSession() {
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        let id = sessionStorage.getItem("visitor_session_id");
        if (!id) {
            id = uuidv4();
            sessionStorage.setItem("visitor_session_id", id);
        }
        setSessionId(id);
    }, []);

    return sessionId;
}
