import Endpoints from "../Endpoints";
import HttpClient from "../HttpClient";

const findAndCountAll = async (filters) => {
  return HttpClient.get(`${Endpoints.USERS}${Endpoints.ARTICLES}`, { params: filters });
};

export default { findAndCountAll };
