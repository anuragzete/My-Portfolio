import React, {useEffect} from "react";
import Hero from "./Hero.jsx";
import Blogs from "../blog/BlogsList.jsx";
import HomeAbout from "./HomeAbout.jsx";

export default function Home() {
    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [location.pathname]);

    return (
        <div id='home'>
            <Hero/>
            <HomeAbout/>
            <Blogs/>
        </div>
    )
}