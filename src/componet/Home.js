import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home(props) {
    const navigate = useNavigate();
    const [trandingData, setTrandingData] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
      fetchMyAPI();
      // eslint-disable-next-line
    }, []);
    async function fetchMyAPI() {
      try {
            const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`;
              props.setProgress(0);
              const response = await fetch(`${url}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDQzMzMzNzlhODFjNzdhYTc1ZDg1OWE5MTNmNGQ3YyIsInN1YiI6IjY1NjkxMjZmNjM1MzZhMDBjNDJhMjYxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kePRA_GVB1kuwso1dZ3IHXkz1nUdjko5IhgzL0t7Yyk'
              },
              });
              props.setProgress(80);
              const json = await response.json();
              let uniqueArray = [];
              trandingData.concat(json.results).forEach((value) => {
                if (!uniqueArray.includes(value)) {
                  uniqueArray.push(value);
                }
              });
              setTrandingData(uniqueArray);
              props.setProgress(100);
          } catch (error) {
              console.error();
          }
      }
      async function fetchMoreData() {
        setPage(page + 1);
        await fetchMyAPI();
      }
       
      const getDetails = (e) => {
         const mediaId = e.target.getAttribute('value');
         const mediaType = e.target.getAttribute('val');
         navigate('/Myinfo', { state: { mediaId: mediaId, mediaType: mediaType } })
      }
      document.title = 'Home';
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-5xl py-20 sm:py-48 lg:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                Millions of movies, TV shows and people to discover. Explore now.
            </h1>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div>
            <h1 className="tracking-tight inline font-semibold from-[#FF705B] to-[#FFB457] text-3xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b">
                  Trending &nbsp;
                </h1>
            <h1 className="tracking-tight inline font-semibold text-3xl lg:text-6xl dark:text-white">
                Now
            </h1>
        </div>
        <InfiniteScroll
          dataLength={trandingData.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<Spinner/>}
        >
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 dark:text-white">
              {trandingData && trandingData.map((trandingData, index) => (
                  <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow  md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" key={index}>
                  <Card shadow="sm" isPressable onClick={getDetails} >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center overflow-visible mx-auto">
                      <Image alt="Card background" className="object-cover rounded-xl" src={`https://image.tmdb.org/t/p/w500${trandingData.poster_path}`} width={270} value={trandingData.id} val={trandingData.media_type}/>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 items-center mx-auto">
                      <p className="text-tiny uppercase font-bold">{trandingData.original_title ? trandingData.original_title : trandingData.original_name}</p>
                        <small className="text-default-500">Type: {trandingData.media_type}</small>
                        {/* <h4 className="font-bold text-large">{trandingData.vote_count}</h4> */}
                    </CardBody>
                  </Card>
                  </div>
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
    </div>
  )
}
