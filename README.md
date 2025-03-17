This platform is made for the users to ease their work of checking the stautus of upcoming coding contest of different platoforms like leetcode, codeforces, codechefs.

All the details of the contests from all the three platforms are shown collectievly on this Web Application including contest name, duration, start time and date.

Information regarding the API's used:
1. LeetCode
  •	Fetches upcoming and past LeetCode contests.
	•	Endpoint: https://leetcode.com/graphql
	•	Request Type: POST
  •	Response Fields:
	 •	title: Contest name
	 •	startTime: Contest start time
	 •	duration: Duration in seconds
	 •	titleSlug: Used to construct contest URLs
2. CodeChefs
  •	Fetches upcoming and past CodeChef contests.
	•	Endpoint: https://www.codechef.com/api/list/contests/all
	•	Request Type: GET
	•	Response Fields:
 	 •	future_contests: Array of upcoming contests
	 •	past_contests: Array of past contests
3. CodeForces
  •	Fetches upcoming and past Codeforces contests.
	•	Endpoint: https://codeforces.com/api/contest.list?gym=false
	•	Request Type: GET
	•	Response Fields:
	 •	phase: Contest status (BEFORE for upcoming, FINISHED for past)
	 •	name: Contest name
	 •	startTimeSeconds: Unix timestamp for contest start time
	 •	durationSeconds: Contest duration
4. For youtube videos
  •	Fetches YouTube video solutions for contests.
	•	Endpoint: https://www.googleapis.com/youtube/v3/playlistItems
	•	Authentication: Requires API Key (YOUTUBE_API_KEY)
	•	Parameters:
	 •	part=snippet
	 •	playlistId: Playlist ID for a specific platform
	 •	maxResults=20: Limits results to 20 videos

Information about API Routes in Backend

1. Contests API
	 •	GET /api/all-contests
	 •	Fetches upcoming and past contests from Codeforces, LeetCode, and CodeChef.
2. Bookmarks API
	 •	POST /api/bookmark
	 •	Toggles bookmark status for a contest.
   •	Request Body: { name, site, startTime, duration, url }
   •	GET /api/bookmarks
	 •	Fetches all bookmarked contests.
3. YouTube Solutions API
	 •	GET /api/solutions
	 •	Fetches YouTube solution videos for contests.
 
