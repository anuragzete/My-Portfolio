import React from "react";
import Hero from "./Hero.jsx";
import BlogsList from "../blog/BlogsList.jsx";
import HomeAbout from "./HomeAbout.jsx";
import StatsSection from "./StatsSection.jsx";

export default function Home() {
    return (
        <div id='home'>
            <Hero />
            <HomeAbout />
            <StatsSection />
            <BlogsList />
        </div>
    )
}