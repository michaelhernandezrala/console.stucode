import _ from "lodash-es";

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

/**
 * Fetches a list of users with a count, applying optional filters.
 *
 * @param {object} filters - Optional filters to apply to the query.
 * @param {number} [filters.page] - The page number for pagination.
 * @param {number} [filters.limit] - The maximum number of results per page.
 * @param {string} [filters.order] - The order in which to sort results.
 * @param {string} [filters.find] - A search term to filter results.
 * @returns {Promise<object>} - The response object containing the count and list of users.
 */
const findAndCountAll = async (filters) => {
  return HttpClient.get(`/${Endpoints.USERS}`, { params: filters });
};

const listFollowers = async (userId, filters) => {
  return HttpClient.get(`/${Endpoints.USERS}/${userId}/followers`, { params: filters });
};

/**
 * Updates a specific user by its ID.
 *
 * @param {string} userId - The ID of the user.
 * @param {object} data - The data to update the user with.
 * @param {string} data.name - The new name for the user.
 * @param {string} data.biography - The new biography for the user.
 * @param {string} data.image - The new image URL for the user.
 * @returns {Promise<object>} - The response object containing the updated user details.
 */
const update = async (userId, data) => {
  return HttpClient.put(`/${Endpoints.USERS}/${userId}`, data);
};

const deleteById = async (userId) => {
  return HttpClient.delete(`/${Endpoints.USERS}/${userId}`);
};

const checkIfFollowing = async (id, userId) => {
  const followers = await HttpClient.get(`${Endpoints.USERS}/${userId}/${Endpoints.FOLLOWERS}`);
  return _.some(followers.data, { id });
};

const followUser = async (id, payload) => {
  return HttpClient.post(`${Endpoints.USERS}/${id}/${Endpoints.FOLLOWERS}`, payload);
};

const unfollowUser = async (id, followerId) => {
  return HttpClient.delete(`${Endpoints.USERS}/${id}/${Endpoints.FOLLOWERS}/${followerId}`);
};

export default {
  register,
  login,
  findById,
  findAndCountAll,
  listFollowers,
  update,
  deleteById,
  checkIfFollowing,
  followUser,
  unfollowUser,
};
