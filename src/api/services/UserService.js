import Endpoints from "../Endpoints";
import HttpClient from "../HttpClient";

const register = async (data) => {
  return HttpClient.post(Endpoints.REGISTER, data);
};

const login = async (data) => {
  return HttpClient.post(Endpoints.LOGIN, data);
};

export default { register, login };
