import axios from "axios";

import errorHandler from "./errorHandler";

const apiRoot = axios.create({
  baseURL: ``,
});

apiRoot.interceptors.response.use((response) => response, errorHandler);

export default apiRoot;
