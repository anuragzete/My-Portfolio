import React, {useEffect} from "react";
import Hero from "./Hero.jsx";
import BlogsList from "../blog/BlogsList.jsx";
import HomeAbout from "./HomeAbout.jsx";
import StatsSection from "./StatsSection.jsx";

export default function Home() {
    /*useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [location.pathname]);*/

    return (
        <div id='home'>
            <Hero />
            <HomeAbout />
            <StatsSection />
            <BlogsList />
        </div>
    )
}