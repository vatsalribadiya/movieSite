import React, { useEffect, useState } from 'react'

const Reviews = (props) => {
    const {mediaType, mediaId} = props;
    const [ReviewsData, setReviewsData] = useState({});
    async function fetchReviewsAPI() {
        const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/reviews?language=en-US`;
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
          setReviewsData(data);
        } catch (error) {
          console.error("Error fetching watch provider data:", error);
        }
    }
    useEffect(() => {
        fetchReviewsAPI();
        // eslint-disable-next-line
    }, [])
  return (
    <div>
        <div className="container px-5 py-4 mx-auto pb-14">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Review</h1>
          {ReviewsData.results && ReviewsData.results.map((data, index) => (
          <div id="animation-carousel" data-carousel="static" className="relative xl:w-1/2 lg:w-3/4 w-full mx-auto text-center" key={index}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-8 h-8 text-gray-400 mb-8" viewBox="0 0 975.036 975.036">
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="leading-relaxed text-lg">{data.content}</p>
            <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{data.author}</h2>
            <p className="text-gray-500">{data.created_at }</p>
          </div>
          ))}
        </div>
    </div>
  )
}

export default Reviews