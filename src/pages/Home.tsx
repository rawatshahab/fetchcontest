import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import ContestDetails from '../components/ContestDetails';
import "./home.css"
import { Check } from "lucide-react";
interface Contest {
    name: string;
    site: string;
    startTime: string;
    duration: number;
    url: string;
}
export default function Home() {
    const [activeTab, setActiveTab] = useState("upcoming");
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
        <main className='main'>
           
            <section className='filter'>
                <div className='a'>
                <div className='platforms-1'>
                    <h1>Platforms</h1>
                    <div id="yello" onClick={() => togglePlatform("LeetCode")}>
                        {selectedPlatforms.includes("LeetCode") && <Check size={16} />}
                        <span>LeetCode</span>
                    </div>
                    <div id="voilet" onClick={() => togglePlatform("CodeChef")}>
                        {selectedPlatforms.includes("CodeChef") && <Check size={16}/>}
                        <span>CodeChef</span>
                    </div>
                    <div id="red" onClick={() => togglePlatform("Codeforces")}>
                        {selectedPlatforms.includes("Codeforces") && <Check size={16} />}
                        <span>Codeforces</span>
                    </div>
                </div>
                
              
                
                <div className='content'>
                    <span
                        id="upcoming"
                        onClick={() => handleClick("upcoming")}
                        className={activeTab === "upcoming" ? "active-tab" : ""}
                    >
                        Upcoming
                    </span>
                    <span
                        id="past"
                        onClick={() => handleClick("past")}
                        className={activeTab === "past" ? "active-tab" : ""}
                    >
                        Past
                    </span>
                    <span
                        id="bookmark"
                        onClick={() => handleClick("bookmark")}
                        className={activeTab === "bookmark" ? "active-tab" : ""}
                    >
                        Bookmarked
                    </span>
                </div>
                </div>
               
                <div className="content-2">
                <section className="contests-grid">
                        {activeTab === "upcoming" && filteredContests.upcomingContests.map((contest, index) => (
                       <ContestDetails key={index} {...contest} onUpdateBookmarks={() => fetchBookmarks()} />
                        ))}
                        {activeTab === "past" && filteredContests.previousContests.map((contest, index) => (
                        <ContestDetails key={index} {...contest} onUpdateBookmarks={() => fetchBookmarks()} />
                        ))}
                        
                        {activeTab === "bookmark" ? (
                            bookmarkedContests.length > 0 ? (
                                bookmarkedContests.map((contest, index) => (
                                    <ContestDetails key={index} {...contest} onUpdateBookmarks={fetchBookmarks} />
                                ))
                            ) : (
                                <p>No bookmarks found</p>
                            )
                        ) : null}
                    </section>
        </div>

            </section>
        </main>
    );
}