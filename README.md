This platform is made for the users to ease their work of checking the stautus of upcoming coding contest of different platoforms like leetcode, codeforces, codechefs.

All the details of the contests from all the three platforms are shown collectievly on this Web Application including contest name, duration, start time and date.

Information regarding the API's used:
1. LeetCode
    1. Fetches upcoming and past LeetCode contests.
	2. Endpoint: https://leetcode.com/graphql
	3. Request Type: POST
    4. Response Fields:
	  1. title: Contest name
	  2. startTime: Contest start time
	  3. duration: Duration in seconds
	  4. titleSlug: Used to construct contest URLs
2. CodeChefs
    1. Fetches upcoming and past CodeChef contests.
	2. Endpoint: https://www.codechef.com/api/list/contests/all
	3. Request Type: GET
	4. Response Fields:
	  1. future_contests: Array of upcoming contests
	  2. past_contests: Array of past contests

3. CodeForces
    1. Fetches upcoming and past Codeforces contests.
	2. Endpoint: https://codeforces.com/api/contest.list?gym=false
	3. Request Type: GET
	4. Response Fields:
	  1. phase: Contest status (BEFORE for upcoming, FINISHED for past)
	  2. name: Contest name
	  3. startTimeSeconds: Unix timestamp for contest start time
	  4. durationSeconds: Contest duration
4. For youtube videos
    1. Fetches YouTube video solutions for contests.
	2. Endpoint: https://www.googleapis.com/youtube/v3/playlistItems
	3. Authentication: Requires API Key (YOUTUBE_API_KEY)
	4. Parameters:
	  1. part=snippet
	  2. playlistId: Playlist ID for a specific platform
	  3. maxResults=20: Limits results to 20 videos

Information about API Routes in Backend

1. Contests API
	 1. GET /api/all-contests
	 2. Fetches upcoming and past contests from Codeforces, LeetCode, and CodeChef.
2. Bookmarks API
	 1. POST /api/bookmark
	 2.	Toggles bookmark status for a contest.
     3.	Request Body: { name, site, startTime, duration, url }
     4.	GET /api/bookmarks
	 5.	Fetches all bookmarked contests.
3. YouTube Solutions API
	 1.	GET /api/solutions
	 2.	Fetches YouTube solution videos for contests.
 

Backend repo Link
https://github.com/rawatshahab/contestbackend.git

Demo link:
https://www.dropbox.com/scl/fi/pq99qudgyn8q2pudayws2/1742301844582776.mp4?rlkey=h2q8v6ouv21skome41o3zd0nb&st=t766vsmz&dl=0