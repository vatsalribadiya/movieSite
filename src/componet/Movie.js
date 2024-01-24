import React, { useState, useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';
import { Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

const Movie = (props) => {
  const navigate = useNavigate();
  const [tvSerivesData, setTvSerivesData] = useState([]);
  const [page, setPage] = useState(1);

 useEffect(() => {
    fetchMyAPI();
    // eslint-disable-next-line
 }, []);

  async function fetchMyAPI() {
      props.setProgress(0);
      const url = `https://api.themoviedb.org/3/trending/movie/day?language=in-IN&page=${page}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDQzMzMzNzlhODFjNzdhYTc1ZDg1OWE5MTNmNGQ3YyIsInN1YiI6IjY1NjkxMjZmNjM1MzZhMDBjNDJhMjYxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kePRA_GVB1kuwso1dZ3IHXkz1nUdjko5IhgzL0t7Yyk'
        },
      });
      props.setProgress(80);
      const parseData = await response.json();
      let uniqueArray = [];
      tvSerivesData && tvSerivesData.concat(parseData.results).forEach((value) => {
        if (!uniqueArray.includes(value)) {
          uniqueArray.push(value);
        }
      });
      setTvSerivesData(uniqueArray);
      props.setProgress(100);
  }

  async function fetchMoreData() {
      setPage(page + 1);
      await fetchMyAPI();
  }

  useEffect(() => {
      document.title = 'Movies';
  }, []);
  const getDetails = (e) => {
    const  mediaType = e.target.getAttribute('value');
    const mediaId = e.target.getAttribute('val');
    navigate('/Myinfo', { state: { mediaId: mediaId, mediaType: mediaType } })
 }
  return (
    <>
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
      <div>
            <h1 className="tracking-tight inline font-semibold from-[#FF705B] to-[#FFB457] text-3xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b">
                 Movies
                </h1>
        </div>
      <InfiniteScroll
          dataLength={tvSerivesData.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<Spinner/>}
        >
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 dark:text-white dark:bg-gray-900">
              {tvSerivesData && tvSerivesData.map((tvSerivesData, index) => (
                  <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow  md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" key={index}>
                  <Card shadow="sm" isPressable onClick={getDetails} >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center overflow-visible mx-auto">
                      <Image alt="Card background" className="object-cover rounded-xl" src={`https://image.tmdb.org/t/p/w500${tvSerivesData.poster_path}`} width={270} val={tvSerivesData.id} value={tvSerivesData.media_type}/>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 items-center mx-auto">
                      <p className="text-tiny uppercase font-bold">{tvSerivesData.original_title ? tvSerivesData.original_title : tvSerivesData.original_name}</p>
                        <small className="text-default-500">Type: {tvSerivesData.media_type}</small>
                    </CardBody>
                  </Card>
                  </div>
              ))}
          </div>
        </InfiniteScroll>
    </div>
    </>
  )
}

export default Movie