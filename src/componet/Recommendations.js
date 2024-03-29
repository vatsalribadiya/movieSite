import React, { useEffect, useState } from 'react';
import { Image, Card, CardHeader, CardBody } from "@nextui-org/react";

const Recommendations = (props) => {
    const {mediaType, mediaId} = props;
    const [recommendationsData, setRecommendationsData] = useState({});
    async function fetchRecommendationsAPI() {
        const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/recommendations?language=en-US`;
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
          setRecommendationsData(data);
        } catch (error) {
          console.error("Error fetching watch provider data:", error);
        }
    }
    useEffect(() => {
        fetchRecommendationsAPI();
        // eslint-disable-next-line
    }, []);
    const getDetails = ()=> {
        console.log(recommendationsData)
    }
    console.log(recommendationsData.results)
  return (
    <div>
        <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 pt-10 dark:text-white'>Recommendations</h1>
        <div className="container gap-2 inline-flex w-max overflow-x-scroll">
            {recommendationsData.results && recommendationsData.results.map((item, index) => (
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow  md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" key={index}>
                <Card className="py-4 overflow-visible" shadow="sm" isPressable onClick={getDetails}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl max-w-none"
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        width={270}
                    />
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                    <p className="text-tiny uppercase font-bold">{item.original_title ? item.original_title : item.original_name}</p>
                      <small className="text-default-500">Type: {item.media_type}</small>
                    </CardBody>
                </Card>
            </div>
            ))}
            <p className={`text-tiny uppercase font-bold ${recommendationsData.results ? '' : 'd-none'} `}>
              {recommendationsData.results === undefined || recommendationsData.results.length === 0 ? 'No Recommendations Available' : ''}
            </p>
        </div>
    </div>
  )
}

export default Recommendations