import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, doc, getDoc, getDocs, query, orderBy } from "firebase/firestore";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [blogReads, setBlogReads] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blogsError, setBlogsError] = useState(null);
    const [blogsLoading, setBlogsLoading] = useState(true);

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return "Invalid date";
        return new Date(timestamp.seconds * 1000).toLocaleDateString();
    };

    const fetchWithRetry = async (fn, retries = 3, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
            try {
                return await fn();
            } catch (err) {
                if (i === retries - 1) throw err;
                await new Promise(res => setTimeout(res, delay * (i + 1)));
            }
        }
    };

    const cacheAndSet = (key, setter, data) => {
        sessionStorage.setItem(key, JSON.stringify(data));
        setter(data);
    };

    const loadCachedData = (key, setter) => {
        const cached = sessionStorage.getItem(key);
        if (cached) {
            try {
                setter(JSON.parse(cached));
            } catch {
                console.warn(`Invalid cache for ${key}`);
            }
        }
    };

    const fetchProjects = async () => {
        const q = query(collection(db, "projects"), orderBy("index", "asc"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => {
            const data = doc.data();
            const start = formatDate(data.project_duration?.start);
            const end = formatDate(data.project_duration?.end);
            return {
                id: doc.id,
                ...data,
                durationText: data.status === "completed" ? `${start} - ${end}` : `${start} - Present`,
            };
        });
        cacheAndSet("projects_cache", setProjects, list);
    };

    const fetchExperiences = async () => {
        const q = query(collection(db, "workExperience"), orderBy("index", "asc"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                job_title: data.job_title || "",
                company_name: data.company_name || "",
                company_url: data.company_url || "",
                description: Array.isArray(data.description)
                    ? data.description
                    : data.description ? [data.description] : [],
                technologies: Array.isArray(data.technologies) ? data.technologies : [],
                duration: {
                    start: formatDate(data.duration?.start),
                    end: formatDate(data.duration?.end),
                },
                location: data.location || "",
                company_logo_url: data.company_logo_url || "",
                github_url: data.github_url || "",
            };
        });
        cacheAndSet("experiences_cache", setExperiences, list);
    };

    const fetchBlogs = async () => {
        setBlogsLoading(true);
        setBlogsError(null);

        loadCachedData("blogs_cache", setBlogs);

        try {
            const q = query(collection(db, "blogs"), orderBy("index", "asc"));
            const snapshot = await fetchWithRetry(() => getDocs(q));

            const blogList = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    date: data.date?.seconds ? formatDate(data.date) : "Unknown",
                };
            });

            cacheAndSet("blogs_cache", setBlogs, blogList);
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
            setBlogsError("Unable to load blogs.");
        } finally {
            setBlogsLoading(false);
        }
    };

    const fetchBlogReads = async () => {
        const cached = sessionStorage.getItem("blogReads_cache");
        if (cached) {
            try {
                setBlogReads(JSON.parse(cached));
            } catch {
                console.warn("Invalid blogReads cache");
            }
        }

        try {
            const docRef = doc(db, "blogStats", "stats");
            const docSnap = await fetchWithRetry(() => getDoc(docRef));

            if (docSnap.exists()) {
                const data = docSnap.data();
                const reads = data.total_reads || 0;
                setBlogReads(reads);
                sessionStorage.setItem("blogReads_cache", JSON.stringify(reads));
            } else {
                console.warn("blogStats/stats not found");
            }
        } catch (err) {
            console.error("Failed to fetch blogReads:", err);
        }
    };

    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);
            setError(null);

            loadCachedData("projects_cache", setProjects);
            loadCachedData("experiences_cache", setExperiences);
            loadCachedData("blogs_cache", setBlogs);
            loadCachedData("blogReads_cache", setBlogReads);

            try {
                await fetchWithRetry(fetchProjects);
                await fetchWithRetry(fetchExperiences);
                await fetchWithRetry(fetchBlogs);
                await fetchWithRetry(fetchBlogReads);
                await fetchBlogs();
            } catch (err) {
                console.error("Data fetch failed:", err);
                setError("Failed to load portfolio data.");
            } finally {
                setLoading(false);
            }
        };

        loadAll();
    }, []);


    return (
        <DataContext.Provider
            value={{
                projects,
                experiences,
                blogs,
                blogReads,
                loading,
                error,
                blogsLoading,
                blogsError,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
