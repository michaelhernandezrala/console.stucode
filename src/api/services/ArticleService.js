import Endpoints from "../Endpoints";
import HttpClient from "../HttpClient";

/**
 * Fetches a list of articles with a count, applying optional filters.
 *
 * @param {object} filters - Optional filters to apply to the query.
 * @param {number} [filters.page] - The page number for pagination.
 * @param {number} [filters.limit] - The maximum number of results per page.
 * @param {string} [filters.order] - The order in which to sort results.
 * @param {string} [filters.find] - A search term to filter results.
 * @returns {Promise<object>} - The response object containing the count and list of articles.
 */
const findAndCountAll = async (filters) => {
  return HttpClient.get(`/${Endpoints.USERS}/${Endpoints.ARTICLES}`, { params: filters });
};

/**
 * Fetches a single article by its ID.
 *
 * @param {string} id - The ID of the article to retrieve.
 * @returns {Promise<object>} - The response object containing the article details.
 */
const findById = async (filters) => {
  return HttpClient.get(`/${Endpoints.USERS}/${filters.userId}/${Endpoints.ARTICLES}/${filters.articleId}`);
};

export default { findAndCountAll, findById };
