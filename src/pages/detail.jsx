import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiGet, ApiGetDetailPokemon } from "../api/apiStore/pokemon";
import ReactApexChart from "react-apexcharts";

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);

  const getDetailPokemon = async (search) => {
    if (search) {
      try {
        setLoading(true);
        const res = await ApiGetDetailPokemon(search);
        setPokemon(res?.data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    getDetailPokemon(id);
  }, [id]);

  return (
    <div className="bg-neutral-900 py-6 min-h-screen">
      {loading ? (
        <div className=" flex flex-col h-screen justify-center items-center text-white animate-ping">
          Loading . . .
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="text-2xl bg-white text-blue-800 px-6 py-3 font-bold rounded-lg">
              Pokemon
            </div>
          </div>

          <div className="ml-auto mr-auto flex flex-col justify-center items-center mt-4 bg-white rounded-lg p-5 w-fit">
            <h2 className="text-xl text-black mb-2 font-bold uppercase">
              {pokemon?.name}
            </h2>
            <img
              src={
                pokemon?.sprites?.front_default ??
                pokemon?.sprites?.front_shiny ??
                "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1255/image-not-found.svg"
              }
              alt="pokemon"
              className="w-36 h-auto bg-cover animate-bounce"
            />
          </div>

          <div className="flex gap-2 justify-center mt-4 flex-wrap">
            <div className="flex flex-col w-[200px] bg-white rounded-lg shadow-lg p-3">
              <span className="font-semibold text-lg">Abilities</span>
              <ol className="list-disc pl-3">
                {pokemon?.abilities?.map((ability, idx) => (
                  <li className="capitalize" key={idx}>
                    {ability?.ability?.name}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col w-[200px] bg-white rounded-lg shadow-lg p-3">
              <span className="font-semibold text-lg">Type</span>
              <ol className="list-disc pl-3">
                {pokemon?.types?.map((type, idx) => (
                  <li className="capitalize" key={idx}>
                    {type?.type?.name}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col w-[200px] bg-white rounded-lg shadow-lg p-3">
              <span className="font-semibold text-lg">Height</span>
              <span>{pokemon?.height} decimeters</span>
            </div>
          </div>
          <Species url={pokemon?.species?.url} />
          <DiagramStats data={pokemon?.stats ?? []} />
          <div className="flex justify-center">
            <Link to={"/"} className=" text-white underline mt-5 text-sm">
              Back to home
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;

const DiagramStats = ({ data = [] }) => {
  const state = useMemo(() => {
    return {
      series: [
        {
          name: "Base Stat",
          data: data?.map((item) => item?.base_stat),
        },
        {
          name: "Effort",
          data: data?.map((item) => item?.effort),
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 430,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        xaxis: {
          categories: data?.map((item) => item?.stat?.name ?? "-"),
        },
      },
    };
  }, [data]);

  return (
    <div className="flex justify-center mt-4">
      <div className="flex items-center flex-col gap-2 w-[80%] bg-white p-3 rounded-lg shadow-lg">
        <span className="font-semibold text-lg">Diagram Stats</span>
        <div className="w-full">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={430}
          />
        </div>
      </div>
    </div>
  );
};

const Species = ({ url }) => {
  const [data, setData] = useState();

  const getData = async (path) => {
    if (path) {
      try {
        const res = await ApiGet(path);
        setData(res?.data);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    getData(url);
  }, [url]);

  return (
    <div className="flex justify-center mt-4">
      <div className="flex flex-col gap-2 bg-white rounded-lg shadow-lg p-3 w-fit items-center">
        <span className="font-semibold text-lg">Species</span>
        <div className="flex gap-3 flex-wrap justify-center">
          <div className="grid grid-cols-1">
            <span className="font-medium text-xs">Name</span>
            <span className="capitalize">{data?.name}</span>
          </div>
          <div className="grid grid-cols-1">
            <span className="font-medium text-xs">Capture Rate</span>
            <span className="capitalize">{data?.capture_rate}%</span>
          </div>
          <div className="grid grid-cols-1">
            <span className="font-medium text-xs">Color</span>
            <span className="capitalize">{data?.color?.name}</span>
          </div>
          <div className="grid grid-cols-1">
            <span className="font-medium text-xs">Growth Rate</span>
            <span className="capitalize">{data?.growth_rate?.name}</span>
          </div>
          <div className="grid grid-cols-1">
            <span className="font-medium text-xs">Habitat</span>
            <span className="capitalize">{data?.habitat?.name}</span>
          </div>
          <div className="grid grid-cols-1">
            <span className="font-medium text-xs">Is Baby</span>
            <span className="capitalize">{data?.is_baby ? "Yes" : "No"}</span>
          </div>
          <div className="grid grid-cols-1">
            <span className="font-medium text-xs">Is Legendary</span>
            <span className="capitalize">
              {data?.is_legendary ? "Yes" : "No"}
            </span>
          </div>
          <div className="grid grid-cols-1">
            <span className="font-medium text-xs">Is Mythical</span>
            <span className="capitalize">
              {data?.is_mythical ? "Yes" : "No"}
            </span>
          </div>
          <div className="grid grid-cols-1">
            <span className="font-medium text-xs">Shape</span>
            <span className="capitalize">{data?.shape?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
