import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, ExternalLink, Bookmark } from "lucide-react";
import "./Contest.css"; 

interface ContestCardProps {
  name: string;
  site: string;
  startTime: string;
  duration: number;
  url: string;
  onUpdateBookmarks: () => void; 
}

const ContestDetails: React.FC<ContestCardProps> = ({ name, site, startTime, duration, url, onUpdateBookmarks }) => {
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
      axios.get("http://localhost:3000/api/bookmarks")
        .then(response => {
          const isBookmarked = response.data.some(bookmark => bookmark.name === name && bookmark.site === site); 
          setBookmarked(isBookmarked);
        })
        .catch(error => console.error("Error fetching bookmarks:", error));
    }, [name, site]);

    const handleBookmark = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/bookmark", { name, site, startTime, duration, url });
        setBookmarked(response.data.message === "Bookmark saved");
        onUpdateBookmarks(); 
      } catch (error) {
        console.error("Error toggling bookmark:", error);
      }
    };
  
  return (
    <div className="contest-card">
      <span className={`platform-tag ${site.toLowerCase()}`}>{site}</span>
      <h3>{name}</h3>
      <p className="start-time"><Clock size={14} /> {new Date(startTime).toLocaleString()}</p>
      <p className="duration">Duration: {Math.floor(duration / 3600)}h {Math.floor((duration % 3600) / 60)}m</p>
      <div className="card-footer">
        <a href={url} target="_blank" rel="noopener noreferrer" className="visit-link">
          <ExternalLink size={14} /> Visit Contest
        </a>
        <Bookmark
            className="bookmark-icon"
            onClick={handleBookmark}
            fill={bookmarked ? "gold" : "none"}
            stroke={bookmarked ? "gold" : "black"}
        />
      </div>
    </div>
  );
};

export default ContestDetails;