import React, { useEffect, useState } from 'react';
import { Image, Card, CardHeader, CardBody } from "@nextui-org/react";

const Mediacredit = (props) => {
    const {mediaType, mediaId} = props;
    const [creditData, setCreditData] = useState({});
    async function fetchCreditAPI() {
        const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?language=en-US`;
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
          setCreditData(data);
        } catch (error) {
          console.error("Error fetching watch provider data:", error);
        }
    }
    useEffect(() => {
        fetchCreditAPI();
        // eslint-disable-next-line
    }, []);
    
  return (
    <div>
        <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 pt-10'>Top Billed Cast</h1>
        <div className="container gap-2 inline-flex w-max overflow-x-scroll">
            {creditData.cast && creditData.cast.map((item, index) => (
            <Card className="py-4 overflow-visible" key={index}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl max-w-none"
                    src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                    width={270}
                />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                <small className="text-default-500">{item.character}</small>
                <h4 className="font-bold text-large">{item.original_name}</h4>
                </CardBody>
            </Card>
            ))}
        </div>
    </div>
  )
}

export default Mediacredit