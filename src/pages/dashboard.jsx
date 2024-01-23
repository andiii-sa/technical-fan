import React, { useEffect, useState } from "react";
import {
  ApiGetDetailPokemon,
  ApiGetListPokemon,
} from "../api/apiStore/pokemon";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({
    offset: 0,
    limit: 50,
  });
  const [search, setSearch] = useState("");

  const getDetailPokemon = async (search) => {
    if (search) {
      try {
        setLoading(true);
        const res = await ApiGetDetailPokemon(search);
        if (res.status === 200) {
          setPokemons({
            results: [res?.data],
            count: 0,
          });
        } else {
          setPokemons({
            results: [],
            count: 0,
          });
        }
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const getListPokemon = async (params, search) => {
    if (!search) {
      try {
        setLoading(true);
        const res = await ApiGetListPokemon(params);
        setPokemons(res?.data ?? []);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    getListPokemon(meta, search);
  }, [meta, search]);

  useEffect(() => {
    getDetailPokemon(search);
  }, [search]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <nav className="bg-white px-12 py-4 rounded">
        <h2 className="text-2xl font-bold">List Pokemon</h2>
      </nav>
      <div className="flex flex-col mx-12 px-3 py-3 my-4 bg-white rounded shadow-xl">
        <input
          type="text"
          placeholder="Search by name"
          className="py-2 px-2 border border-gray-400 rounded mt-2"
          value={search}
          onChange={(val) => setSearch(val.target.value)}
        />
        <div className="flex flex-col mt-2 p-3 border border-gray-400 rounded">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2 p-2 bg-gray-100 rounded items-center">
              <div className="w-full font-semibold">Name</div>
              <div className="w-[100px] flex-none font-semibold">Action</div>
            </div>
            {!loading ? (
              pokemons?.results?.length > 0 ? (
                pokemons?.results?.map((pokemon, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row gap-2 p-2 items-center bg-slate-50 py-3 rounded-sm hover:bg-slate-300"
                  >
                    <div className="w-full font-medium capitalize">
                      {pokemon?.name}
                    </div>
                    <div className="w-[100px] flex-none">
                      <Link
                        to={`/detail/${pokemon?.name}`}
                        className="py-2 px-4 bg-neutral-700 hover:bg-neutral-800 text-white rounded-sm"
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-row gap-2 justify-center p-2 items-center">
                  Data Not Found
                </div>
              )
            ) : (
              <div className="flex flex-row gap-2 justify-center p-2 items-center">
                Loading . . .
              </div>
            )}
          </div>
          <Pagination
            offset={meta.offset}
            limit={meta.limit}
            total={pokemons?.count}
            handlePagination={(val) =>
              setMeta((prev) => ({ ...prev, offset: val }))
            }
            hidePagination={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const Pagination = ({
  offset,
  limit,
  total,
  handlePagination,
  hidePagination = false,
}) => {
  return hidePagination ? null : (
    <div className="flex justify-center gap-2 py-2 border-t border-t-gray-400 mt-2 pt-4">
      {offset > 0 && (
        <button
          className={`flex gap-1 items-center py-1 px-4 border border-gray-400 rounded bg-violet-600 text-white`}
          onClick={() => handlePagination(offset - 1)}
        >
          <i className="bx bx-left-arrow-alt text-lg"></i>
          <span>Previous</span>
        </button>
      )}
      {offset * limit <= total && total > 0 && (
        <button
          className={`flex gap-1 items-center py-1 px-4 border border-gray-400 rounded bg-violet-600 text-white`}
          onClick={() => handlePagination(offset + 1)}
        >
          <span>Next</span>
          <i className="bx bx-right-arrow-alt text-lg"></i>
        </button>
      )}
    </div>
  );
};
