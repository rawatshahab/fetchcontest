import React, { useEffect, useState } from "react";
import "./sol.css";

interface Solution {
    title: string;
    url: string;
    thumbnail: string;
    platform: string;
}

export default function Solutions() {
    const [activetabb, setActivetabb] = useState("All");
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<string>("All");

    useEffect(() => {
        fetch("http://localhost:3000/api/solutions")
            .then(response => response.json())
            .then(data => {
                setSolutions(data);
                setFilteredSolutions(data);
            })
            .catch(error => console.error("Error fetching solutions:", error));
    }, []);

    const filterByPlatform = (platform: string) => {
        setActivetabb(platform);
        setSelectedPlatform(platform);
        if (platform === "All") {
            setFilteredSolutions(solutions);
        } else {
            setFilteredSolutions(solutions.filter(video => video.platform === platform));
        }
    };

    return (
        <main className="solutions-page">
            <h1>Past Contest Solutions</h1>
            <div className="platform-filters">
                <div onClick={() => filterByPlatform("All")} className={selectedPlatform === "LeetCode" ? "active-filter" : ""}>
                    <span className={activetabb === "All" ? "all" : ""}>All</span>
                    </div>
                <div  onClick={() => filterByPlatform("LeetCode")} className={selectedPlatform === "LeetCode" ? "active-filter" : ""}>
                    <span className={activetabb === "LeetCode" ? "red" : ""}>LeetCode</span>
                </div>
                <div  onClick={() => filterByPlatform("CodeChef")} className={selectedPlatform === "CodeChef" ? "active-filter" : ""}>
                    <span className={activetabb === "CodeChef" ? "yellow" : ""}>CodeChef</span>
                </div>
                <div  onClick={() => filterByPlatform("Codeforces")} className={selectedPlatform === "Codeforces" ? "active-filter" : ""}>
                    <span className={activetabb === "Codeforces" ? "voilet" : ""}>Codeforces</span>
                </div>
            </div>

               

            <div className="solutions-grid">
                {filteredSolutions.map((video, index) => (
                    <div key={index} className="solution-card">
                        <img src={video.thumbnail} alt={video.title} />
                        <h3>{video.title}</h3>
                        <a href={video.url} target="_blank" rel="noopener noreferrer">Watch Solution</a>
                    </div>
                ))}
            </div>
        </main>
    );
}