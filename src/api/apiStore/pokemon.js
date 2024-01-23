import apiRoot from "../apiRoot";

export const ApiGetListPokemon = async (params) => {
  try {
    const res = await apiRoot.get(`https://pokeapi.co/api/v2/pokemon`, {
      params: params,
    });
    return res;
  } catch ({ response: error }) {
    return error;
  }
};

export const ApiGetDetailPokemon = async (id) => {
  try {
    const res = await apiRoot.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  } catch ({ response: error }) {
    return error;
  }
};

export const ApiGet = async (url) => {
  try {
    const res = await apiRoot.get(`${url}`);
    return res;
  } catch ({ response: error }) {
    return error;
  }
};
