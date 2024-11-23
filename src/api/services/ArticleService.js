import Endpoints from "../Endpoints";
import HttpClient from "../HttpClient";

const likeArticle = async (userId, articleId) => {
  return HttpClient.post(`/${Endpoints.USERS}/${userId}/${Endpoints.LIKES}`, { articleId });
};

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

/**
 * Updates a specific article by its ID.
 *
 * @param {string} userId - The ID of the user who owns the article.
 * @param {string} articleId - The ID of the article to update.
 * @param {object} data - The data to update the article with.
 * @param {string} data.title - The new title for the article.
 * @param {string} data.content - The new content for the article.
 * @param {string} data.image - The new image URL for the article.
 * @returns {Promise<object>} - The response object containing the updated article details.
 */
const update = async (userId, articleId, data) => {
  return HttpClient.put(`/${Endpoints.USERS}/${userId}/${Endpoints.ARTICLES}/${articleId}`, data);
};

/**
 * Deletes an article by its ID.
 *
 * @param {string} userId - The ID of the user who owns the article.
 * @param {string} articleId - The ID of the article to delete.
 * @returns {Promise<object>} - The response object indicating the result of the delete operation.
 */
const deleteById = async (userId, articleId) => {
  return HttpClient.delete(`/${Endpoints.USERS}/${userId}/${Endpoints.ARTICLES}/${articleId}`);
};

/**
 * Fetches a list of favorite articles for a specific user.
 *
 * @param {string} userId - The ID of the user whose favorite articles are being retrieved.
 * @param {object} filters - Optional filters to apply to the query.
 * @param {number} [filters.page] - The page number for pagination.
 * @param {number} [filters.limit] - The maximum number of results per page.
 * @param {string} [filters.order] - The order in which to sort results.
 * @param {string} [filters.find] - A search term to filter results.
 * @returns {Promise<Object>} - The response object containing the list of favorite articles.
 */
const findAndCountAllFavorites = async (userId, filters) => {
  return HttpClient.get(`/${Endpoints.USERS}/${userId}/${Endpoints.FAVORITES}`, {
    params: filters,
  });
};

/**
 * Checks if a specific article is marked as favorite by the user.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} articleId - The ID of the article.
 * @returns {Promise<object>} - The response object containing the `isFavorite` status.
 */
const checkIfFavorite = async (userId, articleId) => {
  return HttpClient.get(`/${Endpoints.USERS}/${userId}/${Endpoints.LIKES}/${articleId}`);
};

/**
 * Removes a like from a specific article for a user.
 *
 * @param {string} userId - The ID of the user removing the like.
 * @param {string} articleId - The ID of the article to unlike.
 * @returns {Promise<object>} - The response object indicating the result of the unlike operation.
 */
const unlikeArticle = async (userId, articleId) => {
  return HttpClient.delete(`/${Endpoints.USERS}/${userId}/${Endpoints.LIKES}/${articleId}`);
};

export default {
  likeArticle,
  findAndCountAll,
  findById,
  update,
  deleteById,
  findAndCountAllFavorites,
  checkIfFavorite,
  unlikeArticle,
};
