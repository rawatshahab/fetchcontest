import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import ContestDetails from '../components/ContestDetails';
import "./contests.css"
import { Check } from "lucide-react";
interface Contest {
    name: string;
    site: string;
    startTime: string;
    duration: number;
    url: string;
}
export default function Contests() {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [allContests, setAllContests] = useState<{ upcomingContests: Contest[]; previousContests: Contest[] }>({
        upcomingContests: [],
        previousContests: []
    });
    const [filteredContests, setFilteredContests] = useState<{ upcomingContests: Contest[]; previousContests: Contest[] }>({
        upcomingContests: [],
        previousContests: []
    });
    const [bookmarkedContests, setBookmarkedContests] = useState<Contest[]>([]);

    const togglePlatform = (platform: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
        );
    };
    const handleClick = (tab: string) => {
        setActiveTab(tab);
    };


    useEffect(() => {
        axios.get("http://localhost:3000/api/all-contests")
            .then(response => {
                console.log("Fetched all contests:", response.data);
                setAllContests(response.data);
                setFilteredContests(response.data);
            })
            .catch(error => console.error("Error fetching contests:", error));
    }, []);

    const fetchBookmarks = () => {
        axios.get("http://localhost:3000/api/bookmarks")
            .then(response => {
                setBookmarkedContests(response.data);
            })
            .catch(error => console.error("Error fetching bookmarked contests:", error));
    };

    useEffect(() => {
        fetchBookmarks();
    }, [activeTab]);

    useEffect(() => {
        if (selectedPlatforms.length === 0) {
            setFilteredContests({
                upcomingContests: allContests.upcomingContests,
                previousContests: allContests.previousContests
            });
            return;
        }

        const filteredUpcoming = allContests.upcomingContests.filter(contest =>
            selectedPlatforms.includes(contest.site.trim())
        );

        const filteredPrevious = allContests.previousContests.filter(contest =>
            selectedPlatforms.includes(contest.site.trim())
        );

        setFilteredContests({
            upcomingContests: filteredUpcoming,
            previousContests: filteredPrevious
        });
    }, [selectedPlatforms, allContests]);

    return (
        <main>
            <section className='filters'>
                <div className="platform">
                    <h1>Platforms</h1>
                    <div>
                        {selectedPlatforms.includes("Codeforces") && <Check size={16} />}
                        <span onClick={() => togglePlatform("Codeforces")} className={selectedPlatforms.includes("Codeforces") ? "active" : ""}>
                            Codeforces
                        </span>
                    </div>
                    <div>
                        {selectedPlatforms.includes("LeetCode") && <Check size={16} />}

                        <span onClick={() => togglePlatform("LeetCode")} className={selectedPlatforms.includes("leetCode") ? "active" : ""}>
                            LeetCode
                        </span>
                    </div>
                    <div>
                        {selectedPlatforms.includes("CodeChefs") && <Check size={16} />}
                        <span onClick={() => togglePlatform("CodeChefs")} className={selectedPlatforms.includes("CodeChefs") ? "active" : ""}>
                            CodeChefs
                        </span>
                    </div>

                </div>
                <div className="state">
                    <h1>State</h1>
                    <div>
                        {activeTab === "all" && <Check size={16} />}

                        <span onClick={() => handleClick("all")} className={activeTab === "bookmarked" ? "active" : ""}>
                            All
                        </span>
                    </div>
                    <div>
                        {activeTab === "upcoming" && <Check size={16} />}
                        <span onClick={() => handleClick("upcoming")} className={activeTab === "upcoming" ? "active" : ""}>
                            Upcoming
                        </span>
                    </div>
                    <div>
                        {activeTab === "previous" && <Check size={16} />}
                        <span onClick={() => handleClick("previous")} className={activeTab === "previous" ? "active" : ""}>
                            Previous
                        </span>
                    </div>
                    <div>
                        {activeTab === "bookmarked" && <Check size={16} />}
                        <span onClick={() => handleClick("bookmarked")} className={activeTab === "bookmarked" ? "active" : ""}>
                            Bookmarked
                        </span>
                    </div>
                </div>
            </section>
            <section className="content"></section>
        </main>
    );
}