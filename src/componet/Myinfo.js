import React, { useEffect, useState } from 'react'
import { useLocation,Link } from 'react-router-dom';
import { Image } from "@nextui-org/react";
import Watchprovider from './Watchprovider';
import Mediacredit from './Mediacredit';
import Recommendations from './Recommendations';
import Similar from './Similar';
import Reviews from './Reviews';
// import Videos from './Videos';

const Myinfo = (props) => {
  const { state } = useLocation();
  const { mediaType, mediaId } = state;
  const [mediaData, setMediaData] = useState({});

  useEffect(() => {
    fetchMyAPI();
    // eslint-disable-next-line
  }, []);

  async function fetchMyAPI() {
    const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?language=en-US`;
    try {
      props.setProgress(0);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDQzMzMzNzlhODFjNzdhYTc1ZDg1OWE5MTNmNGQ3YyIsInN1YiI6IjY1NjkxMjZmNjM1MzZhMDBjNDJhMjYxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kePRA_GVB1kuwso1dZ3IHXkz1nUdjko5IhgzL0t7Yyk",
        },
      });
      props.setProgress(80);
      const data = await response.json();
      setMediaData(data);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching media data:", error);
    }
  }
  const keywordData =  mediaData.genres && mediaData.genres.map((item) => item.name).join(", ");
  const audiodData =  mediaData.spoken_languages && mediaData.spoken_languages.map((item) => item.english_name).join(", ");
  let hours = Math.floor(mediaData.runtime / 60);          
  let minutes = mediaData.runtime % 60;

  document.title =  mediaData.original_title ? mediaData.original_title : mediaData.original_name;
  return (
    <div>
      <section className="text-gray-600 body-font dark:text-white">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <Image showSkeleton width={320} height={180} maxdelay={10000} src={`https://image.tmdb.org/t/p/w500${mediaData.poster_path}`} alt="Default Image" objectfit="cover"/>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h2 className="text-sm title-font text-gray-500 tracking-widest dark:text-white">"{mediaData.tagline}"</h2>
            <Link to={mediaData.homepage} target='_blank' rel="noreferrer"><h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-white">{mediaData.original_title ? mediaData.original_title : mediaData.original_name}</h1></Link>
            <p className="mb-6 leading-relaxed">{mediaData.overview}</p>
            <span className='text-sm mt-2 text-gray-500 dark:text-white mb-2 w-full'>Release on {mediaData.release_date ? mediaData.release_date : mediaData.first_air_date} | {hours}h {minutes}m | {keywordData} </span>
            <span className='text-sm mt-2 text-gray-500 dark:text-white mb-2 w-full'> Audio : {audiodData} </span>
            <div className="flex w-full  items-end mb-5">
              <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{mediaData.vote_average}</p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{mediaData.vote_count} reviews</span>
              </div>
            </div>
            <Watchprovider mediaType={mediaType} mediaId={mediaId}/>
          </div>
        </div>
        <Reviews mediaType={mediaType} mediaId={mediaId}/>
        <Mediacredit mediaType={mediaType} mediaId={mediaId}/>
        <Similar mediaType={mediaType} mediaId={mediaId}/>
        <Recommendations mediaType={mediaType} mediaId={mediaId}/>
      </section> 
    </div>
  )
}

export default Myinfo