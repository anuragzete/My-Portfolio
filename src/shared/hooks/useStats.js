import { useEffect, useState, useContext } from "react";
import { DataContext } from "../../context/DataProvider.jsx"; // adjust the path if needed


const GITHUB_USERNAME = "anuragzete";
const LEETCODE_USERNAME = "anuragzete";

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

export const useStats = () => {
    const { blogReads } = useContext(DataContext);

    const [stats, setStats] = useState({
        githubProjects: 0,
        githubContributions: 0,
        leetCodeSolved: 0,
        blogReads: blogReads || 0,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const cacheKey = "stats_cache";
        const cached = sessionStorage.getItem(cacheKey);

        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                setStats({ ...parsed, blogReads, loading: false });
                return;
            } catch {
                console.warn("Invalid stats cache, refetching...");
            }
        }

        const fetchGitHubData = async () => {
            const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
            const repos = await reposRes.json();

            const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
            const events = await eventsRes.json();

            const contributions = events.filter(e =>
                e.type === "PushEvent" || e.type === "PullRequestEvent"
            ).length;

            return {
                githubProjects: repos.length,
                githubContributions: contributions,
            };
        };

        const fetchLeetCodeData = async () => {
            const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`);
            const data = await res.json();

            return {
                leetCodeSolved: data.totalSolved || 0,
            };
        };

        const fetchAll = async () => {
            try {
                const [github, leetcode] = await Promise.all([
                    fetchWithRetry(fetchGitHubData),
                    fetchWithRetry(fetchLeetCodeData),
                ]);

                const combined = {
                    ...github,
                    ...leetcode,
                    blogReads,
                    loading: false,
                    error: null,
                };

                sessionStorage.setItem(cacheKey, JSON.stringify(combined));
                setStats(combined);
            } catch (err) {
                console.error("Stats fetch error:", err);
                setStats(prev => ({
                    ...prev,
                    loading: false,
                    error: err.message || "Failed to load stats",
                }));
            }
        };

        fetchAll();
    }, [blogReads]);

    return stats;
};
