import React from "react";
import { AxiePart } from "./Parts";

const AxieClass = ({ axieClass }) => {
  function getClassName(type) {
    let typec = "";
    switch (type) {
      case "Bird":
        typec = "bg-pink-300";
        break;
      case "Beast":
        typec = "bg-orange-400";
        break;
      case "Aquatic":
        typec = "bg-light-blue-700";
        break;
      case "Plant":
        typec = "bg-green-500";
        break;
      case "Bug":
        typec = "bg-red-400";
        break;
      case "Reptile":
        typec = "bg-purple-300";
        break;
      case "Mech":
        typec = "bg-gray-800";
        break;
      case "Dawn":
        typec = "bg-blue-gray-600";
        break;
      case "Dusk":
        typec = "bg-cyan-900";
        break;
      default:
        break;
    }
    return typec;
  }
  return (
    <p
      className={
        "text-white  rounded-full inline-block px-3 text-xs " +
        getClassName(axieClass)
      }
    >
      {axieClass}
    </p>
  );
};
export const AxieCard = ({ axie }) => {
  console.log("axie-data", axie);
  function getPartClass(axie, type) {
    return axie.parts.find((part) => part.type === type).class;
  }
  function getPartName(axie, type) {
    return axie.parts.find((part) => part.type === type).name;
  }
  return (
    <div className="rounded overflow-hidden shadow-lg px-2 py-2">
      <AxieClass axieClass={axie.class} />
      <a
        href={`https://marketplace.axieinfinity.com/axie/${axie.id}`}
        target="_blank"
      >
        <img className="w-full" src={axie.image} alt={axie.id} />
      </a>

      <div className="py-4">
        <div className="font-bold text-sm">
          <a href={`https://marketplace.axieinfinity.com/axie/${axie.id}`}>
            Axie #{axie.id}
          </a>
        </div>
        <p className="font-light mb-2 text-xs text-gray-700">
          Breed Count: {axie.breedCount} / 7
        </p>
        <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6">
          {["Eyes", "Ears", "Back", "Mouth", "Horn", "Tail"].map((part, i) => {
            return (
              <AxiePart
                key={i}
                part={part}
                type={getPartClass(axie, part)}
                name={getPartName(axie, part)}
              />
            );
          })}
        </div>
      </div>
      <div className="pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {Number(axie.auction.currentPrice / 1000000000000000000).toFixed(4)}
          <span className="ml-1 text-xs font-semibold text-gray-500">
            ${axie.auction.currentPriceUSD}
          </span>
        </span>
      </div>
    </div>
  );
};
