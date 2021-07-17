import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchOptimization from "../components/SearchOptimization/SearchOptimization";
import Layout from "../components/Layout";
import { AxieCard } from "../components/Axie/AxieCard";
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
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLoading]);
  return (
    <Layout>
      <SearchOptimization
        title="Floor Axies Explorer | AxieDaily"
        description="A tool to explore floor axies in the Marketplace without the hassle"
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
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {axies.map((axie, i) => {
            return <AxieCard axie={axie} key={i} />;
          })}
        </div>
      )}
    </Layout>
  );
};

export default FloorAxies;
