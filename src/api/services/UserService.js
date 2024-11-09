import Endpoints from "../Endpoints";
import HttpClient from "../HttpClient";

/**
 * Registers a new user by sending a POST request to the REGISTER endpoint.
 *
 * @param {object} data - The user data to register, typically including name, email, and password.
 * @returns {Promise<object>} The response from the HTTP request.
 * @throws {Error} Throws an error if the registration request fails.
 */
const register = async (data) => {
  return HttpClient.post(`/${Endpoints.REGISTER}`, data);
};

/**
 * Logs in a user by sending a POST request to the LOGIN endpoint.
 *
 * @param {object} data - The login credentials, typically including email and password.
 * @returns {Promise<object>} The response from the HTTP request.
 * @throws {Error} Throws an error if the login request fails.
 */
const login = async (data) => {
  return HttpClient.post(`/${Endpoints.LOGIN}`, data);
};

/**
 * Retrieves a user by their ID by sending a GET request to the USERS endpoint.
 *
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<object>} The response from the HTTP request, containing user details.
 * @throws {Error} Throws an error if the request fails.
 */
const findById = async (id) => {
  return HttpClient.get(`/${Endpoints.USERS}/${id}`);
};

export default { register, login, findById };
