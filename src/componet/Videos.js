import React, { useEffect, useState } from 'react'

const Videos = (props) => {
    const {mediaType, mediaId} = props;
    const [videosData, setVideosData] = useState({});
    async function fetchSimilarAPI() {
        const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?language=en-US`;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDQzMzMzNzlhODFjNzdhYTc1ZDg1OWE5MTNmNGQ3YyIsInN1YiI6IjY1NjkxMjZmNjM1MzZhMDBjNDJhMjYxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kePRA_GVB1kuwso1dZ3IHXkz1nUdjko5IhgzL0t7Yyk",
            },
          });
          const data = await response.json();
          setVideosData(data);
        } catch (error) {
          console.error("Error fetching watch provider data:", error);
        }
    }
    useEffect(() => {
        fetchSimilarAPI();
        // eslint-disable-next-line
    }, []);
    console.log(videosData)
  return (
    <div>Videos</div>
  )
}

export default Videos