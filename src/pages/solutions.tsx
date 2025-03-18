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
            <div className="sticky">
            <div className="sticky-content">
            <h1>Past Contest Solutions</h1>
            <div className="platform-filters">
                <div onClick={() => filterByPlatform("All")} className={activetabb === "All" ? "all" : ""} >
                    <span >All</span>
                    </div>
                <div  onClick={() => filterByPlatform("LeetCode")}  className={activetabb === "LeetCode" ? "green" : ""}>
                    <span>LeetCode</span>
                </div>
                <div  onClick={() => filterByPlatform("CodeChef")} className={activetabb === "CodeChef" ? "blue" : ""}>
                    <span >CodeChef</span>
                </div>
                <div  onClick={() => filterByPlatform("Codeforces")} className={activetabb === "Codeforces" ? "voilet" : ""}>
                    <span >Codeforces</span>
                </div>
            </div>
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