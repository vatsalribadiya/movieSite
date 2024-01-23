import React, { useEffect, useState } from 'react'

function Watchprovider(props) {
    const {mediaType, mediaId} = props;
    const [watchProvider, setWatchProvider] = useState({});

    async function fetchWatchProviderAPI() {
        const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/watch/providers?language=en-US`;
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
          setWatchProvider(data);
        } catch (error) {
          console.error("Error fetching watch provider data:", error);
        }
    }
    useEffect(() => {
        fetchWatchProviderAPI();
        // eslint-disable-next-line
    }, [])
    let watchProviderData;
    let watchProviderDeatils;
    // console.log(watchProvider.results)
    if (watchProvider.results) {
        watchProviderData = watchProvider.results.US;
        if (watchProviderData) {
        watchProviderDeatils = watchProviderData.buy ?? watchProviderData.flatrate ?? watchProviderData.rent ?? null;
        }
    }
  return (
    <div>
        <div className="flex">
            {watchProviderDeatils && watchProviderDeatils.map((providerData, index) => (
            <div className="p-3 bg-gray-100" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500${providerData.logo_path}`} alt="" width={60}/>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Watchprovider