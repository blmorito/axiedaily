import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchOptimization from "../components/SearchOptimization/SearchOptimization";
import Layout from "../components/Layout";
import { AxieCard } from "../components/Axie/AxieCard";
import flooraxieimg from "../images/flooraxies.png";
const FloorAxies = () => {
  const request = {
    operationName: "GetAxieBriefList",
    variables: {
      from: 0,
      size: 100,
      sort: "PriceAsc",
      auctionType: "Sale",
      criteria: { stages: [4] },
    },
    query:
      "query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\n  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\n    total\n    results {\n      ...AxieBrief\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AxieBrief on Axie {\n  id\n  name\n  stage\n  class\n  breedCount\n  image\n  title\n  battleInfo {\n    banned\n    __typename\n  }\n  auction {\n    currentPrice\n    currentPriceUSD\n    __typename\n  }\n  parts {\n    id\n    name\n    class\n    type\n    specialGenes\n    __typename\n  }\n  __typename\n}\n",
  };
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [axies, setAxies] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .post("https://axieinfinity.com/graphql-server-v2/graphql", request)
      .then((response) => {
        console.log({ response });
        setAxies(response.data.data.axies.results);
      })
      .catch((err) => {
        console.error({ err });
        setError(
          err.message
            ? err.message
            : "Something went wrong with the server. Please refresh the page to try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLoading]);
  return (
    <Layout>
      <SearchOptimization
        title="Floor Axies Explorer | AxieDaily"
        description="A tool to explore floor axies in the Marketplace fast. See average floor price, average price for a full axie team based on floor price axies."
        image={flooraxieimg}
      />
      {isLoading ? (
        <div className="min-h-screen">
          <div className="flex h-screen justify-center items-center space-x-1 text-sm text-gray-700">
            <svg
              fill="none"
              className="w-6 h-6 animate-spin"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>

            <div>Loading ...</div>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
            {axies.map((axie, i) => {
              return <AxieCard axie={axie} key={i} />;
            })}
          </div>
          {error && (
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300 ">
                <div slot="avatar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-alert-octagon w-5 h-5 mx-2"
                  >
                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div class="text-xl font-normal  max-w-full flex-initial">
                  {error}
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </Layout>
  );
};

export default FloorAxies;
